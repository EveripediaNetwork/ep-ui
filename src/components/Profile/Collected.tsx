import useInfiniteScroll from 'react-infinite-scroll-hook'
import { FilterLayout } from '@/components/Profile/FilterLayout'
import { getUserWikis } from '@/services/wikis'
import { Center, SimpleGrid, Text, Spinner } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { EmptyState } from '@/components/Profile/EmptyState'
import { Wiki } from '@/types/Wiki'
import { useTranslation } from 'react-i18next'
import { useInfiniteData } from '@/utils/useInfiniteData'
import WikiPreviewCard from '../Wiki/WikiPreviewCard/WikiPreviewCard'

const Collected = () => {
  const router = useRouter()
  const address = router.query.profile as string

  const {
    data: wikis,
    fetcher: fetchMoreWikis,
    loading,
    hasMore,
  } = useInfiniteData<Wiki>({
    initiator: getUserWikis,
    arg: { address },
  })

  useEffect(() => {
    if (address) {
      fetchMoreWikis(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasMore,
    onLoadMore: () => fetchMoreWikis(),
  })
  const { t } = useTranslation()
  return (
    <FilterLayout>
      {wikis.length < 1 && !hasMore && (
        <Center>
          <EmptyState />
        </Center>
      )}
      <SimpleGrid
        ref={sentryRef}
        maxW="1050px"
        w="100%"
        mx="auto"
        columns={{ base: 1, md: 2, lg: 3 }}
        spacingX={6}
        spacingY={12}
      >
        {wikis.map((item, i) => (
          <WikiPreviewCard wiki={item} key={i} />
        ))}
      </SimpleGrid>
      {loading || hasMore ? (
        <Center ref={sentryRef} w="full" h="16">
          <Spinner size="xl" />
        </Center>
      ) : (
        <Center mt="10">
          <Text fontWeight="semibold">{t('seenItAll')}</Text>
        </Center>
      )}
    </FilterLayout>
  )
}

export default Collected
