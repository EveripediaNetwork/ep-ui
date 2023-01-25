import React, { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import {
  Text,
  Box,
  Flex,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
} from '@chakra-ui/react'
import { BiImage } from 'react-icons/bi'
import { RiCoinsFill } from 'react-icons/ri'
import RankHeader from '@/components/SEO/Rank'
import RankingListButton from '@/components/Rank/RankButton'
import { RankTable, RankTableHead } from '@/components/Rank/RankTable'
import {
  getCategoryTotal,
  useGetNFTRankingQuery,
  useGetTokenRankingQuery,
} from '@/services/ranking'
import { InvalidRankCardItem } from '@/components/Rank/InvalidRankCardItem'
import { store } from '@/store/store'
import { LoadingRankCardSkeleton } from '@/components/Rank/LoadingRankCardSkeleton'
import RankingItem from '@/components/Rank/RankCardItem'
import RankHero from './RankHero'

const LISTING_LIMITS = 20

const Rank = ({
  totalTokens,
  totalNfts,
}: {
  totalNfts: number
  totalTokens: number
}) => {
  const [nftOffset, setNftOffset] = useState<number>(1)
  const [tokensOffset, setTokensOffset] = useState<number>(1)
  const [tokenCount, setTokenCount] = useState<number>(0)
  const [nftCount, setNftCount] = useState<number>(0)

  useEffect(() => {
    setTokenCount(tokensOffset * 10 - 10)
    setNftCount(nftOffset * 10 - 10)
  }, [nftOffset, tokensOffset])

  const { data: tokensObject, isFetching } = useGetTokenRankingQuery({
    kind: 'TOKEN',
    offset: tokensOffset,
    limit: LISTING_LIMITS,
  })

  const { data: nftsObject } = useGetNFTRankingQuery({
    kind: 'NFT',
    offset: nftOffset,
    limit: LISTING_LIMITS,
  })

  return (
    <Box>
      <RankHeader />
      <Box
        bg="url(/rankingbg.png)"
        _dark={{
          bg: 'url(/rankingDarkBG.png)',
        }}
        bgPos="center"
        my={-2}
        bgSize="cover !important"
        bgColor="#F7FAFC"
      >
        <RankHero />
      </Box>
      <Flex
        maxW={{ base: '100%', '2xl': '1280px', md: '95%' }}
        mx="auto"
        py={16}
        flexWrap="wrap"
        gap={{ base: 10, md: 0, lg: 4 }}
        justifyContent={{ lg: 'center', md: 'space-between' }}
      >
        <Tabs w="full">
          <Flex justifyContent="center">
            <TabList border="none" display="flex" gap="8">
              <RankingListButton
                label="Cryptocurrencies"
                icon={RiCoinsFill}
                fontSize={{ lg: '20px' }}
              />
              <RankingListButton
                label="NFTs"
                icon={BiImage}
                fontSize={{ lg: '20px' }}
              />
            </TabList>
          </Flex>
          <TabPanels mt="6">
            <TabPanel>
              <Text
                color="homeDescriptionColor"
                fontSize={{ base: 'lg', lg: 22 }}
                mx="auto"
                mb={9}
                px={4}
                textAlign="center"
                maxW="750"
              >
                Cryptocurrency wikis ranked by Market Cap Prices
              </Text>
              <RankTable
                hasPagination
                currentPage={tokensOffset}
                totalCount={totalTokens}
                pageSize={LISTING_LIMITS}
                onPageChange={page => setTokensOffset(page)}
              >
                <RankTableHead />
                <Tbody>
                  {!isFetching ? (
                    <LoadingRankCardSkeleton length={20} />
                  ) : (
                    tokensObject?.map((token, index) =>
                      token ? (
                        <RankingItem index={tokenCount + index} item={token} />
                      ) : (
                        <InvalidRankCardItem index={tokenCount + index} />
                      ),
                    )
                  )}
                </Tbody>
              </RankTable>
            </TabPanel>
            <TabPanel>
              <Text
                color="homeDescriptionColor"
                fontSize={{ base: 'lg', lg: 22 }}
                mx="auto"
                mb={9}
                px={4}
                textAlign="center"
                maxW="750"
              >
                NFT wikis ranked by Market Cap Prices
              </Text>
              <RankTable
                hasPagination
                currentPage={nftOffset}
                totalCount={totalNfts}
                pageSize={LISTING_LIMITS}
                onPageChange={page => setNftOffset(page)}
              >
                <RankTableHead />
                <Tbody>
                  {nftsObject?.map((nft, index) =>
                    nft ? (
                      <RankingItem index={index + nftCount} item={nft} />
                    ) : (
                      <InvalidRankCardItem index={index + nftCount} />
                    ),
                  )}
                </Tbody>
              </RankTable>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Box>
  )
}

export default Rank

export const getStaticProps: GetStaticProps = async () => {
  const { data: tokensData } = await store.dispatch(
    getCategoryTotal.initiate({ category: 'cryptocurrencies' }),
  )

  const { data: nftsData } = await store.dispatch(
    getCategoryTotal.initiate({ category: 'nfts' }),
  )

  const totalTokens = tokensData?.categoryTotal.amount
  const totalNfts = nftsData?.categoryTotal.amount

  return {
    props: {
      totalTokens,
      totalNfts,
    },
  }
}
