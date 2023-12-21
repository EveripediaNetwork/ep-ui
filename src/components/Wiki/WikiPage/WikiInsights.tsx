import React, { useEffect, useState } from 'react'
import { Box, Flex, VStack } from '@chakra-ui/react'
import { CommonMetaIds, EditSpecificMetaIds, Wiki } from '@everipedia/iq-utils'
import { TokenStats } from '@/services/token-stats'
import { NFTStats } from '@/services/nft-stats'
import { fetchTokenStats, getTokenFromURI } from '@/services/token-stats/utils'
import { fetchNFTStats } from '@/services/nft-stats/utils'
import { useStickyBox } from 'react-sticky-box'
import { getWikiImageUrl } from '@/utils/WikiUtils/getWikiImageUrl'
import { getUserAddressFromCache } from '@/utils/WalletUtils/getUserAddressFromCache'
import { WikiDetails } from './InsightComponents/WikiDetails'
import { RelatedWikis } from './InsightComponents/RelatedWikis'
import ProfileStatistics from './InsightComponents/ProfileStatistics'
import ProfileSummary from './InsightComponents/ProfileSummary'
import TwitterTimeline from './InsightComponents/TwitterTimeline'
import RelatedMediaGrid from './InsightComponents/RelatedMedia'
import CurrencyConverter from './InsightComponents/CurrencyConverter'
import WikiCommitMessage from './InsightComponents/WikiCommitMessage'
import NFTWidget from './InsightComponents/NFTWidget'
import NFTStatistics from './InsightComponents/NFTStatistics'
import ContentFeedback from './InsightComponents/ContentFeedback'
import WikiAdCard from '../WikiCard/WikiAdCard'

interface WikiInsightsProps {
  wiki: Wiki
  ipfs?: string
  dateTime?: string | undefined
}

const WikiInsights = ({ wiki, ipfs, dateTime }: WikiInsightsProps) => {
  const stickyRef = useStickyBox({ offsetTop: 100, offsetBottom: 20 })
  const coingeckoLink = wiki.metadata.find(
    meta => meta.id === CommonMetaIds.COINGECKO_PROFILE,
  )?.value

  const coinmarketcapLink = wiki.metadata.find(
    meta => meta.id === CommonMetaIds.COIN_MARKET_CAP,
  )?.value

  const twitterLink = wiki.metadata.find(
    meta => meta.id === CommonMetaIds.TWITTER_PROFILE,
  )?.value

  const commitMessage = wiki.metadata.find(
    meta => meta.id === EditSpecificMetaIds.COMMIT_MESSAGE,
  )?.value

  const wikiIsNFT = /https:\/\/(www.)?coingecko.com\/en\/nft\/(.+)/.test(
    coingeckoLink || '',
  )

  const [tokenStats, setTokenStats] = useState<TokenStats>()
  const [nftStats, setNftStats] = useState<NFTStats>()

  useEffect(() => {
    if (!wikiIsNFT) {
      const fetchTokenData = async () => {
        await fetchTokenStats(coingeckoLink, coinmarketcapLink).then(res => {
          setTokenStats(res)
        })
      }

      fetchTokenData()
    }

    if (wikiIsNFT) {
      const fetchNFTData = async () => {
        await fetchNFTStats(coingeckoLink).then(res => {
          setNftStats(res)
        })
      }

      fetchNFTData()
    }
  }, [coingeckoLink, wikiIsNFT])

  console.log(tokenStats)
  const userAddress = getUserAddressFromCache()
  return (
    <VStack
      borderLeftWidth={{ base: 0, xl: '1px' }}
      p={{ base: 0, md: 2, xl: 4 }}
      pr={{ md: 11, xl: 4 }}
      pt={{ xl: '9', md: '8', base: '10' }}
      borderColor="rankingListBorder"
    >
      <Box as="aside" ref={stickyRef} w="100%">
        <Flex
          direction={{ base: 'column-reverse', xl: 'column' }}
          w={{ base: '90%', md: '100%', xl: 'clamp(300px, 25vw, 430px)' }}
          mx={{ base: 'auto', xl: 0 }}
          px={{ base: '0', md: '4', xl: '0' }}
          gap={6}
        >
          <WikiAdCard />
          <VStack spacing={6}>
            <WikiDetails
              wikiTitle={wiki}
              categories={wiki.categories}
              createdTime={wiki?.created}
              ipfsHash={ipfs || wiki.ipfs}
              txHash={wiki.transactionHash}
              createdBy={wiki.author}
              imgSrc={getWikiImageUrl(wiki.images)}
              views={wiki.views}
            />
            <ProfileSummary wiki={wiki} />
            <Box w="full" display={{ base: 'none', xl: 'block' }}>
              <ContentFeedback
                choice
                contentId={wiki.id}
                userId={userAddress}
              />
            </Box>
            {!!coingeckoLink && (
              <>
                <ProfileStatistics tokenStats={tokenStats} />
                {wikiIsNFT && <NFTStatistics nftStats={nftStats} />}
                {tokenStats && (
                  <CurrencyConverter
                    tokenImage={tokenStats.token_image_url}
                    token={getTokenFromURI(coingeckoLink)}
                    tokenStats={tokenStats}
                  />
                )}
              </>
            )}
            <NFTWidget categories={wiki.categories} metaData={wiki.metadata} />
            <WikiCommitMessage
              commitMessage={commitMessage}
              user={wiki.user}
              lastUpdated={wiki.updated || dateTime}
            />
            <Flex
              w="100%"
              display={{ base: 'none', xl: 'block', md: 'none' }}
              gap={6}
            >
              {!!twitterLink && <TwitterTimeline url={twitterLink} />}
              {wiki.categories.length !== 0 && (
                <RelatedWikis
                  wikiId={wiki.id}
                  category={wiki.categories[0].id}
                />
              )}
              {wiki.media && wiki.media.length > 0 && (
                <RelatedMediaGrid media={wiki.media} />
              )}
            </Flex>
          </VStack>
        </Flex>
      </Box>
    </VStack>
  )
}

export default WikiInsights
