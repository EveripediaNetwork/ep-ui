import React, { useEffect, useState, useRef } from 'react'
import { GetServerSideProps } from 'next'
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
import { RiCoinsFill, RiRobotFill, RiCoinFill } from 'react-icons/ri'
import RankHeader from '@/components/SEO/Rank'
import RankingListButton from '@/components/Rank/RankButton'
import { RankTable, RankTableHead } from '@/components/Rank/RankTable'
import {
  getCategoryTotal,
  useGetNFTRankingQuery,
  useGetTokenRankingQuery,
  useGetAiTokenRankingQuery,
  useGetStableCoinRankingQuery,
} from '@/services/ranking'
import { InvalidRankCardItem } from '@/components/Rank/InvalidRankCardItem'
import { store } from '@/store/store'
import { LoadingRankCardSkeleton } from '@/components/Rank/LoadingRankCardSkeleton'
import RankingItem from '@/components/Rank/RankCardItem'
import RankHero from './RankHero'
import { OnClickMap, RankCardType, SortOrder } from '@/types/RankDataTypes'
import { useRouter } from 'next/router'
import { CATEGORIES_WITH_INDEX, EXCLUDED_COINS } from '@/data/RankingListData'
import { getKeyByValue } from '@/utils/DataTransform/getKeyByValue'
import { CategoryKeyType } from '@/types/RankDataTypes'

export const LISTING_LIMIT = 20

export const sortByMarketCap = (order: SortOrder, items: RankCardType[]) => {
  const innerItems = [...items]

  try {
    innerItems.sort((a, b) => {
      const MarketCapA =
        a?.nftMarketData?.market_cap_usd ?? a?.tokenMarketData?.market_cap ?? 0
      const MarketCapB =
        b?.nftMarketData?.market_cap_usd ?? b?.tokenMarketData?.market_cap ?? 0
      if (order === 'ascending') {
        return MarketCapA - MarketCapB
      } else {
        return MarketCapB - MarketCapA
      }
    })
  } catch (e) {
    console.log(e)
  }

  return innerItems
}

