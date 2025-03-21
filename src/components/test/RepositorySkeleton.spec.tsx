import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import RepositorySkeleton from '../RepositorySkeleton'
import { describe, it, expect } from 'vitest'

describe('RepositorySkeleton', () => {
  it('should render skeleton loaders correctly', () => {
    render(<RepositorySkeleton />)

    for (let i = 0; i < 3; i++) {
      const repoSkeleton = screen.getByTestId(`repo-skeleton-${i}`)
      expect(repoSkeleton).toBeInTheDocument()
    }
  })
})
