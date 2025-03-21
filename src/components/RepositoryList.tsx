import { Repository } from '@/types/model'
import { motion } from 'framer-motion'
import { FolderDot, Star } from 'lucide-react'
import { ScrollArea } from './ui/scroll-area'

interface RepositoryListProps {
  repositories: Repository[]
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories }) => {
  return (
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
  )
}

export default RepositoryList
