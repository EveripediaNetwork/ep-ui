import useInfiniteScroll from 'react-infinite-scroll-hook'
import { getUserWikis } from '@/services/wikis'
import { Center, Text, Spinner, Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { EmptyState } from '@/components/Profile/EmptyState'
import { Wiki } from '@/types/Wiki'
import { useInfiniteData } from '@/utils/useInfiniteData'
import { useTranslation } from 'react-i18next'
import Collected from '../Collected'

const UserEditedWikis = () => {
  const router = useRouter()
  const address = router.query.profile as string
  const { t } = useTranslation()

  const {
    data: wikis,
    fetcher: fetchMoreWikis,
    loading,
    hasMore,
  } = useInfiniteData<Wiki>({
    initiator: getUserWikis,
    arg: { id: address },
    defaultLoading: true,
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

  return (
    <Box pt="10" px={{ base: 8, lg: 0 }}>
      {wikis.length < 1 && !hasMore && (
        <Center>
          <EmptyState />
        </Center>
      )}
      <Collected wikis={wikis} />
      {loading || hasMore ? (
        <Center ref={sentryRef} w="full" h="16">
          <Spinner size="xl" />
        </Center>
      ) : (
        <Center mt="10">
          <Text fontWeight="semibold">{t('seenItAll')}</Text>
        </Center>
      )}
    </Box>
  )
}

export default UserEditedWikis
