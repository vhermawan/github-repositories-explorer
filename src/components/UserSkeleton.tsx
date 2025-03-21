import { Skeleton } from './ui/skeleton'

const UserSkeleton: React.FC = () => {
  return Array(3)
    .fill(0)
    .map((_, i) => (
      <div key={i} className="flex items-center gap-3">
        <Skeleton
          className="h-10 w-10 rounded-full"
          data-testid={`user-skeleton-${i}`}
        />
        <Skeleton className="h-4 w-full" />
      </div>
    ))
}

export default UserSkeleton
