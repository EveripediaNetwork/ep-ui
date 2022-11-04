import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { SearchSkeleton } from '@/components/Search/SearchSkeleton'

const SearchWikiNotificationsResult = () => {
  //   console.log(query)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const route = useRouter()

  // console.log(route.query?.q)

  useEffect(() => {
    setIsLoading(true)
  }, [route])

  return <>{isLoading && <SearchSkeleton />}</>
}

export default SearchWikiNotificationsResult
