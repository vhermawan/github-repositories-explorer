import { describe, it, expect, vi, Mock, beforeEach } from 'vitest'
import { API } from '@/common/api'
import type { Users } from '@/types/users'
import type { User, Repository } from '@/types/model'
import type { AxiosResponse } from 'axios'

vi.mock('@/common/api', () => ({
  API: {
    get: vi.fn(),
  },
}))

describe('Query Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getUsers', () => {
    it('should fetch users with the correct query', async () => {
      const mockUser: User = {
        id: 1,
        login: 'testuser',
        avatar_url: 'https://example.com/avatar.jpg',
        html_url: 'https://github.com/testuser',
      }
      const mockedResponse: AxiosResponse<Users> = {
        data: {
          items: [mockUser],
          totalCount: 1,
          incomplete_results: false,
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as AxiosResponse['config'],
      }
      ;(API.get as Mock<typeof API.get>).mockResolvedValueOnce(mockedResponse)

      const response = await API.get('/search/users?q=testuser&per_page=5')
      expect(API.get).toHaveBeenCalledWith(
        '/search/users?q=testuser&per_page=5',
      )
      expect(response.data).toEqual(mockedResponse.data)
    })

    it('should throw an error if the API call fails', async () => {
      const mockedError = new Error('Network error')
      ;(API.get as Mock<typeof API.get>).mockRejectedValueOnce(mockedError)

      await expect(
        API.get('/search/users?q=testuser&per_page=5'),
      ).rejects.toThrow('Network error')
    })
  })

  describe('getUserRepositories', () => {
    it('should fetch user repositories with the correct query', async () => {
      const mockRepo: Repository = {
        id: 1,
        name: 'test-repo',
        description: 'Test repository',
        html_url: 'https://github.com/testuser/test-repo',
        stargazers_count: 100,
        forks_count: 10,
        language: 'TypeScript',
        updated_at: '2024-03-20T00:00:00Z',
        visibility: 'public',
      }
      const mockedResponse: AxiosResponse<Repository[]> = {
        data: [mockRepo],
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as AxiosResponse['config'],
      }
      ;(API.get as Mock<typeof API.get>).mockResolvedValueOnce(mockedResponse)

      const response = await API.get('/users/testuser/repos?sort=updated')
      expect(API.get).toHaveBeenCalledWith('/users/testuser/repos?sort=updated')
      expect(response.data).toEqual(mockedResponse.data)
    })

    it('should throw an error if the API call fails', async () => {
      const mockedError = new Error('Network error')
      ;(API.get as Mock<typeof API.get>).mockRejectedValueOnce(mockedError)

      await expect(
        API.get('/users/testuser/repos?sort=updated'),
      ).rejects.toThrow('Network error')
    })
  })
})
