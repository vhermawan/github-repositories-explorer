import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { getUserRepositories, getUsers } from '../query'
import type { Users } from '@/types/users'
import type { Repository } from '@/types/model'

export const useSearchUsers = (query: string): UseQueryResult<Users, Error> => {
  return useQuery({
    queryKey: ['users', query],
    queryFn: async (): Promise<Users> => getUsers(query),
    initialData: {
      items: [],
      incomplete_results: false,
      totalCount: 0,
    },
    enabled: !!query,
  })
}

export const useUserRepositories = (
  username: string,
): UseQueryResult<Repository[], Error> => {
  return useQuery({
    queryKey: ['repos', username],
    queryFn: async (): Promise<Repository[]> => getUserRepositories(username),
    initialData: [],
    enabled: !!username,
  })
}
