import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import Home from '..'
import { useSearchUsers, useUserRepositories } from '../hooks/useGithubUsers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

vi.mock('../hooks/useGithubUsers', () => ({
  useSearchUsers: vi.fn(),
  useUserRepositories: vi.fn(),
}))

const mockUsers = {
  items: [
    {
      id: 1,
      login: 'testuser',
      avatar_url: 'https://example.com/avatar.jpg',
    },
  ],
  incomplete_results: false,
  totalCount: 1,
}

const mockRepositories = [
  {
    id: 1,
    name: 'test-repo',
    description: 'Test repository',
    stargazers_count: 100,
  },
]

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query')
  return {
    ...actual,
    useQuery: vi.fn(),
    QueryClient: class QueryClient {
      constructor() {
        return {
          defaultOptions: {
            queries: {
              retry: false,
            },
          },
        }
      }
    },
    QueryClientProvider: ({ children }: { children: React.ReactNode }) =>
      children,
  }
})

// Create a wrapper component with QueryClientProvider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('Homepage', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    ;(useSearchUsers as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { items: [], incomplete_results: false, totalCount: 0 },
      isFetching: false,
      promise: Promise.resolve({
        items: [],
        incomplete_results: false,
        totalCount: 0,
      }),
    })

    ;(
      useUserRepositories as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: [],
      isFetching: false,
      promise: Promise.resolve([]),
    })

    cleanup()
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
    cleanup()
  })

  it('successfully renders home page with initial state', () => {
    render(<Home />, { wrapper: createWrapper() })
    expect(screen.getByText('GitHub Repositories Explorer')).toBeDefined()
    expect(
      screen.getByText(
        'Search for GitHub users and explore their repositories',
      ),
    ).toBeDefined()
  })

  it('handles search input and displays users', async () => {
    ;(useSearchUsers as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockUsers,
      isFetching: false,
      promise: Promise.resolve(mockUsers),
    })

    render(<Home />, { wrapper: createWrapper() })

    const searchInput = screen.getByPlaceholderText(
      /Search GitHub username.../i,
    )
    fireEvent.change(searchInput, { target: { value: 'test' } })

    const btnSubmit = screen.getByRole('button', { name: 'Search' })
    fireEvent.click(btnSubmit)

    await waitFor(() => {
      expect(screen.getByText('Showing users for "test"')).toBeDefined()
      expect(screen.getByText('testuser')).toBeDefined()
    })
  })

  it('shows loading state while fetching users', async () => {
    ;(useSearchUsers as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { items: [], incomplete_results: false, totalCount: 0 },
      isFetching: true,
      promise: Promise.resolve({
        items: [],
        incomplete_results: false,
        totalCount: 0,
      }),
    })

    render(<Home />, { wrapper: createWrapper() })

    const searchInput = screen.getByPlaceholderText(
      /Search GitHub username.../i,
    )
    fireEvent.change(searchInput, { target: { value: 'test' } })

    const btnSubmit = screen.getByTestId('btn-search')
    fireEvent.click(btnSubmit)

    expect(screen.getByText('Searching...')).toBeDefined()
  })

  it('displays repositories when a user is selected', async () => {
    ;(useSearchUsers as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockUsers,
      isFetching: false,
      refetch: vi.fn(),
      promise: Promise.resolve(mockUsers),
    })

    ;(
      useUserRepositories as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: mockRepositories,
      isFetching: false,
      promise: Promise.resolve(mockRepositories),
    })

    render(<Home />, { wrapper: createWrapper() })

    const searchInput = screen.getByPlaceholderText(
      /Search GitHub username.../i,
    )
    fireEvent.change(searchInput, { target: { value: 'test' } })

    const btnSubmit = screen.getByRole('button', { name: 'Search' })
    fireEvent.click(btnSubmit)

    await waitFor(() => {
      expect(screen.getByText('testuser')).toBeDefined()
    })

    const userElement = screen.getByText('testuser')
    fireEvent.click(userElement)

    await waitFor(() => {
      expect(screen.getByText('test-repo')).toBeDefined()
      expect(screen.getByText('Test repository')).toBeDefined()
    })
  })

  it('shows loading state while fetching repositories', async () => {
    ;(useSearchUsers as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockUsers,
      isFetching: false,
      refetch: vi.fn(),
      promise: Promise.resolve(mockUsers),
    })

    ;(
      useUserRepositories as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: [],
      isFetching: true,
      promise: Promise.resolve([]),
    })

    render(<Home />, { wrapper: createWrapper() })

    const searchInput = screen.getByPlaceholderText(
      /Search GitHub username.../i,
    )
    fireEvent.change(searchInput, { target: { value: 'test' } })

    const btnSubmit = screen.getByRole('button', { name: 'Search' })
    fireEvent.click(btnSubmit)

    await waitFor(() => {
      expect(screen.getByText('testuser')).toBeDefined()
    })

    const userElement = screen.getByText('testuser')
    fireEvent.click(userElement)

    expect(screen.getByTestId('repo-skeleton')).toBeDefined()
  })
})
