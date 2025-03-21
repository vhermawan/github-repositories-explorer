import { render, screen } from '@testing-library/react'
import EmptyState from '../EmptyState'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'

describe('EmptyState', () => {
  const mockText = 'Test empty state message'

  it('renders the empty state with correct text', () => {
    render(<EmptyState text={mockText} />)
    expect(screen.getByText(mockText)).toBeInTheDocument()
  })

  it('has correct animation properties', () => {
    const { container } = render(<EmptyState text={mockText} />)
    const motionDiv = container.firstChild as HTMLElement

    expect(motionDiv).toHaveStyle('opacity: 0') // Initial state
    expect(motionDiv).toHaveClass(
      'flex',
      'm-auto',
      'text-center',
      'py-8',
      'mt-4',
      'text-muted-foreground',
      'justify-center',
    )
  })
})
