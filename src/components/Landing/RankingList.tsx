import React from 'react'
import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BiImage } from 'react-icons/bi'
import { RiCoinsFill } from 'react-icons/ri'
import { RankCardType } from '@/types/RankDataTypes'
import { RANKDATA } from '@/data/RankData'
import { getFounderName } from '@/utils/rankUtils'
import RankingListButton from '../Rank/RankButton'
import { RankTable, RankTableHead } from '../Rank/RankTable'
import { InvalidRankCardItem } from '../Rank/InvalidRankCardItem'

export type RankingListProps = {
  rankings: {
    NFTsListing: RankCardType[]
    TokensListing: RankCardType[]
  }
}

const RankingItem = ({
  index,
  item,
}: {
  index: number
  item: RankCardType
}) => {
  return (
    <Tr>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        <Text color="rankingListText">{index + 1}</Text>
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        <Flex gap="2.5" alignItems="center">
          <Box flexShrink="0" w="40px" h="40px">
            <Image
              src={
                item.nftMarketData
                  ? item.nftMarketData.image
                  : item.tokenMarketData.image
              }
              alt={item.title}
              w="40px"
              h="40px"
              borderRadius="50%"
              objectFit="cover"
            />
          </Box>
          <Box>
            <Link href={`wiki/${item.id}`} color="brandLinkColor">
              {item.title}
            </Link>
            <Text color="rankingListText">
              {item.nftMarketData
                ? item.nftMarketData.alias
                : item.tokenMarketData.alias}
            </Text>
          </Box>
        </Flex>
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        <Text color="rankingListText">
          $
          {item.nftMarketData
            ? item.nftMarketData.floor_price_usd.toLocaleString()
            : item.tokenMarketData.current_price?.toLocaleString()}
        </Text>
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        <Flex gap="1">
          <Text color="rankingListText">NA</Text>
        </Flex>
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        <Flex gap="1">
          <Text color="rankingListText">
            $
            {item.nftMarketData
              ? item.nftMarketData.market_cap_usd.toLocaleString()
              : item.tokenMarketData.market_cap?.toLocaleString()}
          </Text>
          {item.nftMarketData ? (
            <Text
              alignSelf="flex-start"
              fontSize="10px"
              lineHeight="15px"
              color={
                item.nftMarketData.floor_price_in_usd_24h_percentage_change < 0
                  ? 'red.500'
                  : 'green.500'
              }
            >
              {Math.abs(
                item.nftMarketData.floor_price_in_usd_24h_percentage_change,
              ).toFixed(2)}
              %
            </Text>
          ) : (
            <Text
              alignSelf="flex-start"
              fontSize="10px"
              lineHeight="15px"
              color={
                item.tokenMarketData.price_change_24h < 0
                  ? 'red.500'
                  : 'green.500'
              }
            >
              {Math.abs(item.tokenMarketData.price_change_24h).toFixed(2)}%
            </Text>
          )}
        </Flex>
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        {item.linkedWikis && item.linkedWikis.founders ? (
          <Flex flexWrap="wrap" maxW="160px">
            {item.linkedWikis?.founders.map(founder => (
              <Link href={`wiki/${founder}`} color="brandLinkColor">
                {getFounderName(founder)}
              </Link>
            ))}
          </Flex>
        ) : (
          'NA'
        )}
      </Td>
      <Td
        borderColor="rankingListBorder"
        fontWeight={500}
        color="rankingListText"
        fontSize="14px"
      >
        {RANKDATA[index].DateCreated}
      </Td>
    </Tr>
  )
}

const RankingList = ({ rankings }: RankingListProps) => {
  const { t } = useTranslation()

  return (
    <Box
      mt={10}
      px={{ base: 3, md: 8 }}
      py={{ base: 5, md: 20 }}
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
        maxW="750"
      >{`${t('rankingListDescription')}`}</Text>
      <Box maxW="1160px" mx="auto">
        <Tabs mt={10} defaultIndex={0}>
          <Flex justifyContent="center">
            <TabList border="none" display="flex" gap="8">
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
          <TabPanels mt="10">
            <TabPanel>
              <RankTable hasPagination={false}>
                <RankTableHead />
                <Tbody>
                  {rankings.TokensListing.map((token, index) => {
                    if (!token) {
                      return <InvalidRankCardItem index={index} />
                    }
                    return <RankingItem index={index} item={token} />
                  })}
                </Tbody>
              </RankTable>
            </TabPanel>
            <TabPanel>
              <RankTable hasPagination={false}>
                <RankTableHead />
                <Tbody>
                  {rankings.NFTsListing.map((nft, index) => {
                    if (!nft) {
                      return <InvalidRankCardItem index={index} />
                    }
                    return <RankingItem index={index} item={nft} />
                  })}
                </Tbody>
              </RankTable>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Flex justifyContent="center" mt="10">
          <Link
            variant="unstyled"
            href="/rank"
            py="4"
            px="10"
            borderRadius="6px"
            border="1px solid"
            borderColor="ranklistBtnBorder"
          >
            View More
          </Link>
        </Flex>
      </Box>
    </Box>
  )
}

export default RankingList
