import dynamic from 'next/dynamic'
import {
  CommonMetaIds,
  EditSpecificMetaIds,
  type Media,
  type User,
  type Wiki,
} from '@everipedia/iq-utils'
import { Box, Flex, HStack, VStack, chakra, Text } from '@chakra-ui/react'
import React from 'react'
import { getWikiMetadataById } from '@/utils/WikiUtils/getWikiFields'
import RelatedMediaGrid from './InsightComponents/RelatedMedia'
const RelatedWikis = dynamic<{ wikiId: string; category: string }>(() =>
  import('./InsightComponents/RelatedWikis').then((mod) => mod.RelatedWikis),
)
import TwitterTimeline from './InsightComponents/TwitterTimeline'
import WikiActionBar from './WikiActionBar'
import WikiInsights from './WikiInsights'
import WikiMainContent from './WikiMainContent'
import WikiReferences from './WikiReferences'
import WikiTableOfContents from './WikiTableOfContents'
import WikiRating from './InsightComponents/WikiRating'
import WikiCommitMessage from './InsightComponents/WikiCommitMessage'

interface WikiLayoutProps {
  wiki: Wiki
  ipfs?: string
}

//TODO: use Wiki partial
const MobileMeta = (wiki: {
  metadata: { id: string; value: string }[]
  media?: Media[]
  id: string
  categories: { id: string }[]
  user: User
  updated?: string
}) => {
  const { metadata, media, id, categories, user, updated } = wiki
  const twitterLink = metadata.find(
    (meta) => meta.id === CommonMetaIds.TWITTER_PROFILE,
  )?.value

  const commitMessage = wiki.metadata.find(
    (meta) => meta.id === EditSpecificMetaIds.COMMIT_MESSAGE,
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
      <WikiCommitMessage
        commitMessage={commitMessage}
        user={user}
        lastUpdated={updated}
      />
      <WikiRating contentId={id} />
      {!!twitterLink && <TwitterTimeline url={twitterLink} />}
      <RelatedWikis wikiId={id} category={categories[0].id} />
      {media && media.length > 0 && <RelatedMediaGrid media={media} />}
    </VStack>
  )
}

export const WikiMarkup = ({ wiki, ipfs }: WikiLayoutProps) => {
  const referencesRaw =
    getWikiMetadataById(wiki, CommonMetaIds.REFERENCES)?.value ?? '[]'
  let references: any[]

  try {
    references = JSON.parse(referencesRaw)
  } catch (e) {
    console.error('Failed to parse JSON:', e)
    references = []
  }

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
            <WikiInsights wiki={wiki} ipfs={ipfs} />
            <Text
              fontSize="4xl"
              fontWeight="bold"
              mt={2}
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
              media={wiki.media}
              id={wiki.id}
              categories={wiki.categories}
              user={wiki.user}
              updated={wiki.updated}
            />
          </chakra.div>
          <WikiReferences references={references} />
        </Box>
      </Flex>
      {wiki?.content.includes('# ') && <WikiTableOfContents />}
    </HStack>
  )
}
