import { render, screen } from '@testing-library/react'
import RepositoryList from '../RepositoryList'
import { Repository } from '@/types/model'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'

describe('RepositoryList', () => {
  const mockRepositories: Repository[] = [
    {
      id: 1,
      name: 'test-repo-1',
      description: 'Test repository 1',
      stargazers_count: 100,
      html_url: 'https://github.com/test/repo1',
      forks_count: 10,
      language: 'TypeScript',
      updated_at: '2024-03-20T10:00:00Z',
      visibility: 'public',
    },
    {
      id: 2,
      name: 'test-repo-2',
      description: null,
      stargazers_count: 200,
      html_url: 'https://github.com/test/repo2',
      forks_count: 20,
      language: 'JavaScript',
      updated_at: '2024-03-20T11:00:00Z',
      visibility: 'public',
    },
  ]

  it('renders repository list correctly', () => {
    render(<RepositoryList repositories={mockRepositories} />)

    expect(screen.getByText('test-repo-1')).toBeInTheDocument()
    expect(screen.getByText('test-repo-2')).toBeInTheDocument()

    expect(screen.getByText('Test repository 1')).toBeInTheDocument()
    expect(screen.getByText('No description')).toBeInTheDocument()

    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('200')).toBeInTheDocument()
  })

  it('renders empty repository list', () => {
    render(<RepositoryList repositories={[]} />)
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
  })
})
