import { renderHook, act, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useSearchUsers, useUserRepositories } from './useGithubUsers'
import { getUsers, getUserRepositories } from '../query'
import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock the query functions
vi.mock('../query', () => ({
  getUsers: vi.fn(),
  getUserRepositories: vi.fn(),
}))

describe('useGithubUsers', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
    vi.clearAllMocks()
  })

  describe('useSearchUsers', () => {
    it('should return initial data when no query is provided', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )

      const { result } = renderHook(() => useSearchUsers(''), { wrapper })

      expect(result.current.data).toEqual({
        items: [],
        incomplete_results: false,
        totalCount: 0,
      })
      expect(getUsers).not.toHaveBeenCalled()
    })

    it('should fetch users when query is provided', async () => {
      const mockUsers = {
        items: [
          {
            id: 1,
            login: 'testuser',
            avatar_url: 'https://example.com/avatar.png',
            html_url: 'https://github.com/testuser',
          },
        ],
        incomplete_results: false,
        totalCount: 1,
      }

      vi.mocked(getUsers).mockResolvedValueOnce(mockUsers)

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )

      const { result } = renderHook(() => useSearchUsers('testuser'), {
        wrapper,
      })

      // Wait for the query to complete
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0))
      })

      expect(getUsers).toHaveBeenCalledWith('testuser')
      expect(result.current.data).toEqual(mockUsers)
    })

    it('should handle error state', async () => {
      const error = new Error('Failed to fetch users')
      vi.mocked(getUsers).mockRejectedValueOnce(error)

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )

      const { result } = renderHook(() => useSearchUsers('testuser'), {
        wrapper,
      })

      // Wait for the query to complete
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0))
      })

      expect(result.current.error).toEqual(error)
    })
  })

  describe('useUserRepositories', () => {
    it('should return initial data when no username is provided', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )

      const { result } = renderHook(() => useUserRepositories(''), { wrapper })

      expect(result.current.data).toEqual([])
      expect(getUserRepositories).not.toHaveBeenCalled()
    })

    it('should fetch repositories when username is provided', async () => {
      const mockRepositories = [
        {
          id: 1,
          name: 'test-repo',
          description: 'Test repository',
          html_url: 'https://github.com/testuser/test-repo',
          stargazers_count: 100,
          forks_count: 10,
          language: 'TypeScript',
          updated_at: '2024-03-20T00:00:00Z',
          visibility: 'public',
        },
      ]

      vi.mocked(getUserRepositories).mockResolvedValueOnce(mockRepositories)

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )

      const { result } = renderHook(() => useUserRepositories('testuser'), {
        wrapper,
      })

      // Wait for the query to complete and data to be available
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 100))
      })

      expect(getUserRepositories).toHaveBeenCalledWith('testuser')

      // Wait for the data to be available and match expected result
      await waitFor(() => {
        expect(result.current.data).toEqual(mockRepositories)
      })
    })

    it('should handle error state', async () => {
      const error = new Error('Failed to fetch repositories')
      vi.mocked(getUserRepositories).mockRejectedValueOnce(error)

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )

      const { result } = renderHook(() => useUserRepositories('testuser'), {
        wrapper,
      })

      // Wait for the query to complete
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0))
      })

      expect(result.current.error).toEqual(error)
    })
  })
})
