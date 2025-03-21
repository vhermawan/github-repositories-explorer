import { render, screen } from '@testing-library/react'
import UserCard from '../UserCard'
import type { User } from '@/types/model'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'

describe('UserCard', () => {
  const mockUser: User = {
    login: 'testuser',
    avatar_url: 'https://example.com/avatar.jpg',
    html_url: 'https://github.com/testuser',
    id: 1,
  }

  it('renders user information correctly', () => {
    render(<UserCard user={mockUser} index={0} />)

    expect(screen.getByText('testuser')).toBeInTheDocument()

    const avatar = screen.getByAltText("testuser's avatar") as HTMLImageElement
    expect(avatar).toBeInTheDocument()
    expect(avatar.src).toBe('https://example.com/avatar.jpg')

    const profileLink = screen.getByText('View Profile')
    expect(profileLink).toBeInTheDocument()
    expect(profileLink).toHaveAttribute('href', 'https://github.com/testuser')
    expect(profileLink).toHaveAttribute('target', '_blank')
    expect(profileLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('has correct data-testid for profile link', () => {
    render(<UserCard user={mockUser} index={0} />)

    const profileLink = screen.getByTestId('profile-link-testuser')
    expect(profileLink).toBeInTheDocument()
  })
})
