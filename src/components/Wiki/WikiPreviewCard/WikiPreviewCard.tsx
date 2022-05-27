import React from 'react'
import {
  Box,
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

const WikiPreviewCard = ({
  wiki,
  showLatestEditor = false,
}: {
  wiki: Wiki
  showLatestEditor?: boolean
}) => {
  const { updated, title, id } = wiki
  const [, username] = useENSData(wiki.user?.id || '')
  return (
    <LinkBox
      w="100%"
      h="100%"
      bgColor="cardBg"
      boxShadow="xl"
      rounded="xl"
      overflow="hidden"
      cursor="pointer"
    >
      <WikiImage h={200} imageURL={getWikiImageUrl(wiki)} layout="fill" />
      <Stack spacing={3} p={4}>
        <LinkOverlay href={`/wiki/${id}`}>
          <Text fontSize="2xl" fontWeight="bold">
            {title}
          </Text>
        </LinkOverlay>
        <Box>
          <Text fontSize="md" opacity={0.7}>
            {getWikiSummary(wiki, WikiSummarySize.Small)}
          </Text>
          <HStack flexWrap="wrap" mt={2} justify="space-between">
            {showLatestEditor && (
              <HStack fontSize="sm" py={2} color="brand.500">
                <DisplayAvatar address={wiki.user?.id} />
                <Link href={`/account/${wiki.user?.id}`}>
                  {username || shortenAccount(wiki.user?.id || '')}
                </Link>
              </HStack>
            )}
            <Text py={2} m="0px !important" color="gray.400" fontSize="sm">
              Last Edited {updated && getReadableDate(updated)}
            </Text>
          </HStack>
        </Box>
      </Stack>
    </LinkBox>
  )
}

export default WikiPreviewCard
