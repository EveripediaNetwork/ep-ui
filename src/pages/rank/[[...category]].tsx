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
  Divider,
  chakra,
} from '@chakra-ui/react'
import { BiImage } from 'react-icons/bi'
import {
  RiCoinsFill,
  RiRobotFill,
  RiCoinFill,
  RiUserFill,
} from 'react-icons/ri'
import RankHeader from '@/components/SEO/Rank'
import RankingListButton from '@/components/Rank/RankButton'
import { RankTable, RankTableHead } from '@/components/Rank/RankTable'
import {
  FoundersRankTable,
  FoundersRankTableHead,
} from '@/components/Rank/FoundersRankTable'
import {
  getCategoryTotal,
  useGetNFTRankingQuery,
  useGetTokenRankingQuery,
  useGetAiTokenRankingQuery,
  useGetStableCoinRankingQuery,
  useGetFoundersRankingQuery,
} from '@/services/ranking'
import { InvalidRankCardItem } from '@/components/Rank/InvalidRankCardItem'
import { store } from '@/store/store'
import { LoadingRankCardSkeleton } from '@/components/Rank/LoadingRankCardSkeleton'
import RankingItem from '@/components/Rank/RankCardItem'
import { OnClickMap, RankCardType, SortOrder } from '@/types/RankDataTypes'
import { useRouter } from 'next/router'
import { CATEGORIES_WITH_INDEX } from '@/data/RankingListData'
import { getKeyByValue } from '@/utils/DataTransform/getKeyByValue'
import { CategoryKeyType } from '@/types/RankDataTypes'
import FounderRankingItem from '@/components/Rank/FounderRankCardItem'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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

