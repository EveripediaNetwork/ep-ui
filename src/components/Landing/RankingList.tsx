import {
  LISTING_LIMIT,
  sortBy24hChange,
  sortByMarketCap,
} from '@/pages/rank/[[...category]]'
import { OnClickMap, RankCardType, SortOrder } from '@/types/RankDataTypes'
import { Tbody } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { BiImage } from 'react-icons/bi'
import {
  RiCoinFill,
  RiCoinsFill,
  RiRobotFill,
  RiUserFill,
} from 'react-icons/ri'
// import { LinkButton } from '../Elements'
import FounderRankingItem from '../Rank/FounderRankCardItem'
import {
  FoundersRankTable,
  FoundersRankTableHead,
} from '../Rank/FoundersRankTable'
import { InvalidRankCardItem } from '../Rank/InvalidRankCardItem'
import RankingItem from '../Rank/RankCardItem'
import { RankTable, RankTableHead } from '../Rank/RankTable'

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

const RankingList = ({ rankings, listingLimit }: RankingListProps) => {
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

  const onClickMap: OnClickMap = {
    'Market Cap': function () {
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
    '24h Change': function () {
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
  return (
    <div className="flex flex-col container mx-auto mb-20 relative px-4 lg:px-8 2xl:px-0">
      {/* <div className="absolute -z-10 -top-20 lg:-top-48 right-0 lg:right-40 w-[400px] lg:w-[520px] h-[0px] lg:h-[1400px] rotate-6 lg:rotate-45 rounded-full bg-gradient-to-b from-brand-600/5 to-white/5 blur-3xl" /> */}
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('rankingListHeading')}</h1>
          <p className="dark:text-alpha-800 text-gray-600 max-w-4xl font-medium">
            {t('rankingListDescription')}
          </p>
        </div>
        <div>
          <Tabs
            defaultValue={t('rankingListButtonCryptocurrencies')}
            className="overflow-hidden"
          >
            <div className="overflow-x-auto">
              <TabsList className="mb-4 space-x-6">
                <TabsTrigger
                  value={t('rankingListButtonCryptocurrencies')}
                  className="flex flex-row items-center gap-4"
                >
                  <RiCoinsFill className="text-brand-500 dark:text-brand-800 w-6 h-6" />
                  <span>{t('rankingListButtonCryptocurrencies')}</span>
                </TabsTrigger>
                <TabsTrigger
                  value={t('rankingListButtonStablecoins')}
                  className="flex flex-row items-center gap-2"
                >
                  <RiCoinFill className="text-brand-500 dark:text-brand-800 w-6 h-6" />
                  <span>{t('rankingListButtonStablecoins')}</span>
                </TabsTrigger>
                <TabsTrigger
                  value={t('rankingListButtonAITokens')}
                  className="flex flex-row items-center gap-2"
                >
                  <RiRobotFill className="text-brand-500 dark:text-brand-800 w-6 h-6" />
                  <span>{t('rankingListButtonAITokens')}</span>
                </TabsTrigger>
                <TabsTrigger
                  value={t('rankingListButtonFounders')}
                  className="flex flex-row items-center gap-2"
                >
                  <RiUserFill className="text-brand-500 dark:text-brand-800 w-6 h-6" />
                  <span>{t('rankingListButtonFounders')}</span>
                </TabsTrigger>
                <TabsTrigger
                  value={t('rankingListButtonNfts')}
                  className="flex flex-row items-center gap-2"
                >
                  <BiImage className="text-brand-500 dark:text-brand-800 w-6 h-6" />
                  <span>{t('rankingListButtonNfts')}</span>
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value={t('rankingListButtonCryptocurrencies')}>
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
            <TabsContent value={t('rankingListButtonStablecoins')}>
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
            <TabsContent value={t('rankingListButtonAITokens')}>
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
            <TabsContent value={t('rankingListButtonFounders')}>
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
            <TabsContent value={t('rankingListButtonNfts')}>
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
          {/* <Flex justifyContent="center" mt="10">
          <LinkButton
            // href={`/rank/${selectedRanking}`}
            h="50px"
            w={{ base: 32, lg: 40 }}
            variant="outline"
            bgColor="btnBgColor"
            prefetch={false}
          >
            {t('rankingListViewMore')}
          </LinkButton>
        </Flex> */}
        </div>
      </div>
    </div>
  )
}

export default RankingList
