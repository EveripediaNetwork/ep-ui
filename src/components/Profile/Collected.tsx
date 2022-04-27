import useInfiniteScroll from 'react-infinite-scroll-hook'
import { BaseProvider, StaticJsonRpcProvider } from '@ethersproject/providers'
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
import { validateAddress } from '@/utils/validateAddress'
import config from '@/config'
import WikiPreviewCard from '../Wiki/WikiPreviewCard/WikiPreviewCard'

const Collected = () => {
  const { displaySize } = useProfileContext()
  const router = useRouter()
  const address = router.query.profile as string
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [wikis, setWikis] = useState<Wiki[] | []>([])
  const [offset, setOffset] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [userAddress, setUserAddress] = useState<string>('')
  const provider: BaseProvider = new StaticJsonRpcProvider(config.ensRPC)

  const fetchMoreWikis = (fetchOffset: number, addr: string) => {
    setTimeout(() => {
      const fetchNewWikis = async () => {
        const result = await store.dispatch(
          getUserWikis.initiate({
            id: addr,
            limit: ITEM_PER_PAGE,
            offset: fetchOffset,
          }),
        )
        if (result.data && result.data?.length > 0) {
          const data = result.data || []
          const updatedWiki = [...wikis, ...data]
          setWikis(updatedWiki)
          setOffset(fetchOffset)
          setLoading(false)
        } else {
          setHasMore(false)
          setLoading(false)
        }
      }
      fetchNewWikis()
    }, FETCH_DELAY_TIME)
  }

  useEffect(() => {
    if (address) {
      const resolveAddressAndFetchWiki = async () => {
        let defaultAddress = address
        if (!validateAddress(address)) {
          defaultAddress = (await provider.resolveName(address)) || ''
          setUserAddress(defaultAddress)
        } else {
          setUserAddress(defaultAddress)
        }
        fetchMoreWikis(offset, defaultAddress)
      }
      resolveAddressAndFetchWiki()
    }
  }, [address])

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasMore,
    onLoadMore: () => fetchMoreWikis(offset + ITEM_PER_PAGE, userAddress),
  })

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
          <Text fontWeight="semibold">Yay! You have seen it all 🥳 </Text>
        </Center>
      )}
    </FilterLayout>
  )
}

export default Collected
