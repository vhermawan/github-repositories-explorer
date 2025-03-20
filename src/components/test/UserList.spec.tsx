import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { User, Repository } from '@/types/model';
import UserList from '../UserList';

describe('UserList', () => {
  it('renders list of users', async () => {
    const users: User[] = [
      {
        id: 1,
        login: 'testuser1',
        avatar_url: 'https://example.com/avatar1.jpg',
        html_url: 'https://example.com/testuser1',
      },
      {
        id: 2,
        login: 'testuser2',
        avatar_url: 'https://example.com/avatar2.jpg',
        html_url: 'https://example.com/testuser2',
      },
    ];

    render(<UserList users={users} onUserSelect={vi.fn()} isLoading={false} isLoadingRepos={false} repositories={[]} />);

    await waitFor(() => expect(screen.getByText('testuser1')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('testuser2')).toBeInTheDocument());
  });

  it('calls onUserSelect when a user is clicked', async () => {
    const users: User[] = [
      {
        id: 1,
        login: 'testuser',
        avatar_url: 'https://example.com/avatar.jpg',
        html_url: 'https://example.com/testuser',
      },
    ];

    const onUserSelect = vi.fn();

    render(<UserList users={users} onUserSelect={onUserSelect} isLoading={false} isLoadingRepos={false} repositories={[]} />);

    const userLink = screen.getByTestId('selection-user-testuser');
    fireEvent.click(userLink);

    await waitFor(() => expect(onUserSelect).toHaveBeenCalledWith(users[0]));
  });

  it('renders skeleton state when isLoading is true', async () => {
    render(<UserList users={[]} onUserSelect={vi.fn()} isLoading={true} isLoadingRepos={false} repositories={[]} />);

    const skeleton = screen.getByTestId('user-skeleton-0');
    expect(skeleton).toBeDefined();
  });

  it('renders repositories when user is selected', async () => {
    const users: User[] = [
      {
        id: 1,
        login: 'testuser',
        avatar_url: 'https://example.com/avatar1.jpg',
        html_url: 'https://example.com/testuser1',
      },
    ];

    const repositories: Repository[] = [
      {
        id: 1,
        name: 'test-repo',
        description: 'Test repository',
        stargazers_count: 100,
        html_url: 'https://example.com/test-repo',
        forks_count: 10,
        language: 'JavaScript',
        updated_at: '2022-01-01T00:00:00Z',
        visibility: 'public',
      },
    ];

    render(<UserList users={users} onUserSelect={vi.fn()} isLoading={false} isLoadingRepos={false} repositories={repositories} />);

    const userLink = screen.getByTestId('selection-user-testuser');
    fireEvent.click(userLink);

    await waitFor(() => expect(screen.getByText('test-repo')).toBeInTheDocument());
  });

  it('renders skeleton state for repositories when isLoadingRepos is true', async () => {
     const users: User[] = [
      {
        id: 1,
        login: 'testuser',
        avatar_url: 'https://example.com/avatar1.jpg',
        html_url: 'https://example.com/testuser1',
      },
    ];

    render(<UserList users={users} onUserSelect={vi.fn()} isLoading={false} isLoadingRepos={true} repositories={[]} />);

    const userLink = screen.getByTestId('selection-user-testuser');
    fireEvent.click(userLink);

    const skeleton = screen.getByTestId('repo-skeleton-0');
    expect(skeleton).toBeDefined();
  });
});

