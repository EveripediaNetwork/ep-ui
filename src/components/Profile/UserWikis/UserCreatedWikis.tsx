import useInfiniteScroll from 'react-infinite-scroll-hook'
import { getUserCreatedWikis } from '@/services/wikis'
import { Center, Text, Spinner, Box } from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/router'
import { EmptyState } from '@/components/Profile/EmptyState'
import { useInfiniteData } from '@/hooks/useInfiniteData'
import { useTranslation } from 'next-i18next'
import Collected from '../Collected'
import { Activity } from '@/types/ActivityDataType'
import { ITEM_PER_PAGE } from '@/data/Constants'

const UserCreatedWikis = ({ createdWikis }: { createdWikis: Activity[] }) => {
  const router = useRouter()
  const address = router.query.profile as string
  const { t } = useTranslation('account')
  const {
    data: wikis,
    fetcher: fetchMoreWikis,
    loading,
    hasMore,
  } = useInfiniteData<Activity>(
    {
      initiator: getUserCreatedWikis,
      arg: { id: address },
    },
    createdWikis,
  )

  const [createdWikisSentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasMore,
    onLoadMore: () => fetchMoreWikis(),
  })

  return (
    <Box py="10" px={{ base: 6, lg: 0 }}>
      {wikis.length < 1 && !hasMore && (
        <Center>
          <EmptyState
            title={t('CreateEmptyStateTitle')}
            body={t('createEmptyStateDescription')}
          />
        </Center>
      )}
      <Collected wikis={wikis} />
      {(loading || hasMore) && wikis.length >= ITEM_PER_PAGE ? (
        <Center mt={8} ref={createdWikisSentryRef} w="full" h="16">
          <Spinner size="xl" />
        </Center>
      ) : (
        !(wikis.length < 1 && !hasMore) && (
          <Center mt="10">
            <Text fontWeight="semibold">{t('seenItAll')}</Text>
          </Center>
        )
      )}
    </Box>
  )
}

export default UserCreatedWikis