const Rank = ({
  totalTokens,
  totalNfts,
  totalAiTokens,
  totalStableCoins,
  pagination,
}: {
  totalNfts: number
  totalTokens: number
  totalAiTokens: number
  totalStableCoins: number
  pagination: { category: string; page: number }
}) => {
  const hasRenderedInitialItems = useRef(false)
  const [tokenItems, setTokenItems] = useState<RankCardType[]>([])
  const [aiTokenItems, setAiTokenItems] = useState<RankCardType[]>([])
  const [stableCoinItems, setStableCoinItems] = useState<RankCardType[]>([])
  const [nftItems, setNftItems] = useState<RankCardType[]>([])
  const [sortOrder, setOrder] = useState<SortOrder>('descending')
  const router = useRouter()
  const { pathname } = router

  const [nftOffset, setNftOffset] = useState<number>(
    pagination.category === 'nfts' ? pagination.page : 1,
  )
  const [tokensOffset, setTokensOffset] = useState<number>(
    pagination.category === 'cryptocurrencies' ? pagination.page : 1,
  )
  const [aiTokensOffset, setAiTokensOffset] = useState<number>(
    pagination.category === 'aitokens' ? pagination.page : 1,
  )

  const [stableCoinOffset, setStableCoinOffset] = useState<number>(
    pagination.category === 'stableCoins' ? pagination.page : 1,
  )

  const totalTokenOffset = LISTING_LIMIT * (tokensOffset - 1)
  const totalAiTokenOffset = LISTING_LIMIT * (aiTokensOffset - 1)
  const totalStableCoinOffset = LISTING_LIMIT * (stableCoinOffset - 1)
  const totalNftCount = LISTING_LIMIT * (nftOffset - 1)

  const handleCategoryChange = (index: number) => {
    router.push(
      {
        pathname,
        query: {
          category: getKeyByValue(CATEGORIES_WITH_INDEX, index),
          page: 1,
        },
      },
      undefined,
      { shallow: true },
    )
  }

  const { data: tokenData, isFetching } = useGetTokenRankingQuery({
    kind: 'TOKEN',
    offset: tokensOffset,
    limit: LISTING_LIMIT,
  })

  const { data: aiTokenData, isFetching: aiTokenisFetching } =
    useGetAiTokenRankingQuery({
      kind: 'TOKEN',
      offset: aiTokensOffset,
      limit: LISTING_LIMIT,
      category: 'AI',
    })

  const { data: unfilteredStableCoinData, isFetching: stableCoinisFetching } =
    useGetStableCoinRankingQuery({
      kind: 'TOKEN',
      offset: stableCoinOffset,
      limit: LISTING_LIMIT,
      category: 'STABLE_COINS',
    })

  const stableCoinData = unfilteredStableCoinData?.filter(
    item => !EXCLUDED_COINS.includes(item.id),
  )

  const { data: nftData, isFetching: NFTisFetching } = useGetNFTRankingQuery({
    kind: 'NFT',
    offset: nftOffset,
    limit: LISTING_LIMIT,
  })

  /* Sets items before render finishes to prevent flash of empty items and reduce Cumulative Layout Shift */
  if (
    tokenData &&
    nftData &&
    aiTokenData &&
    stableCoinData &&
    !nftItems.length &&
    !tokenItems.length &&
    !aiTokenItems.length &&
    !stableCoinItems.length &&
    !hasRenderedInitialItems.current
  ) {
    setTokenItems(sortByMarketCap('descending', tokenData))
    setAiTokenItems(sortByMarketCap('descending', aiTokenData))
    setStableCoinItems(sortByMarketCap('descending', stableCoinData))
    setNftItems(sortByMarketCap('descending', nftData))
    hasRenderedInitialItems.current = true
  }

  useEffect(() => {
    if (
      tokenData &&
      nftData &&
      aiTokenData &&
      stableCoinData &&
      hasRenderedInitialItems.current
    ) {
      setTokenItems(sortByMarketCap('descending', tokenData))
      setAiTokenItems(sortByMarketCap('descending', aiTokenData))
      setStableCoinItems(sortByMarketCap('descending', stableCoinData))
      setNftItems(sortByMarketCap('descending', nftData))
    }
  }, [tokenData, aiTokenData, stableCoinData, nftData])

  const onClickMap: OnClickMap = {
    'Market Cap': function () {
      if (nftData && aiTokenData && tokenData && stableCoinData) {
        const newSortOrder =
          sortOrder === 'ascending' ? 'descending' : 'ascending'
        setOrder(newSortOrder)
        setTokenItems(sortByMarketCap(newSortOrder, tokenData))
        setAiTokenItems(sortByMarketCap(newSortOrder, aiTokenData))
        setStableCoinItems(sortByMarketCap(newSortOrder, stableCoinData))
        setNftItems(sortByMarketCap(newSortOrder, nftData))
      }
    },
  }
  return (
    <Box>
      <RankHeader />
      <Box
        bg="url(/images/backgrounds/rank-bg-light.png)"
        _dark={{
          bg: 'url(/images/backgrounds/ranking-bg-dark.png)',
        }}
        bgPos="center"
        my={-2}
        bgSize="cover !important"
        bgColor="gray.100"
        pb={8}
      >
        <RankHero />
      </Box>
      <Flex
        maxW={{ base: '100%', '2xl': '1280px', md: '95%' }}
        mx="auto"
        pl={2}
        py={16}
        flexWrap="wrap"
        gap={{ base: 10, md: 0, lg: 4 }}
        justifyContent={{ lg: 'center', md: 'space-between' }}
      >
        <Tabs
          defaultIndex={
            CATEGORIES_WITH_INDEX[pagination.category as CategoryKeyType]
          }
          w="full"
          onChange={handleCategoryChange}
        >
          <Flex justifyContent="center">
            <TabList
              border="none"
              display="flex"
              gap={{ base: '2', md: '8' }}
              overflowX={'auto'}
              overflowY={'hidden'}
            >
              <RankingListButton
                label="Cryptocurrencies"
                icon={RiCoinsFill}
                fontSize={{ lg: '20px' }}
              />
              <RankingListButton
                label="AI Tokens"
                icon={RiRobotFill}
                fontSize={{ lg: '20px' }}
              />
              <RankingListButton
                label="Stablecoins"
                icon={RiCoinFill}
                fontSize={{ lg: '20px' }}
              />
              <RankingListButton
                label="NFTs"
                icon={BiImage}
                fontSize={{ lg: '20px' }}
              />
            </TabList>
          </Flex>
          <TabPanels mt="2">
            <TabPanel>
              <Text
                color="homeDescriptionColor"
                fontSize={{ base: 'lg', lg: 22 }}
                mx="auto"
                mb={12}
                px={4}
                textAlign="center"
                maxW="750"
              >
                Cryptocurrency wikis ranked by Market Cap Prices
              </Text>
              <RankTable
                hasPagination={tokenItems?.length >= LISTING_LIMIT}
                currentPage={tokensOffset}
                totalCount={totalTokens}
                pageSize={LISTING_LIMIT}
                onPageChange={page => setTokensOffset(page)}
              >
                <RankTableHead onClickMap={onClickMap} />
                <Tbody>
                  {isFetching || !tokenItems ? (
                    <LoadingRankCardSkeleton length={20} />
                  ) : (
                    tokenItems.map((token, index) =>
                      token ? (
                        <RankingItem
                          listingLimit={LISTING_LIMIT}
                          offset={totalTokenOffset}
                          order={sortOrder}
                          key={token.id}
                          index={index}
                          item={token}
                        />
                      ) : (
                        <InvalidRankCardItem
                          key={`invalid-token${index}`}
                          index={totalTokenOffset + index}
                        />
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
                mb={12}
                px={4}
                textAlign="center"
                maxW="750"
              >
                AI Token wikis ranked by Market Cap Prices
              </Text>
              <RankTable
                hasPagination={aiTokenItems?.length >= LISTING_LIMIT}
                currentPage={aiTokensOffset}
                totalCount={totalAiTokens}
                pageSize={LISTING_LIMIT}
                onPageChange={page => setAiTokensOffset(page)}
              >
                <RankTableHead onClickMap={onClickMap} />
                <Tbody>
                  {aiTokenisFetching || !aiTokenItems ? (
                    <LoadingRankCardSkeleton length={20} />
                  ) : (
                    aiTokenItems.map((token, index) =>
                      token ? (
                        <RankingItem
                          listingLimit={LISTING_LIMIT}
                          offset={totalAiTokenOffset}
                          order={sortOrder}
                          key={token.id}
                          index={index}
                          item={token}
                        />
                      ) : (
                        <InvalidRankCardItem
                          key={`invalid-token${index}`}
                          index={totalAiTokenOffset + index}
                        />
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
                mb={12}
                px={4}
                textAlign="center"
                maxW="750"
              >
                Stablecoin wikis ranked by Market Cap Prices
              </Text>
              <RankTable
                hasPagination={stableCoinItems?.length >= LISTING_LIMIT}
                currentPage={stableCoinOffset}
                totalCount={totalStableCoins}
                pageSize={LISTING_LIMIT}
                onPageChange={page => setStableCoinOffset(page)}
              >
                <RankTableHead onClickMap={onClickMap} />
                <Tbody>
                  {stableCoinisFetching || !stableCoinItems ? (
                    <LoadingRankCardSkeleton length={20} />
                  ) : (
                    stableCoinItems.map((token, index) =>
                      token ? (
                        <RankingItem
                          listingLimit={LISTING_LIMIT}
                          offset={totalStableCoinOffset}
                          order={sortOrder}
                          key={token.id}
                          index={index}
                          item={token}
                        />
                      ) : (
                        <InvalidRankCardItem
                          key={`invalid-token${index}`}
                          index={totalStableCoinOffset + index}
                        />
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
                mb={12}
                px={4}
                textAlign="center"
                maxW="750"
              >
                NFT wikis ranked by Market Cap Prices
              </Text>
              <RankTable
                hasPagination={nftItems?.length >= LISTING_LIMIT}
                currentPage={nftOffset}
                totalCount={totalNfts}
                pageSize={LISTING_LIMIT}
                onPageChange={page => setNftOffset(page)}
              >
                <RankTableHead onClickMap={onClickMap} />
                <Tbody>
                  {NFTisFetching || !nftItems ? (
                    <LoadingRankCardSkeleton length={20} />
                  ) : (
                    nftItems.map((nft, index) =>
                      nft ? (
                        <RankingItem
                          listingLimit={LISTING_LIMIT}
                          offset={totalNftCount}
                          order={sortOrder}
                          key={nft.id}
                          index={index}
                          item={nft}
                        />
                      ) : (
                        <InvalidRankCardItem
                          key={`invalid-nft-${index}`}
                          index={index + totalNftCount}
                        />
                      ),
                    )
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

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { data: tokensData } = await store.dispatch(
    getCategoryTotal.initiate({ category: 'cryptocurrencies' }),
  )

  const { data: aiTokensData } = await store.dispatch(
    getCategoryTotal.initiate({ category: 'aitokens' }),
  )

  const { data: stableCoinData } = await store.dispatch(
    getCategoryTotal.initiate({ category: 'stableCoins' }),
  )

  const { data: nftsData } = await store.dispatch(
    getCategoryTotal.initiate({ category: 'nfts' }),
  )

  const { category, page } = ctx.query as {
    category: string
    page: string | null
  }

  const totalTokens = tokensData?.categoryTotal.amount
  const totalAiTokens = aiTokensData?.categoryTotal.amount
  const totalStableCoins = stableCoinData?.categoryTotal.amount
  const totalNfts = nftsData?.categoryTotal.amount

  return {
    props: {
      totalTokens,
      totalAiTokens,
      totalStableCoins,
      totalNfts,
      pagination: {
        category: category || 'cryptocurrencies',
        page: Number(page) || 1,
      },
    },
  }
}
