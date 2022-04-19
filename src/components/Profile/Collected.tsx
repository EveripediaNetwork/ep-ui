import useInfiniteScroll from 'react-infinite-scroll-hook'
import { FilterLayout } from '@/components/Profile/FilterLayout'
import { useProfileContext } from '@/components/Profile/utils'
import { getUserWikis} from '@/services/wikis'
import { Center, SimpleGrid, Text, Spinner } from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { EmptyState } from '@/components/Profile/EmptyState'
import WikiPreviewCard from '../Wiki/WikiPreviewCard/WikiPreviewCard'
import { Wiki } from '@/types/Wiki'
import { FETCH_DELAY_TIME, ITEM_PER_PAGE } from '@/data/Constants'
import { store } from '@/store/store'


export const Collected = () => {
  const { displaySize } = useProfileContext()
  const router = useRouter()
  const address = router.query.profile as string
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [wikis, setWikis] = useState<Wiki[] | []>([])
  const [offset, setOffset] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchMoreWikis = () => {
    const updatedOffset = offset + ITEM_PER_PAGE
    setTimeout(() => {
      const fetchNewWikis = async () => {
        const result = await store.dispatch(
          getUserWikis.initiate({ id: address, limit: ITEM_PER_PAGE, offset: updatedOffset }),
        )
        if (result.data && result.data?.length > 0) {
          const data = result.data || []
          const updatedWiki = [...wikis, ...data]
          setWikis(updatedWiki)
          setOffset(updatedOffset)
          setLoading(false)
        } else {
          setHasMore(false)
          setLoading(false)
        }
      }
      fetchNewWikis()
   }, FETCH_DELAY_TIME)
  }

  useEffect(()=> {
    if(address){
      fetchMoreWikis()
    }
  }, [address])

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasMore,
    onLoadMore: fetchMoreWikis,
  })

  return (
    <FilterLayout>
      {(wikis.length < 1 && !hasMore) && (
        <Center>
          <EmptyState />
        </Center>
      )}
      <SimpleGrid ref={sentryRef}  minChildWidth={displaySize} w="full" spacing="4">
        {wikis.map((item, i) => (
          <WikiPreviewCard wiki={item} key={i} />
        ))}
      </SimpleGrid>
      { (loading||hasMore) ? (
          <Center ref={sentryRef}  w="full" h="16">
            <Spinner size="xl" />
          </Center>) 
          : (
          <Center mt="10">
            <Text fontWeight="semibold">Yay! You have seen it all 🥳 </Text>
          </Center>
      )}
    </FilterLayout>
  )
}
