import {
  LISTING_LIMIT,
  sortBy24hChange,
  sortByMarketCap,
} from '@/pages/rank/[[...category]]'
import type { OnClickMap, RankCardType, SortOrder } from '@/types/RankDataTypes'
import { Tbody } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import FounderRankingItem from '../Rank/FounderRankCardItem'
import {
  FoundersRankTable,
  FoundersRankTableHead,
} from '../Rank/FoundersRankTable'
import { InvalidRankCardItem } from '../Rank/InvalidRankCardItem'
import RankingItem from '../Rank/RankCardItem'
import { RankTable, RankTableHead } from '../Rank/RankTable'

import { tabsData } from '@/data/RanksTabsData'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

type RankingListProps = {
  rankings: {
    NFTsListing: RankCardType[]
    aiTokensListing: RankCardType[]
    TokensListing: RankCardType[]
    stableCoinsListing: RankCardType[]
    foundersListing: RankCardType[]
  }
  listingLimit: number
}

enum RankingListTabs {
  Cryptocurrencies = 'cryptocurrencies',
  Stablecoins = 'stableCoins',
  AITokens = 'aitokens',
  Founders = 'founders',
  NFTs = 'nfts',
}

const RankingList = ({ rankings, listingLimit }: RankingListProps) => {
  const [selectedTab, setSelectedTab] = useState<RankingListTabs>(
    RankingListTabs.Cryptocurrencies,
  )

  const TokensListing = rankings?.TokensListing
  const aiTokensListing = rankings?.aiTokensListing
  const NFTsListing = rankings?.NFTsListing
  const stableCoinsListing = rankings?.stableCoinsListing
  const foundersListing = rankings?.foundersListing

  const [tokenItems, setTokenItems] = useState<RankCardType[]>([])
  const [aiTokenItems, setAiTokenItems] = useState<RankCardType[]>([])
  const [stableCoinItems, setStableCoinItems] = useState<RankCardType[]>([])
  const [nftItems, setNftItems] = useState<RankCardType[]>([])
  const [founderItems, setFounderItems] = useState<RankCardType[]>([])
  const [sortOrder, setOrder] = useState<SortOrder>('descending')
  const { t } = useTranslation(['rank', 'common'])

  useEffect(() => {
    if (
      TokensListing &&
      aiTokensListing &&
      NFTsListing &&
      stableCoinsListing &&
      foundersListing &&
      (!tokenItems?.length ||
        !nftItems?.length ||
        !aiTokenItems?.length ||
        !stableCoinItems?.length ||
        !founderItems?.length)
    ) {
      setTokenItems(sortByMarketCap('descending', TokensListing))
      setAiTokenItems(sortByMarketCap('descending', aiTokensListing))
      setNftItems(sortByMarketCap('descending', NFTsListing))
      setStableCoinItems(sortByMarketCap('descending', stableCoinsListing))
      setFounderItems(sortByMarketCap('descending', foundersListing))
    }
  }, [
    TokensListing,
    aiTokensListing,
    NFTsListing,
    stableCoinsListing,
    foundersListing,
  ])

  const onClickMap: OnClickMap = {
    'Market Cap': () => {
      if (
        tokenItems &&
        nftItems &&
        aiTokenItems &&
        stableCoinItems &&
        founderItems
      ) {
        const newSortOrder =
          sortOrder === 'ascending' ? 'descending' : 'ascending'
        setOrder(newSortOrder)
        setTokenItems(sortByMarketCap(newSortOrder, TokensListing))
        setAiTokenItems(sortByMarketCap(newSortOrder, aiTokensListing))
        setStableCoinItems(sortByMarketCap(newSortOrder, stableCoinsListing))
        setNftItems(sortByMarketCap(newSortOrder, NFTsListing))
        setFounderItems(sortByMarketCap(newSortOrder, foundersListing))
      }
    },
    '24h Change': () => {
      if (
        tokenItems &&
        nftItems &&
        aiTokenItems &&
        stableCoinItems &&
        founderItems
      ) {
        const newSortOrder =
          sortOrder === 'ascending' ? 'descending' : 'ascending'
        setOrder(newSortOrder)
        setTokenItems(sortBy24hChange(newSortOrder, TokensListing))
        setAiTokenItems(sortBy24hChange(newSortOrder, aiTokensListing))
        setStableCoinItems(sortBy24hChange(newSortOrder, stableCoinsListing))
        setNftItems(sortBy24hChange(newSortOrder, NFTsListing))
        setFounderItems(sortBy24hChange(newSortOrder, foundersListing))
      }
    },
  }

  const handleSelectedTab = (tab: string) => {
    setSelectedTab(tab as RankingListTabs)
  }

  return (
    <div className="flex flex-col container mx-auto mb-20 relative px-4 lg:px-8 2xl:px-0">
      <div className="absolute -z-10 -top-20 lg:-top-60 right-0 lg:right-40 w-[400px] lg:w-[720px] h-[0px] lg:h-[1400px] rotate-6 lg:rotate-45 rounded-[100%] bg-gradient-to-b from-pink-500/10 to-indigo-500/10 blur-3xl" />
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-sm lg:text-2xl font-bold">
            {t('rankingListHeading')}
          </h1>
          <p className="dark:text-alpha-800 text-gray-600 max-w-4xl font-medium text-xs lg:text-base">
            {t('rankingListDescription')}
          </p>
        </div>
        <div>
          <Tabs defaultValue="cryptocurrencies" className="overflow-hidden">
            <div className="overflow-x-auto scrollbar-hide">
              <TabsList className="mb-4 space-x-6">
                {tabsData.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={t(tab.id)}
                    onClick={() => handleSelectedTab(t(tab.id))}
                    className="flex flex-row items-center gap-2"
                  >
                    <tab.icon className="text-brand-500 dark:text-brand-800 w-6 h-6" />
                    <span>{t(tab.label)}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <TabsContent value="cryptocurrencies">
              <RankTable hasPagination={false}>
                <RankTableHead onClickMap={onClickMap} />
                <Tbody>
                  {tokenItems.map((token, index) =>
                    token ? (
                      <RankingItem
                        listingLimit={listingLimit}
                        offset={0}
                        order={sortOrder}
                        key={index + token.id}
                        index={index}
                        item={token}
                      />
                    ) : (
                      <InvalidRankCardItem key={index} index={index} />
                    ),
                  )}
                </Tbody>
              </RankTable>
            </TabsContent>
            <TabsContent value="stableCoins">
              <RankTable hasPagination={false}>
                <RankTableHead onClickMap={onClickMap} />
                <Tbody>
                  {stableCoinItems.map((token, index) =>
                    token ? (
                      <RankingItem
                        listingLimit={listingLimit}
                        offset={0}
                        order={sortOrder}
                        key={index + token.id}
                        index={index}
                        item={token}
                      />
                    ) : (
                      <InvalidRankCardItem key={index} index={index} />
                    ),
                  )}
                </Tbody>
              </RankTable>
            </TabsContent>
            <TabsContent value="aitokens">
              <RankTable hasPagination={false}>
                <RankTableHead onClickMap={onClickMap} />
                <Tbody>
                  {aiTokenItems.map((token, index) =>
                    token ? (
                      <RankingItem
                        listingLimit={listingLimit}
                        offset={0}
                        order={sortOrder}
                        key={index + token.id}
                        index={index}
                        item={token}
                      />
                    ) : (
                      <InvalidRankCardItem key={index} index={index} />
                    ),
                  )}
                </Tbody>
              </RankTable>
            </TabsContent>
            <TabsContent value="founders">
              <FoundersRankTable hasPagination={false}>
                <FoundersRankTableHead onClickMap={onClickMap} />
                <Tbody>
                  {founderItems.map((token, index) =>
                    token ? (
                      <FounderRankingItem
                        listingLimit={listingLimit}
                        offset={0}
                        order={sortOrder}
                        key={index + token.id}
                        index={index}
                        item={token}
                      />
                    ) : (
                      <InvalidRankCardItem key={index} index={index} />
                    ),
                  )}
                </Tbody>
              </FoundersRankTable>
            </TabsContent>
            <TabsContent value="nfts">
              <RankTable hasPagination={false}>
                <RankTableHead onClickMap={onClickMap} />
                <Tbody>
                  {nftItems.map((nft, index) =>
                    nft ? (
                      <RankingItem
                        listingLimit={LISTING_LIMIT}
                        offset={0}
                        order={sortOrder}
                        key={index + nft.id}
                        index={index}
                        item={nft}
                      />
                    ) : (
                      <InvalidRankCardItem key={index} index={index} />
                    ),
                  )}
                </Tbody>
              </RankTable>
            </TabsContent>
          </Tabs>
          <div className="flex items-center justify-center mt-10">
            <Link
              className="w-32 lg:w-40 border dark:border-gray-700 border-gray-300 h-[50px] rounded-md flex items-center justify-center text-xs hover:bg-gray-200 dark:hover:bg-alpha-50 transition-colors duration-300 delay-150 ease-in-out"
              href={`/rank/${selectedTab}`}
              prefetch={false}
            >
              {t('rankingListViewMore')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RankingList
