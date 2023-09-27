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
import { FaBrain } from 'react-icons/fa'
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
import { OnClickMap, RankCardType, SortOrder } from '@/types/RankDataTypes'
import { useRouter } from 'next/router'
import { CATEGORIES_WITH_INDEX } from '@/data/RankingListData'
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
  pagination,
}: {
  totalNfts: number
  totalTokens: number
  pagination: { category: string; page: number }
}) => {
  const hasRenderedInitialItems = useRef(false)
  const [tokenItems, setTokenItems] = useState<RankCardType[]>([])
  const [aiTokenItems, setAiTokenItems] = useState<RankCardType[]>([])
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

  const totalTokenOffset = LISTING_LIMIT * (tokensOffset - 1)
  const totalAiTokenOffset = LISTING_LIMIT * (aiTokensOffset - 1)
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

  const { data: nftData, isFetching: NFTisFetching } = useGetNFTRankingQuery({
    kind: 'NFT',
    offset: nftOffset,
    limit: LISTING_LIMIT,
  })

  /* Sets items before render finishes to prevent flash of empty items and reduce Cumulative Layout Shift */
  if (
    tokenData &&
    nftData &&
    !nftItems.length &&
    !tokenItems.length &&
    !hasRenderedInitialItems.current
  ) {
    setTokenItems(sortByMarketCap('descending', tokenData))
    setNftItems(sortByMarketCap('descending', nftData))
    setAiTokenItems(
      sortByMarketCap(
        'descending',
        tokenData.filter((item) => item?.tokenMarketData?.isAiToken === true),
      ),
    )
    hasRenderedInitialItems.current = true
  }

  useEffect(() => {
    if (tokenData && nftData && hasRenderedInitialItems.current) {
      setTokenItems(sortByMarketCap('descending', tokenData))
      setNftItems(sortByMarketCap('descending', nftData))
      setAiTokenItems(
        sortByMarketCap(
          'descending',
          tokenData.filter((item) => item?.tokenMarketData?.isAiToken === true),
        ),
      )
    }
  }, [tokenData, nftData])

  const onClickMap: OnClickMap = {
    Marketcap: function () {
      if (nftData && tokenData) {
        const newSortOrder =
          sortOrder === 'ascending' ? 'descending' : 'ascending'
        setOrder(newSortOrder)
        setTokenItems(sortByMarketCap(newSortOrder, tokenData))
        setNftItems(sortByMarketCap(newSortOrder, nftData))
        setAiTokenItems(
          sortByMarketCap(
            newSortOrder,
            tokenData.filter(
              (item) => item?.tokenMarketData?.isAiToken === true,
            ),
          ),
        )
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
            <TabList border="none" display="flex" gap={{ base: '5', md: '8' }}>
              <RankingListButton
                label="Cryptocurrencies"
                icon={RiCoinsFill}
                fontSize={{ lg: '20px' }}
              />
              <RankingListButton
                label="AI Tokens"
                icon={FaBrain}
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
                hasPagination
                currentPage={tokensOffset}
                totalCount={totalTokens}
                pageSize={LISTING_LIMIT}
                onPageChange={(page) => setTokensOffset(page)}
              >
                <RankTableHead onClickMap={onClickMap} />
                <Tbody>
                  {isFetching || !tokenItems ? (
                    <LoadingRankCardSkeleton length={20} />
                  ) : (
                    tokenItems?.map((token, index) =>
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
                hasPagination
                currentPage={aiTokensOffset}
                totalCount={totalTokens}
                pageSize={LISTING_LIMIT}
                onPageChange={(page) => setAiTokensOffset(page)}
              >
                <RankTableHead onClickMap={onClickMap} />
                <Tbody>
                  {isFetching || !aiTokenItems ? (
                    <LoadingRankCardSkeleton length={20} />
                  ) : (
                    aiTokenItems?.map((token, index) =>
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
                NFT wikis ranked by Market Cap Prices
              </Text>
              <RankTable
                hasPagination
                currentPage={nftOffset}
                totalCount={totalNfts}
                pageSize={LISTING_LIMIT}
                onPageChange={(page) => setNftOffset(page)}
              >
                <RankTableHead onClickMap={onClickMap} />
                <Tbody>
                  {NFTisFetching || !nftItems ? (
                    <LoadingRankCardSkeleton length={20} />
                  ) : (
                    nftItems?.map((nft, index) =>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data: tokensData } = await store.dispatch(
    getCategoryTotal.initiate({ category: 'cryptocurrencies' }),
  )

  const { category, page } = ctx.query as {
    category: string
    page: string | null
  }

  const { data: nftsData } = await store.dispatch(
    getCategoryTotal.initiate({ category: 'nfts' }),
  )

  const totalTokens = tokensData?.categoryTotal.amount
  const totalNfts = nftsData?.categoryTotal.amount

  return {
    props: {
      totalTokens,
      totalNfts,
      pagination: {
        category: category || 'cryptocurrencies',
        page: Number(page) || 1,
      },
    },
  }
}
