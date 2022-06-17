import React, { useEffect, useState } from 'react'
import { Flex, VStack } from '@chakra-ui/react'
import { CommonMetaIds, EditSpecificMetaIds, Wiki } from '@/types/Wiki'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { TokenStats } from '@/services/token-stats'
import { fetchTokenStats, getTokenFromURI } from '@/services/token-stats/utils'
import ReactStickyBox from 'react-sticky-box'
import { WikiDetails } from './InsightComponents/WikiDetails'
import { RelatedWikis } from './InsightComponents/RelatedWikis'
import ProfileStatistics from './InsightComponents/ProfileStatistics'
import ProfileSummary from './InsightComponents/ProfileSummary'
import TwitterTimeline from './InsightComponents/TwitterTimeline'
import RelatedMediaGrid from './InsightComponents/RelatedMedia'
import CurrencyConverter from './InsightComponents/CurrencyConverter'
import WikiCommitMessage from './InsightComponents/WikiCommiMessage'

interface WikiInsightsProps {
  wiki: Wiki
  ipfs?: string
  dateTime?: string | undefined
}

const WikiInsights = ({ wiki, ipfs, dateTime }: WikiInsightsProps) => {
  const coingeckoLink = wiki.metadata.find(
    meta => meta.id === CommonMetaIds.COINGECKO_PROFILE,
  )?.value

  const twitterLink = wiki.metadata.find(
    meta => meta.id === CommonMetaIds.TWITTER_PROFILE,
  )?.value

  const commitMessage = wiki.metadata.find(
    meta => meta.id === EditSpecificMetaIds.COMMIT_MESSAGE,
  )?.value

  const [tokenStats, setTokenStats] = useState<TokenStats>()
  useEffect(() => {
    const fetchTokenData = async () => {
      await fetchTokenStats(coingeckoLink).then(res => {
        setTokenStats(res)
      })
    }
    fetchTokenData()
  }, [coingeckoLink])

  return (
    <VStack
      maxW="500px"
      borderLeftWidth={{ base: 0, md: '1px' }}
      w={{ base: '100%', md: '50%', lg: '40%', '2xl': '50%' }}
      mx={{ base: 'auto', md: 0 }}
      p={4}
      pt={{ lg: '24', base: '10' }}
    >
      <ReactStickyBox offsetTop={100} offsetBottom={20}>
        <VStack spacing={4}>
          <WikiDetails
            wikiTitle={wiki}
            categories={wiki.categories}
            lastEdited={wiki.updated || wiki?.created || dateTime}
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

          <WikiCommitMessage
            commitMessage={commitMessage}
            user={wiki.user}
            lastUpdated={wiki.updated || dateTime}
          />

          <Flex display={{ base: 'none', lg: 'block', md: 'block' }} gap={6}>
            {!!twitterLink && <TwitterTimeline url={twitterLink} />}
            {wiki.categories.length !== 0 && (
              <RelatedWikis categories={wiki.categories} />
            )}
            {wiki.media && wiki.media.length > 0 && (
              <RelatedMediaGrid media={wiki.media} />
            )}
          </Flex>
        </VStack>
      </ReactStickyBox>
    </VStack>
  )
}

export default WikiInsights
