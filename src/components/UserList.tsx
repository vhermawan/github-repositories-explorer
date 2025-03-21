import React from 'react'
import type { Repository, User } from '@/types/model'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import { motion } from 'framer-motion'
import UserCard from './UserCard'
import RepositoryList from './RepositoryList'
import RepositorySkeleton from './RepositorySkeleton'
import UserSkeleton from './UserSkeleton'

interface UserListProps {
  users: User[]
  onUserSelect: (user: User) => void
  isLoading: boolean
  repositories: Repository[]
  isLoadingRepos: boolean
}

const UserList: React.FC<UserListProps> = ({
  users,
  onUserSelect,
  isLoading,
  repositories,
  isLoadingRepos,
}) => {
  if (isLoading) {
    return (
      <Card className="mt-10">
        <CardHeader>
          <CardTitle>GitHub Users</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <UserSkeleton />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mt-10 w-full">
      <CardHeader>
        <CardTitle>GitHub Users</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {users.length > 0 ? (
          <Accordion type="single" collapsible>
            {users.map((user, index) => (
              <AccordionItem
                key={user.id}
                value={user.login}
                className="p-4 cursor-pointer transition-colors"
              >
                <AccordionTrigger
                  onClick={() => onUserSelect(user)}
                  data-testid={`selection-user-${user.login}`}
                >
                  <UserCard user={user} index={index} />
                </AccordionTrigger>
                {isLoadingRepos ? (
                  <AccordionContent data-testid="repo-skeleton">
                    <RepositorySkeleton />
                  </AccordionContent>
                ) : (
                  <AccordionContent className="bg-accent rounded-md">
                    {repositories.length > 0 ? (
                      <RepositoryList repositories={repositories} />
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.15, delay: 0.1 }}
                        className="flex m-auto text-center p-4 mt-4"
                      >
                        <p className="text-muted-foreground font-bold">
                          No repositories found for this user.
                        </p>
                      </motion.div>
                    )}
                  </AccordionContent>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            No users found. Try a different search term.
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default UserList
