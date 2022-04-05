import { FilterLayout } from '@/components/Profile/FilterLayout'
import { useProfileContext } from '@/components/Profile/utils'
import { useGetUserWikisQuery } from '@/services/wikis'
import { Center, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { skipToken } from '@reduxjs/toolkit/query'
import { useRouter } from 'next/router'
import WikiPreviewCard from '../Wiki/WikiPreviewCard/WikiPreviewCard'

export const Collected = () => {
  const { displaySize } = useProfileContext()
  const router = useRouter()
  const { profile: address } = router.query

  const result = useGetUserWikisQuery(
    typeof address === 'string' ? address : skipToken,
    {
      skip: router.isFallback,
    },
  )
  const { isLoading, data } = result

  return (
    <FilterLayout>
      {isLoading && <Center>Loading Wikis</Center>}
      {!data?.length && <Center>No Wikis found!</Center>}
      <SimpleGrid minChildWidth={displaySize} w="full" spacing="4">
        {data?.map((item, i) => (
          <WikiPreviewCard wiki={item} key={i} />
        ))}
      </SimpleGrid>
    </FilterLayout>
  )
}
