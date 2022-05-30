import React, { useEffect, useState } from 'react'
import { VStack } from '@chakra-ui/react'
import { CommonMetaIds, Wiki } from '@/types/Wiki'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { TokenStats } from '@/services/token-stats'
import { fetchTokenStats, getTokenFromURI } from '@/services/token-stats/utils'
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

const WikiInsights = ({ wiki, ipfs }: WikiInsightsProps) => {
  const coingeckoLink = wiki.metadata.find(
    meta => meta.id === CommonMetaIds.COINGECKO_PROFILE,
  )?.value

  const twitterLink = wiki.metadata.find(
    meta => meta.id === CommonMetaIds.TWITTER_PROFILE,
  )?.value

  const [tokenStats, setTokenStats] = useState<TokenStats>()
  useEffect(() => {
    const fetchTokenData = async () => {
      await fetchTokenStats(coingeckoLink).then(res => {
        setTokenStats(res)
      })
    }
    fetchTokenData()
  }, [])

  return (
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

      {!!coingeckoLink && (
        <>
          <ProfileSummary wiki={wiki} />
          <ProfileStatistics tokenStats={tokenStats} />
          {tokenStats && (
            <CurrencyConverter
              token={getTokenFromURI(coingeckoLink)}
              tokenStats={tokenStats}
            />
          )}
        </>
      )}
      {!!twitterLink && <TwitterTimeline url={twitterLink} />}
      {wiki.categories.length !== 0 && (
        <RelatedWikis categories={wiki.categories} />
      )}
      <RelatedMediaGrid />
    </VStack>
  )
}

export default WikiInsights
