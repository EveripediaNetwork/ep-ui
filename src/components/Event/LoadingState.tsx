import { cn } from '@/lib/utils'
import React from 'react'

export const LoadingState = ({ classNames }: { classNames?: string }) => {
  return (
    <span
      className={cn(
        'h-6 w-24 bg-gradient-to-r from-[#DBDBDB] to-[#DBDBDB0D] dark:from-[#A7A8AD] dark:to-[#D8D9DC0D] animate-pulse rounded-full',
        classNames,
      )}
    />
  )
}

export const LoadingEventState = () => {
  return (
    <div className="border border-gray200 dark:border-alpha-300 bg-white dark:bg-gray700 rounded-xl px-3 md:px-5 h-fit py-[14px] w-full flex flex-col-reverse md:flex-row gap-2 md:gap-9">
      <div className="flex flex-col flex-1 gap-2">
        <LoadingState classNames="w-full h-5" />
        <LoadingState classNames="w-full h-8" />
        <LoadingState classNames="w-full h-4" />
        <LoadingState classNames="w-full h-4" />
        <div className="flex gap-2">
          <LoadingState />
          <LoadingState />
          <LoadingState />
          <LoadingState />
        </div>
      </div>
      <div className="w-full md:w-[140px] md:h-[153px] rounded-xl xl:h-[117px] bg-gradient-to-r from-[#DBDBDB] to-[#DBDBDB0D] dark:from-[#A7A8AD] dark:to-[#D8D9DC0D] animate-pulse" />
    </div>
  )
}
