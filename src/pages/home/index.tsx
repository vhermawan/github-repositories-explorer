import SearchForm from '@/components/SearchForm'
import { useState } from 'react'
import { useSearchUsers, useUserRepositories } from './hooks/useGithubUsers'
import UserList from '@/components/UserList'
import type { User } from '@/types/model'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { motion } from 'framer-motion'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const {
    data: users = {
      items: [],
      incomplete_results: false,
      totalCount: 0,
    },
    isFetching: isLoadingUsers,
    error: usersError,
  } = useSearchUsers(searchQuery)

  const {
    data: repositories = [],
    isFetching: isLoadingRepos,
    error: reposError,
  } = useUserRepositories(selectedUser?.login || '')

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setSelectedUser(null)
  }

  const handleUserSelect = (user: User) => {
    setSelectedUser(user)
  }

  return (
    <div className="flex relative justify-center items-center">
      <div className="absolute top-20 right-0 md:-right-28 w-[250px] h-[250px] bg-[#9F1723] rounded-full blur-[920px] opacity-40 z-0"></div>
      <div className="container relative py-6 mx-auto md:px-4 md:max-w-4xl">
        <header className="text-center mb-8">
          <motion.h1
            className="text-3xl md:text-5xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            GitHub Repositories Explorer
          </motion.h1>
          <motion.p
            className="text-muted-foreground mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Search for GitHub users and explore their repositories
          </motion.p>
        </header>

        <SearchForm onSearch={handleSearch} isLoading={isLoadingUsers} />
        {searchQuery ? (
          <p data-testid="search-query">Showing users for "{searchQuery}"</p>
        ) : null}

        {(usersError || reposError) && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle className="font-bold">Error</AlertTitle>
            <AlertDescription>
              Failed to get {usersError ? 'users' : 'repositories'} data
            </AlertDescription>
          </Alert>
        )}

        <UserList
          users={searchQuery ? users.items : []}
          onUserSelect={handleUserSelect}
          isLoading={isLoadingUsers}
          repositories={repositories}
          isLoadingRepos={isLoadingRepos}
        />

        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>GitHub Repositories Explorer &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
      <div className="absolute top-36 -left-64 w-[250px] h-[250px] bg-[#9F1723] rounded-full blur-[120px] opacity-10 md:opacity-70 z-0"></div>
    </div>
  )
}
