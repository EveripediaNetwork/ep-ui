import React from 'react'
import { VStack } from '@chakra-ui/react'
import { Wiki } from '@/types/Wiki'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { WikiDetails } from './InsightComponents/WikiDetails'
import { RelatedWikis } from './InsightComponents/RelatedWikis'
import ProfileStatistics from './InsightComponents/ProfileStatistics'
import ProfileSummary from './InsightComponents/ProfileSummary'
import TwitterTimeline from './InsightComponents/TwitterTimeline'
import RelatedMediaGrid from './InsightComponents/RelatedMedia'
import CurrencyConverter from './InsightComponents/CurrencyConverter'

interface WikiInsightsProps {
  wiki: Wiki
  ipfs?: string
}

const WikiInsights = ({ wiki, ipfs }: WikiInsightsProps) => (
  <VStack
    maxW="500px"
    borderLeftWidth={{ base: 0, md: '1px' }}
    w={{ base: '100%', md: '50%' }}
    mx={{ base: 'auto', md: 0 }}
    p={4}
    spacing={4}
    pt={24}
  >
    <WikiDetails
      wikiTitle={wiki}
      categories={wiki.categories}
      lastEdited={wiki.updated || wiki?.created}
      ipfsHash={ipfs || wiki.ipfs}
      txHash={wiki.transactionHash}
      lastEditor={wiki.user?.id}
      imgSrc={getWikiImageUrl(wiki)}
    />
    <ProfileSummary />
    <ProfileStatistics />
    <CurrencyConverter token="everipedia" tokenSymbol="IQ" />
    {wiki.metadata[1]?.value && (
      <TwitterTimeline url={wiki.metadata[1].value} />
    )}
    {wiki.categories.length !== 0 && (
      <RelatedWikis categories={wiki.categories} />
    )}
    <RelatedMediaGrid />
  </VStack>
)

export default WikiInsights