//sortBy24hChange
export const sortBy24hChange = (order: SortOrder, items: RankCardType[]) => {
  const innerItems = [...items]

  try {
    innerItems.sort((a, b) => {
      const MarketCapChangeA =
        a?.nftMarketData?.market_cap_usd ??
        a?.tokenMarketData?.market_cap_change_24h ??
        0
      const MarketCapChangeB =
        b?.nftMarketData?.market_cap_usd ??
        b?.tokenMarketData?.market_cap_change_24h ??
        0
      if (order === 'ascending') {
        return MarketCapChangeA - MarketCapChangeB
      } else {
        return MarketCapChangeB - MarketCapChangeA
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
  const [founderItems, setFounderItems] = useState<RankCardType[]>([])
  const [sortOrder, setOrder] = useState<SortOrder>('descending')

  const router = useRouter()

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
  const [foundersOffset, setFoundersOffset] = useState<number>(
    pagination.category === 'founders' ? pagination.page : 1,
  )

  const totalTokenOffset = LISTING_LIMIT * (tokensOffset - 1)
  const totalAiTokenOffset = LISTING_LIMIT * (aiTokensOffset - 1)
  const totalStableCoinOffset = LISTING_LIMIT * (stableCoinOffset - 1)
  const totalNftOffset = LISTING_LIMIT * (nftOffset - 1)
  const totalFoundersOffset = LISTING_LIMIT * (foundersOffset - 1)

  const handleCategoryChange = (index: number) => {
    router.push(
      {
        pathname: `/rank/${getKeyByValue(CATEGORIES_WITH_INDEX, index)}`,
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

  const { data: stableCoinData, isFetching: stableCoinisFetching } =
    useGetStableCoinRankingQuery({
      kind: 'TOKEN',
      offset: stableCoinOffset,
      limit: LISTING_LIMIT,
      category: 'STABLE_COINS',
    })

  const { data: nftData, isFetching: NFTisFetching } = useGetNFTRankingQuery({
    kind: 'NFT',
    offset: nftOffset,
    limit: LISTING_LIMIT,
  })

  const { data: foundersData, isFetching: foundersisFetching } =
    useGetFoundersRankingQuery({
      kind: 'TOKEN',
      offset: foundersOffset,
      limit: LISTING_LIMIT,
      founders: true,
    })
  /* Sets items before render finishes to prevent flash of empty items and reduce Cumulative Layout Shift */
  if (
    tokenData &&
    nftData &&
    aiTokenData &&
    stableCoinData &&
    foundersData &&
    !nftItems.length &&
    !tokenItems.length &&
    !aiTokenItems.length &&
    !stableCoinItems.length &&
    !founderItems.length &&
    !hasRenderedInitialItems.current
  ) {
    setTokenItems(sortByMarketCap('descending', tokenData))
    setAiTokenItems(sortByMarketCap('descending', aiTokenData))
    setStableCoinItems(sortByMarketCap('descending', stableCoinData))
    setNftItems(sortByMarketCap('descending', nftData))
    setFounderItems(sortByMarketCap('descending', foundersData))
    hasRenderedInitialItems.current = true
  }

  useEffect(() => {
    if (
      tokenData &&
      nftData &&
      aiTokenData &&
      stableCoinData &&
      foundersData &&
      hasRenderedInitialItems.current
    ) {
      setTokenItems(sortByMarketCap('descending', tokenData))
      setAiTokenItems(sortByMarketCap('descending', aiTokenData))
      setStableCoinItems(sortByMarketCap('descending', stableCoinData))
      setNftItems(sortByMarketCap('descending', nftData))
      setFounderItems(sortByMarketCap('descending', foundersData))
    }
  }, [tokenData, aiTokenData, stableCoinData, nftData, foundersData])

  const onClickMap: OnClickMap = {
    'Market Cap': function () {
      if (
        tokenData &&
        nftData &&
        aiTokenData &&
        stableCoinData &&
        foundersData
      ) {
        const newSortOrder =
          sortOrder === 'ascending' ? 'descending' : 'ascending'
        setOrder(newSortOrder)
        setTokenItems(sortByMarketCap(newSortOrder, tokenData))
        setAiTokenItems(sortByMarketCap(newSortOrder, aiTokenData))
        setStableCoinItems(sortByMarketCap(newSortOrder, stableCoinData))
        setNftItems(sortByMarketCap(newSortOrder, nftData))
        setFounderItems(sortByMarketCap(newSortOrder, foundersData))
      }
    },
    '24h Change': function () {
      if (
        tokenData &&
        nftData &&
        aiTokenData &&
        stableCoinData &&
        foundersData
      ) {
        const newSortOrder =
          sortOrder === 'ascending' ? 'descending' : 'ascending'
        setOrder(newSortOrder)
        setTokenItems(sortBy24hChange(newSortOrder, tokenData))
        setAiTokenItems(sortBy24hChange(newSortOrder, aiTokenData))
        setStableCoinItems(sortBy24hChange(newSortOrder, stableCoinData))
        setNftItems(sortBy24hChange(newSortOrder, nftData))
        setFounderItems(sortBy24hChange(newSortOrder, foundersData))
      }
    },
  }
  const { t } = useTranslation('rank')
  return (
    <Box minW={'full'} w="100%">
      <RankHeader />
      <Flex
        w="100%"
        minW={'full'}
        pb={16}
        pt={4}
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
              gap={2}
              overflowX={'auto'}
              overflowY={'hidden'}
            >
              <RankingListButton
                label={t('rankingListButtonCryptocurrencies')}
                icon={RiCoinsFill}
                fontSize={{ lg: '18px' }}
              />
              <RankingListButton
                label={t('rankingListButtonStablecoins')}
                icon={RiCoinFill}
                fontSize={{ lg: '18px' }}
              />
              <RankingListButton
                label={t('rankingListButtonAITokens')}
                icon={RiRobotFill}
                fontSize={{ lg: '18px' }}
              />
              <RankingListButton
                label={t('rankingListButtonFounders')}
                icon={RiUserFill}
                fontSize={{ lg: '18px' }}
              />
              <RankingListButton
                label={t('rankingListButtonNfts')}
                icon={BiImage}
                fontSize={{ lg: '18px' }}
              />
            </TabList>
          </Flex>
          <Divider mt={-2} />
          <TabPanels mt="2">
            <TabPanel
              p={0}
              display={'flex'}
              flexDir={'column'}
              alignItems={'center'}
            >
              <Flex
                h={350}
                backgroundColor={'#121212'}
                justifyContent={'center'}
                alignItems={'center'}
                mb={8}
                flexDirection={'column'}
                px={4}
                minW={'full'}
              >
                <Text
                  color="homeDescriptionColor"
                  fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
                  fontWeight={{ base: 600, md: 600, lg: 700 }}
                  textAlign="center"
                  textColor={'brand.500'}
                  mb={6}
                >
                  {t('rankingListButtonCryptocurrencies')}
                </Text>
                <Text
                  textAlign={'center'}
                  fontSize={{ base: 'md', md: 'xl', lg: '2xl' }}
                  fontWeight={500}
                  textColor={'whiteAlpha.900'}
                  maxW={'3xl'}
                >
                  {t('rankingCryptocurrenciesDescription')}
                </Text>
              </Flex>
              <RankTable
                hasPagination
                currentPage={tokensOffset}
                totalCount={totalTokens}
                pageSize={LISTING_LIMIT}
                onPageChange={page => setTokensOffset(page)}
                maxW={'90%'}
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
            <TabPanel
              p={0}
              display={'flex'}
              flexDir={'column'}
              alignItems={'center'}
            >
              <Flex
                h={350}
                backgroundColor={'#121212'}
                justifyContent={'center'}
                alignItems={'center'}
                mb={12}
                flexDirection={'column'}
                px={4}
                minW={'full'}
              >
                <Text
                  color="homeDescriptionColor"
                  fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
                  fontWeight={{ base: 600, md: 600, lg: 700 }}
                  textAlign="center"
                  textColor={'brand.500'}
                  mb={6}
                >
                  {t('rankingListButtonStablecoins')}
                </Text>
                <Text
                  textAlign={'center'}
                  fontSize={{ base: 'md', md: 'xl', lg: '2xl' }}
                  fontWeight={500}
                  textColor={'whiteAlpha.900'}
                  maxW={'3xl'}
                >
                  {t('rankingStablecoinsDescription')}
                </Text>
              </Flex>
              <RankTable
                hasPagination
                currentPage={stableCoinOffset}
                totalCount={totalStableCoins}
                pageSize={LISTING_LIMIT}
                onPageChange={page => setStableCoinOffset(page)}
                maxW={'90%'}
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
            <TabPanel
              p={0}
              display={'flex'}
              flexDir={'column'}
              alignItems={'center'}
            >
              <Flex
                h={350}
                backgroundColor={'#121212'}
                justifyContent={'center'}
                alignItems={'center'}
                mb={12}
                flexDirection={'column'}
                px={4}
                minW={'full'}
              >
                <Text
                  color="homeDescriptionColor"
                  fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
                  fontWeight={{ base: 600, md: 600, lg: 700 }}
                  textAlign="center"
                  textColor={'brand.500'}
                  mb={6}
                >
                  {t('rankingListButtonAITokens')}
                </Text>
                <Text
                  textAlign={'center'}
                  fontSize={{ base: 'md', md: 'xl', lg: '2xl' }}
                  fontWeight={500}
                  textColor={'whiteAlpha.900'}
                  maxW={'3xl'}
                >
                  {t('rankingAITokensDescription')}
                </Text>
              </Flex>
              <RankTable
                hasPagination
                currentPage={aiTokensOffset}
                totalCount={totalAiTokens}
                pageSize={LISTING_LIMIT}
                onPageChange={page => setAiTokensOffset(page)}
                maxW={'90%'}
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
            <TabPanel
              p={0}
              display={'flex'}
              flexDir={'column'}
              alignItems={'center'}
            >
              <Flex
                h={350}
                backgroundColor={'#121212'}
                justifyContent={'center'}
                alignItems={'center'}
                mb={12}
                flexDirection={'column'}
                px={4}
                minW={'full'}
              >
                <Text
                  color="homeDescriptionColor"
                  fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
                  fontWeight={{ base: 600, md: 600, lg: 700 }}
                  textAlign="center"
                  textColor={'brand.500'}
                  mb={6}
                >
                  {t('rankingListButtonFounders')}
                </Text>
                <Text
                  textAlign={'center'}
                  fontSize={{ base: 'md', md: 'xl', lg: '2xl' }}
                  fontWeight={500}
                  textColor={'whiteAlpha.900'}
                  className="testname"
                  maxW={'4xl'}
                >
                  {`${t('rankingFoundersDescription1')}${' '}`}
                  <chakra.span textColor={'brand.500'}>
                    {t('rankingFoundersDescription2')}
                  </chakra.span>
                  {` ${t('rankingFoundersDescription3')}`}
                </Text>
              </Flex>
              <FoundersRankTable
                hasPagination
                currentPage={foundersOffset}
                totalCount={totalTokens}
                pageSize={LISTING_LIMIT}
                onPageChange={page => setFoundersOffset(page)}
                maxW={'90%'}
              >
                <FoundersRankTableHead onClickMap={onClickMap} />
                <Tbody>
                  {foundersisFetching || !founderItems ? (
                    <LoadingRankCardSkeleton length={20} />
                  ) : (
                    founderItems.map((token, index) =>
                      token ? (
                        <FounderRankingItem
                          listingLimit={LISTING_LIMIT}
                          offset={totalFoundersOffset}
                          order={sortOrder}
                          key={token.id}
                          index={index}
                          item={token}
                        />
                      ) : (
                        <InvalidRankCardItem
                          key={`invalid-token${index}`}
                          index={totalFoundersOffset + index}
                        />
                      ),
                    )
                  )}
                </Tbody>
              </FoundersRankTable>
            </TabPanel>
            <TabPanel
              p={0}
              display={'flex'}
              flexDir={'column'}
              alignItems={'center'}
            >
              <Flex
                h={350}
                backgroundColor={'#121212'}
                justifyContent={'center'}
                alignItems={'center'}
                mb={12}
                flexDirection={'column'}
                className="testname"
                px={4}
                minW={'full'}
              >
                <Text
                  color="homeDescriptionColor"
                  fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
                  fontWeight={{ base: 600, md: 600, lg: 700 }}
                  textAlign="center"
                  textColor={'brand.500'}
                  mb={6}
                >
                  {t('rankingListButtonNfts')}
                </Text>
                <Text
                  textAlign={'center'}
                  fontSize={{ base: 'md', md: 'xl', lg: '2xl' }}
                  fontWeight={500}
                  textColor={'whiteAlpha.900'}
                  maxW={'3xl'}
                >
                  {t('rankingNftsDescription')}
                </Text>
              </Flex>
              <RankTable
                hasPagination
                currentPage={nftOffset}
                totalCount={totalNfts}
                pageSize={LISTING_LIMIT}
                onPageChange={page => setNftOffset(page)}
                maxW={'90%'}
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
                          offset={totalNftOffset}
                          order={sortOrder}
                          key={nft.id}
                          index={index}
                          item={nft}
                        />
                      ) : (
                        <InvalidRankCardItem
                          key={`invalid-nft-${index}`}
                          index={index + totalNftOffset}
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

  const { p: page, category } = ctx.query as {
    category: string
    p: string | null
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
      ...(await serverSideTranslations(ctx.locale ?? 'en', [
        'rank',
        'footer',
        'common',
      ])),
    },
  }
}
