import { Skeleton } from '../ui/skeleton'

export function CategorySkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-80 w-full rounded-xl bg-gradient-to-tr to-[#D8D9DC0D] from-[#DBDBDB]" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-[200px] bg-gradient-to-tr to-[#D8D9DC0D] from-[#DBDBDB]" />
        <Skeleton className="h-4 w-[300px] bg-gradient-to-tr to-[#D8D9DC0D] from-[#DBDBDB]" />
        <Skeleton className="h-10 w-10 rounded-full bg-gradient-to-tr to-[#D8D9DC0D] from-[#DBDBDB]" />
      </div>
    </div>
  )
}
