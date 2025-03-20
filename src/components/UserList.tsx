import React from 'react'
import type { Repository, User } from '@/types/model'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Skeleton } from './ui/skeleton'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import { FolderDot, Star } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { motion } from 'framer-motion'

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
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton
                  className="h-10 w-10 rounded-full"
                  data-testid={`user-skeleton-${i}`}
                />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
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
        {users.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            No users found. Try a different search term.
          </div>
        ) : (
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
                  <motion.div
                    className="flex justify-between"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 * index }}
                  >
                    <div className="flex items-center align-top gap-5">
                      <img
                        src={user.avatar_url}
                        alt={`${user.login}'s avatar`}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="flex flex-col gap-2 text-left">
                        <div className="font-medium">{user.login}</div>
                        <a
                          href={user.html_url}
                          target="_blank"
                          data-testid={`profile-link-${user.login}`}
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Profile
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </AccordionTrigger>
                {isLoadingRepos ? (
                  <AccordionContent data-testid="repo-skeleton">
                    <ul className="mt-4 ml-4 space-y-2 p-4">
                      {Array(3)
                        .fill(0)
                        .map((_, i) => (
                          <li key={i} className="flex justify-between  gap-2">
                            <div className="flex gap-4 w-full">
                              <Skeleton
                                className="h-4 w-full"
                                data-testid={`repo-skeleton-${i}`}
                              />
                            </div>
                            <div className="flex gap-2">
                              <Skeleton className="h-4 w-4" />
                              <Skeleton className="h-4 w-4" />
                            </div>
                          </li>
                        ))}
                    </ul>
                  </AccordionContent>
                ) : (
                  <AccordionContent className="bg-accent rounded-md">
                    <ScrollArea className="h-[300px] mt-4">
                      <ul className="flex flex-col space-y-2 p-3">
                        {repositories.map((repository, i) => (
                          <motion.li
                            key={i}
                            className="flex gap-2 w-full"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.15, delay: 0.1 * i }}
                          >
                            <div className="flex gap-2 w-10/12">
                              <div className="hidden md:block md:w-1/6">
                                <FolderDot />
                              </div>
                              <div className="flex flex-col text-left w-5/6">
                                <h3 className="text-sm font-bold truncate w-40">
                                  {repository.name}
                                </h3>
                                <p className="truncate w-40 md:w-96">
                                  {repository.description || 'No description'}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2 md:w-2/12 justify-end">
                              <span>{repository.stargazers_count}</span>
                              <Star size={20} />
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    </ScrollArea>
                  </AccordionContent>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  )
}

export default UserList
