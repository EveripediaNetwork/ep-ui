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
import { useTranslation } from 'react-i18next'
import { BiImage } from 'react-icons/bi'
import { RiCoinsFill, RiRobotFill } from 'react-icons/ri'
import { OnClickMap, RankCardType, SortOrder } from '@/types/RankDataTypes'
import RankingListButton from '../Rank/RankButton'
import { RankTable, RankTableHead } from '../Rank/RankTable'
import { InvalidRankCardItem } from '../Rank/InvalidRankCardItem'
import RankingItem from '../Rank/RankCardItem'
import { LinkButton } from '../Elements'
import { LISTING_LIMIT, sortByMarketCap } from '@/pages/rank'
import { CATEGORIES_WITH_INDEX } from '@/data/RankingListData'
import { getKeyByValue } from '@/utils/DataTransform/getKeyByValue'

type RankingListProps = {
  rankings: {
    NFTsListing: RankCardType[]
    TokensListing: RankCardType[]
  }
  listingLimit: number
}

const RankingList = ({ rankings, listingLimit }: RankingListProps) => {
  const { t } = useTranslation()
  const { TokensListing, NFTsListing } = rankings
  const [tokenItems, setTokenItems] = useState<RankCardType[]>([])
  const [aiTokenItems, setAiTokenItems] = useState<RankCardType[]>([])
  const [nftItems, setNftItems] = useState<RankCardType[]>([])
  const [sortOrder, setOrder] = useState<SortOrder>('descending')
  const [selectedRanking, setSelectedRanking] = useState<String | undefined>(
    'cryptocurrencies',
  )

  if (
    TokensListing &&
    NFTsListing &&
    (!tokenItems.length || !nftItems.length)
  ) {
    setTokenItems(sortByMarketCap('descending', TokensListing))
    setAiTokenItems(
      sortByMarketCap(
        'descending',
        TokensListing.filter(
          (item) => item?.tokenMarketData?.isAiToken === true,
        ),
      ),
    )
    setNftItems(sortByMarketCap('descending', NFTsListing))
  }

  const onClickMap: OnClickMap = {
    Marketcap: function () {
      if (tokenItems && nftItems) {
        const newSortOrder =
          sortOrder === 'ascending' ? 'descending' : 'ascending'
        setOrder(newSortOrder)
        setTokenItems(sortByMarketCap(newSortOrder, TokensListing))
        setAiTokenItems(
          sortByMarketCap(
            'descending',
            TokensListing.filter(
              (item) => item?.tokenMarketData?.isAiToken === true,
            ),
          ),
        )
        setNftItems(sortByMarketCap(newSortOrder, NFTsListing))
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
          p="0"
          onChange={(index) =>
            setSelectedRanking(getKeyByValue(CATEGORIES_WITH_INDEX, index))
          }
        >
          <Flex justifyContent="center">
            <TabList border="none" display="flex" gap={{ base: '5', md: '8' }}>
              <RankingListButton
                label="Cryptocurrencies"
                icon={RiCoinsFill}
                fontSize={{ lg: 'md' }}
              />
              <RankingListButton
                label="AI Tokens"
                icon={RiRobotFill}
                fontSize={{ lg: 'md' }}
              />
              <RankingListButton
                label="NFTs"
                icon={BiImage}
                fontSize={{ lg: 'md' }}
              />
            </TabList>
          </Flex>
          <TabPanels mt={{ base: 8, md: '10' }}>
            <TabPanel
              px={{ base: 2, md: 'initial' }}
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
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Flex justifyContent="center" mt="10">
          <LinkButton
            href={`/rank?category=${selectedRanking}&page=1`}
            h="50px"
            w={{ base: 32, lg: 40 }}
            variant="outline"
            bgColor="btnBgColor"
            prefetch={false}
          >
            View More
          </LinkButton>
        </Flex>
      </Box>
    </Box>
  )
}

export default RankingList
