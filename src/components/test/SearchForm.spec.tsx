import '@testing-library/jest-dom'

import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SearchForm from '../SearchForm'

describe('SearchForm', () => {
  const mockOnSearch = vi.fn()

  beforeEach(() => {
    mockOnSearch.mockClear()
  })

  it('renders search form with input and button', () => {
    render(<SearchForm onSearch={mockOnSearch} isLoading={false} />)

    expect(
      screen.getByPlaceholderText('Search GitHub username...'),
    ).toBeInTheDocument()
    expect(screen.getByTestId('btn-search')).toBeInTheDocument()
  })

  it('handles search submission with valid input', async () => {
    render(<SearchForm onSearch={mockOnSearch} isLoading={false} />)

    const input = screen.getByPlaceholderText('Search GitHub username...')
    const searchButton = screen.getByTestId('btn-search')

    await userEvent.type(input, 'testuser')
    await userEvent.click(searchButton)

    expect(mockOnSearch).toHaveBeenCalledWith('testuser')
  })

  it('does not trigger search with empty input', async () => {
    render(<SearchForm onSearch={mockOnSearch} isLoading={false} />)

    const searchButton = screen.getByTestId('btn-search')
    await userEvent.click(searchButton)

    expect(mockOnSearch).not.toHaveBeenCalled()
  })

  it('clears input and triggers search when clear button is clicked', async () => {
    render(<SearchForm onSearch={mockOnSearch} isLoading={false} />)

    const input = screen.getByPlaceholderText('Search GitHub username...')
    await userEvent.type(input, 'testuser')

    const clearButton = screen.getByTestId('btn-clear')
    await userEvent.click(clearButton)

    expect(input).toHaveValue('')
    expect(mockOnSearch).toHaveBeenCalledWith('')
  })

  it('handles escape key to clear input', async () => {
    render(<SearchForm onSearch={mockOnSearch} isLoading={false} />)

    const input = screen.getByPlaceholderText('Search GitHub username...')
    await userEvent.type(input, 'testuser')

    fireEvent.keyDown(input, { key: 'Escape' })

    expect(input).toHaveValue('')
    expect(mockOnSearch).toHaveBeenCalledWith('')
  })

  it('disables input and button while loading', () => {
    render(<SearchForm onSearch={mockOnSearch} isLoading={true} />)

    const input = screen.getByPlaceholderText('Search GitHub username...')
    const searchButton = screen.getByTestId('btn-search')

    expect(input).toBeDisabled()
    expect(searchButton).toBeDisabled()
    expect(screen.getByText('Searching...')).toBeInTheDocument()
  })

  it('focuses input on mount', () => {
    render(<SearchForm onSearch={mockOnSearch} isLoading={false} />)

    const input = screen.getByPlaceholderText('Search GitHub username...')
    expect(input).toHaveFocus()
  })
})
