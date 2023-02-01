import { CommonMetaIds, Media, Wiki } from '@everipedia/iq-utils'
import { Box, Flex, HStack, VStack, chakra, Text } from '@chakra-ui/react'
import React from 'react'
import { getWikiMetadataById } from '@/utils/DataFetching/getWikiFields'
import WikiNotFound from '../WIkiNotFound/WikiNotFound'
import RelatedMediaGrid from './InsightComponents/RelatedMedia'
import { RelatedWikis } from './InsightComponents/RelatedWikis'
import TwitterTimeline from './InsightComponents/TwitterTimeline'
import WikiActionBar from './WikiActionBar'
import WikiInsights from './WikiInsights'
import WikiMainContent from './WikiMainContent'
import WikiReferences from './WikiReferences'
import WikiTableOfContents from './WikiTableOfContents'

interface WikiLayoutProps {
  wiki?: Wiki | null
  relatedWikis: Wiki[] | null
  ipfs?: string
}

const MobileMeta = (wiki: {
  metadata: { id: string; value: string }[]
  relatedWikis: Wiki[] | null
  media?: Media[]
}) => {
  const { metadata, relatedWikis, media } = wiki
  const twitterLink = metadata.find(
    meta => meta.id === CommonMetaIds.TWITTER_PROFILE,
  )?.value

  return (
    <VStack
      p={{ base: 4, md: 6 }}
      pr={{ md: 15, xl: 0 }}
      mx={{ base: 'auto', md: 0 }}
      w={{ base: '100%', xl: '40%', '2xl': '50%' }}
      display={{ base: 'block', xl: 'none' }}
      spacing={6}
    >
      {!!twitterLink && <TwitterTimeline url={twitterLink} />}
      <RelatedWikis relatedWikis={relatedWikis} />
      {media && media.length > 0 && <RelatedMediaGrid media={media} />}
    </VStack>
  )
}

export const WikiMarkup = ({ wiki, relatedWikis, ipfs }: WikiLayoutProps) => {
  return (
    <HStack align="stretch" justify="stretch">
      <Flex
        w="100%"
        justify="space-between"
        direction={{
          base: 'column',
          md: 'row',
        }}
      >
        <WikiActionBar wiki={wiki} />
        {wiki ? (
          <Box w="100%">
            <Flex
              w="100%"
              justify="space-between"
              direction={{
                base: 'column-reverse',
                xl: 'row',
              }}
            >
              <WikiMainContent wiki={wiki} />
              <WikiInsights
                wiki={wiki}
                ipfs={ipfs}
                relatedWikis={relatedWikis}
              />
              <Text
                fontSize="4xl"
                fontWeight="bold"
                mt={8}
                mb={-4}
                display={{
                  xl: 'none',
                }}
                textAlign={{ base: 'center', md: 'left' }}
                px={{ base: 4, md: 6 }}
              >
                {wiki?.title}
              </Text>
            </Flex>
            <chakra.div
              display={{
                base: 'block',
                xl: 'none',
              }}
            >
              <MobileMeta
                metadata={wiki.metadata}
                relatedWikis={relatedWikis}
                media={wiki.media}
              />
            </chakra.div>
            <WikiReferences
              references={JSON.parse(
                getWikiMetadataById(wiki, CommonMetaIds.REFERENCES)?.value ||
                  '[]',
              )}
            />
          </Box>
        ) : (
          <WikiNotFound />
        )}
      </Flex>
      {wiki?.content.includes('# ') && <WikiTableOfContents />}
    </HStack>
  )
}
