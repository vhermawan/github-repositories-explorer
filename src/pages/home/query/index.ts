import { API } from '@/common/api'
import type { Repository } from '@/types/model'
import type { Users } from '@/types/users'

export async function getUsers(username: string): Promise<Users> {
  const response = await API.get(
    `/search/users?q=${encodeURIComponent(username)}&per_page=5`,
  )
  return response.data
}

export async function getUserRepositories(
  username: string,
): Promise<Repository[]> {
  const response = await API.get(
    `/users/${encodeURIComponent(username)}/repos?sort=updated`,
  )
  return response.data
}
