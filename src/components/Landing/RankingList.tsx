import React, { useState } from 'react'
import {
  Box,
  Flex,
  Heading,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Text,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { BiImage } from 'react-icons/bi'
import {
  RiCoinsFill,
  RiRobotFill,
  RiCoinFill,
  RiUserFill,
} from 'react-icons/ri'
import { OnClickMap, RankCardType, SortOrder } from '@/types/RankDataTypes'
import RankingListButton from '../Rank/RankButton'
import { RankTable, RankTableHead } from '../Rank/RankTable'
import {
  FoundersRankTable,
  FoundersRankTableHead,
} from '../Rank/FoundersRankTable'
import { InvalidRankCardItem } from '../Rank/InvalidRankCardItem'
import RankingItem from '../Rank/RankCardItem'
import FounderRankingItem from '../Rank/FounderRankCardItem'
import { LinkButton } from '../Elements'
import { CATEGORIES_WITH_INDEX } from '@/data/RankingListData'
import { getKeyByValue } from '@/utils/DataTransform/getKeyByValue'
import { sortBy24hChange, sortByMarketCap } from '@/utils/rank.util'
import { LISTING_LIMIT } from '@/data/Constants'

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
  const {
    TokensListing,
    aiTokensListing,
    NFTsListing,
    stableCoinsListing,
    foundersListing,
  } = rankings
  const [tokenItems, setTokenItems] = useState<RankCardType[]>([])
  const [aiTokenItems, setAiTokenItems] = useState<RankCardType[]>([])
  const [stableCoinItems, setStableCoinItems] = useState<RankCardType[]>([])
  const [nftItems, setNftItems] = useState<RankCardType[]>([])
  const [founderItems, setFounderItems] = useState<RankCardType[]>([])
  const [sortOrder, setSortOrder] = useState<SortOrder>('descending')
  const [selectedRanking, setSelectedRanking] = useState<string | undefined>(
    'cryptocurrencies',
  )
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
        setSortOrder(newSortOrder)
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
        setSortOrder(newSortOrder)
        setTokenItems(sortBy24hChange(newSortOrder, TokensListing))
        setAiTokenItems(sortBy24hChange(newSortOrder, aiTokensListing))
        setStableCoinItems(sortBy24hChange(newSortOrder, stableCoinsListing))
        setNftItems(sortBy24hChange(newSortOrder, NFTsListing))
        setFounderItems(sortBy24hChange(newSortOrder, foundersListing))
      }
    },
  }
  return (
    <Box
      px={{ base: 3, md: 8 }}
      pb={{ base: 16, md: 20, lg: 24 }}
      pt={{ lg: 4 }}
      textAlign="center"
    >
      <Heading
        textAlign="center"
        mb={4}
        fontWeight="600"
        fontSize={{ base: '3xl', lg: 46 }}
      >
        {`${t('rankingListHeading')}`}
      </Heading>
      <Text
        color="homeDescriptionColor"
        fontSize={{ base: 'lg', lg: '20px' }}
        mx="auto"
        mb={9}
        px={4}
        maxW="768"
      >{`${t('rankingListDescription')}`}</Text>
      <Box maxW="1208px" mx="auto">
        <Tabs
          mt={10}
          pl={0}
          overflowX={'auto'}
          onChange={index => {
            setSelectedRanking(getKeyByValue(CATEGORIES_WITH_INDEX, index))
          }}
        >
          <Flex justifyContent="center">
            <TabList
              border="none"
              display="flex"
              gap={{ base: '0', md: '4' }}
              overflowX={'auto'}
              overflowY={'hidden'}
            >
              <RankingListButton
                label={t('rankingListButtonCryptocurrencies')}
                icon={RiCoinsFill}
                fontSize={{ lg: 'md' }}
              />
              <RankingListButton
                label={t('rankingListButtonStablecoins')}
                icon={RiCoinFill}
                fontSize={{ lg: 'md' }}
              />
              <RankingListButton
                label={t('rankingListButtonAITokens')}
                icon={RiRobotFill}
                fontSize={{ lg: 'md' }}
              />
              <RankingListButton
                label={t('rankingListButtonFounders')}
                icon={RiUserFill}
                fontSize={{ lg: 'md' }}
              />
              <RankingListButton
                label={t('rankingListButtonNfts')}
                icon={BiImage}
                fontSize={{ lg: 'md' }}
              />
            </TabList>
          </Flex>
          <TabPanels mt={{ base: 8, md: '10' }}>
            <TabPanel
              px={{ base: 0, md: 'initial' }}
              py={{ base: 0, md: 'initial' }}
            >
              <RankTable hasPagination={false}>
                <RankTableHead onClickMap={onClickMap} />
                <Tbody>
                  {tokenItems.map((token, index) =>
                    token ? (
                      <RankingItem
                        listingLimit={listingLimit}
                        offset={0}
                        order={sortOrder}
                        key={token.id}
                        index={index}
                        item={token}
                      />
                    ) : (
                      <InvalidRankCardItem key={index} index={index} />
                    ),
                  )}
                </Tbody>
              </RankTable>
            </TabPanel>
            <TabPanel
              px={{ base: 2, md: 'initial' }}
              py={{ base: 0, md: 'initial' }}
            >
              <RankTable hasPagination={false}>
                <RankTableHead onClickMap={onClickMap} />
                <Tbody>
                  {stableCoinItems.map((token, index) =>
                    token ? (
                      <RankingItem
                        listingLimit={listingLimit}
                        offset={0}
                        order={sortOrder}
                        key={token.id}
                        index={index}
                        item={token}
                      />
                    ) : (
                      <InvalidRankCardItem key={index} index={index} />
                    ),
                  )}
                </Tbody>
              </RankTable>
            </TabPanel>
            <TabPanel
              px={{ base: 2, md: 'initial' }}
              py={{ base: 0, md: 'initial' }}
            >
              <RankTable hasPagination={false}>
                <RankTableHead onClickMap={onClickMap} />
                <Tbody>
                  {aiTokenItems.map((token, index) =>
                    token ? (
                      <RankingItem
                        listingLimit={listingLimit}
                        offset={0}
                        order={sortOrder}
                        key={token.id}
                        index={index}
                        item={token}
                      />
                    ) : (
                      <InvalidRankCardItem key={index} index={index} />
                    ),
                  )}
                </Tbody>
              </RankTable>
            </TabPanel>
            <TabPanel
              px={{ base: 2, md: 'initial' }}
              py={{ base: 0, md: 'initial' }}
            >
              <FoundersRankTable hasPagination={false}>
                <FoundersRankTableHead onClickMap={onClickMap} />
                <Tbody>
                  {founderItems.map((token, index) =>
                    token ? (
                      <FounderRankingItem
                        listingLimit={listingLimit}
                        offset={0}
                        order={sortOrder}
                        key={token.id}
                        index={index}
                        item={token}
                      />
                    ) : (
                      <InvalidRankCardItem key={index} index={index} />
                    ),
                  )}
                </Tbody>
              </FoundersRankTable>
            </TabPanel>
            <TabPanel
              px={{ base: 2, md: 'initial' }}
              py={{ base: 0, md: 'initial' }}
            >
              <RankTable hasPagination={false}>
                <RankTableHead onClickMap={onClickMap} />
                <Tbody>
                  {nftItems.map((nft, index) =>
                    nft ? (
                      <RankingItem
                        listingLimit={LISTING_LIMIT}
                        offset={0}
                        order={sortOrder}
                        key={nft.id}
                        index={index}
                        item={nft}
                      />
                    ) : (
                      <InvalidRankCardItem key={index} index={index} />
                    ),
                  )}
                </Tbody>
              </RankTable>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Flex justifyContent="center" mt="10">
          <LinkButton
            href={`/rank/${selectedRanking}`}
            h="50px"
            w={{ base: 32, lg: 40 }}
            variant="outline"
            bgColor="btnBgColor"
            prefetch={false}
          >
            {t('rankingListViewMore')}
          </LinkButton>
        </Flex>
      </Box>
    </Box>
  )
}

export default RankingList
