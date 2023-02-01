import React from 'react'
import { RankCardType } from '@/types/RankDataTypes'
import { Box, Flex, Text, Td, Tr, Link, Image } from '@chakra-ui/react'
import { getFounderName } from '@/utils/DataFetching/rankUtils'

const RankingItem = ({
  index,
  item,
}: {
  index: number
  item: RankCardType
}) => {
  const marketCap = `$${
    item.nftMarketData
      ? item.nftMarketData.market_cap_usd.toLocaleString()
      : item.tokenMarketData.market_cap?.toLocaleString()
  }`

  const price = `$${
    item.nftMarketData
      ? item.nftMarketData.floor_price_usd.toLocaleString()
      : item.tokenMarketData.current_price?.toLocaleString()
  }`

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
        <Text color="rankingListText">{price}</Text>
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        <Flex gap="1">
          <Text color="rankingListText">NA</Text>
        </Flex>
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        <Flex gap="1">
          <Text color="rankingListText">{marketCap}</Text>
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
            {item.linkedWikis?.founders.map((founder, i) => {
              const isLastItem = i === item.linkedWikis.founders.length - 1
              return (
                <Link href={`wiki/${founder}`} color="brandLinkColor">
                  {getFounderName(founder)}
                  {!isLastItem && ', '}
                </Link>
              )
            })}
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
        NA
      </Td>
    </Tr>
  )
}

export default RankingItem
