import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import UserSkeleton from '../UserSkeleton'
import { describe, it, expect } from 'vitest'

describe('UserSkeleton', () => {
  it('should render skeleton loaders correctly', () => {
    render(<UserSkeleton />)

    for (let i = 0; i < 3; i++) {
      const userSkeleton = screen.getByTestId(`user-skeleton-${i}`)
      expect(userSkeleton).toBeInTheDocument()
    }
  })
})
