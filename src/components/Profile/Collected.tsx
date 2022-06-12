import useInfiniteScroll from 'react-infinite-scroll-hook'
import { FilterLayout } from '@/components/Profile/FilterLayout'
import { useProfileContext } from '@/components/Profile/utils'
import { getUserWikis } from '@/services/wikis'
import { Center, SimpleGrid, Text, Spinner } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { EmptyState } from '@/components/Profile/EmptyState'
import { Wiki } from '@/types/Wiki'
import { FETCH_DELAY_TIME, ITEM_PER_PAGE } from '@/data/Constants'
import { store } from '@/store/store'
import { useTranslation } from 'react-i18next'
import { pageView } from '@/utils/googleAnalytics'
import WikiPreviewCard from '../Wiki/WikiPreviewCard/WikiPreviewCard'

const Collected = () => {
  const { displaySize } = useProfileContext()
  const router = useRouter()
  const address = router.query.profile as string
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [wikis, setWikis] = useState<Wiki[] | []>([])
  const [offset, setOffset] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const fetchMoreWikis = React.useCallback(
    (fetchOffset = 0) => {
      setTimeout(() => {
        const fetchNewWikis = async () => {
          const result = await store.dispatch(
            getUserWikis.initiate({
              id: address,
              limit: ITEM_PER_PAGE,
              offset: fetchOffset,
            }),
          )
          if (result.data && result.data?.length > 0) {
            pageView(`${router.asPath}?page=${fetchOffset}`)
            const data = result.data || []
            const updatedWiki = [...wikis, ...data]
            setWikis(updatedWiki)
            setOffset(fetchOffset)
            if (data.length < ITEM_PER_PAGE) {
              setLoading(false)
              setHasMore(false)
            }
          } else {
            setHasMore(false)
            setLoading(false)
          }
        }
        fetchNewWikis()
      }, FETCH_DELAY_TIME)
    },
    [address, wikis],
  )

  useEffect(() => {
    if (address) {
      fetchMoreWikis()
    }
  }, [address, fetchMoreWikis])

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasMore,
    onLoadMore: () => fetchMoreWikis(offset + ITEM_PER_PAGE),
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
        minChildWidth={displaySize}
        w="full"
        spacing="4"
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
