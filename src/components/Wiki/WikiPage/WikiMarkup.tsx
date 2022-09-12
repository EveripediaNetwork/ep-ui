import { BaseCategory, CommonMetaIds, Media, Wiki } from '@/types/Wiki'
import { getWikiMetadataById } from '@/utils/getWikiFields'
import { Box, Flex, HStack, chakra, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import dynamic from 'next/dynamic'
import { RelatedWikis } from './InsightComponents/RelatedWikis'
import WikiMainContent from './WikiMainContent'

const TwitterTimeline = dynamic(
  () => import('./InsightComponents/TwitterTimeline'),
)
const WikiNotFound = dynamic(() => import('../WIkiNotFound/WikiNotFound'))
const WikiActionBar = dynamic(() => import('./WikiActionBar'))
const RelatedMediaGrid = dynamic(
  () => import('./InsightComponents/RelatedMedia'),
)
const WikiInsights = dynamic(() => import('./WikiInsights'))
const WikiReferences = dynamic(() => import('./WikiReferences'))
const WikiTableOfContents = dynamic(() => import('./WikiTableOfContents'))

interface WikiLayoutProps {
  wiki?: Wiki | null
  ipfs?: string
  isLoading: boolean
}

const MobileMeta = (wiki: {
  metadata: { id: string; value: string }[]
  categories: BaseCategory[]
  media?: Media[]
}) => {
  const { metadata, categories, media } = wiki
  const twitterLink = metadata.find(
    meta => meta.id === CommonMetaIds.TWITTER_PROFILE,
  )?.value

  return (
    <chakra.div
      p={4}
      mx={{ base: 'auto', md: 0 }}
      w={{ base: '100%', md: '50%', lg: '40%', '2xl': '50%' }}
      display={{ base: 'block', lg: 'none' }}
    >
      {!!twitterLink && <TwitterTimeline url={twitterLink} />}
      {categories?.length !== 0 && <RelatedWikis categories={categories} />}
      {media && media.length > 0 && <RelatedMediaGrid media={media} />}
    </chakra.div>
  )
}

export const WikiMarkup = ({ wiki, ipfs, isLoading }: WikiLayoutProps) => {
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
                md: 'row',
              }}
            >
              <WikiMainContent wiki={wiki} />
              <WikiInsights wiki={wiki} ipfs={ipfs} />
              <Text
                fontSize="4xl"
                fontWeight="bold"
                mt={8}
                mb={-4}
                display={{
                  md: 'none',
                }}
                textAlign="center"
                px={4}
              >
                {wiki?.title}
              </Text>
            </Flex>
            <chakra.div
              display={{
                base: 'block',
                md: 'none',
              }}
            >
              <MobileMeta
                metadata={wiki.metadata}
                categories={wiki.categories}
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
          <>{isLoading ? <Spinner mx="auto" mt="8" /> : <WikiNotFound />}</>
        )}
      </Flex>
      {wiki?.content.includes('# ') && <WikiTableOfContents />}
    </HStack>
  )
}
