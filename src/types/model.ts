export interface User {
  id: number
  login: string
  avatar_url: string
  html_url: string
}

export interface Repository {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  visibility: string
}
