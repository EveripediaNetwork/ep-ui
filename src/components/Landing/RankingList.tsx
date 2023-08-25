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
import { RiCoinsFill } from 'react-icons/ri'
import { OnClickMap, RankCardType, SortOrder } from '@/types/RankDataTypes'
import RankingListButton from '../Rank/RankButton'
import { RankTable, RankTableHead } from '../Rank/RankTable'
import { InvalidRankCardItem } from '../Rank/InvalidRankCardItem'
import RankingItem from '../Rank/RankCardItem'
import { LinkButton } from '../Elements'
import { LISTING_LIMIT, sortByMarketCap } from '@/pages/rank'

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
  const [nftItems, setNftItems] = useState<RankCardType[]>([])
  const [sortOrder, setOrder] = useState<SortOrder>('descending')

  if (
    TokensListing &&
    NFTsListing &&
    (!tokenItems.length || !nftItems.length)
  ) {
    setTokenItems(sortByMarketCap('descending', TokensListing, setOrder))
    setNftItems(sortByMarketCap('descending', NFTsListing, setOrder))
  }

  const onClickMap: OnClickMap = {
    Marketcap: function () {
      if (tokenItems && nftItems) {
        const newSortOrder =
          sortOrder === 'ascending' ? 'descending' : 'ascending'
        setTokenItems(sortByMarketCap(newSortOrder, TokensListing, setOrder))
        setNftItems(sortByMarketCap(newSortOrder, NFTsListing, setOrder))
      }
    },
  }

  return (
    <Box
      mt={10}
      px={{ base: 3, md: 8 }}
      pb={{ base: 5, md: 20 }}
      textAlign="center"
    >
      <Heading
        textAlign="center"
        mb={4}
        fontWeight="700"
        fontSize={{ base: '3xl', lg: 46 }}
      >
        {`${t('rankingListHeading')}`}
      </Heading>
      <Text
        color="homeDescriptionColor"
        fontSize={{ base: 'lg', lg: 22 }}
        mx="auto"
        mb={9}
        px={4}
        maxW="800"
      >{`${t('rankingListDescription')}`}</Text>
      <Box maxW="1208px" mx="auto">
        <Tabs mt={10} p="0">
          <Flex justifyContent="center">
            <TabList border="none" display="flex" gap={{ base: '5', md: '8' }}>
              <RankingListButton
                label="Cryptocurrencies"
                icon={RiCoinsFill}
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
            href="/rank?category=cryptocurrencies&page=1"
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
