import type { User } from '@/types/model'
import { motion } from 'framer-motion'

interface UserCardProps {
  user: User
  index: number
}

const UserCard: React.FC<UserCardProps> = ({ user, index }) => {
  return (
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
  )
}

export default UserCard
