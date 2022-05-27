import React from 'react'
import {
  Box,
  Center,
  HStack,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Wiki } from '@/types/Wiki'
import { getReadableDate } from '@/utils/getFormattedDate'
import { WikiImage } from '@/components/WikiImage'
import { getWikiSummary, WikiSummarySize } from '@/utils/getWikiSummary'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import DisplayAvatar from '@/components/Elements/Avatar/Avatar'
import Link from 'next/link'
import { useENSData } from '@/hooks/useENSData'
import shortenAccount from '@/utils/shortenAccount'

const WikiPreviewCard = ({ wiki }: { wiki: Wiki }) => {
  const { updated, title, id } = wiki
  const [, username] = useENSData(wiki.user?.id || '')
  return (
    <Center cursor="pointer">
      <LinkBox>
        <Box
          bgColor="cardBg"
          w={390}
          boxShadow="xl"
          rounded="xl"
          overflow="hidden"
        >
          <WikiImage h={200} imageURL={getWikiImageUrl(wiki)} layout="fill" />
          <Stack spacing={3} p={4}>
            <LinkOverlay href={`/wiki/${id}`}>
              <Text fontSize="2xl" fontWeight="bold">
                {title}
              </Text>
            </LinkOverlay>
            <Text fontSize="md" opacity={0.7} h={14}>
              {getWikiSummary(wiki, WikiSummarySize.Small)}
            </Text>
            <HStack justify="space-between">
              <HStack fontSize="sm" color="brand.500">
                <DisplayAvatar address={wiki.user?.id} />
                <Link href={`/account/${wiki.user?.id}`}>
                  {username || shortenAccount(wiki.user?.id || '')}
                </Link>
              </HStack>
              <Text color="gray.400" fontSize="sm">
                Last Edited {updated && getReadableDate(updated)}
              </Text>
            </HStack>
          </Stack>
        </Box>
      </LinkBox>
    </Center>
  )
}

export default WikiPreviewCard
