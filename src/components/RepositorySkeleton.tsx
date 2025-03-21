import { Skeleton } from './ui/skeleton'

const RepositorySkeleton: React.FC = () => {
  return (
    <ul className="mt-4 ml-4 space-y-2 p-4">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <li key={i} className="flex justify-between gap-2">
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
  )
}

export default RepositorySkeleton
