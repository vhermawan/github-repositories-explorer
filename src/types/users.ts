import type { User } from './model'

// user
export interface Users {
  totalCount: number
  items: User[]
  incomplete_results: boolean
}
