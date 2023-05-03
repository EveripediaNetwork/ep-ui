import React from 'react'
import { RankCardType } from '@/types/RankDataTypes'
import { Box, Flex, Text, Td, Tr, Image } from '@chakra-ui/react'
import { formatFoundersArray } from '@/utils/DataTransform/formatFoundersArray'
import { EventType } from '@everipedia/iq-utils'
import { Link } from '../Elements'

const MAX_LINKED_WIKIS = 3

const formatDate = (date: string) => {
  const eventDate = new Date(date)

  return eventDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  })
}

const numFormatter = Intl.NumberFormat('en', {
  notation: 'compact',
}).format

const RankingItem = ({
  index,
  item,
}: {
  index: number
  item: RankCardType
}) => {
  const marketCap = item.nftMarketData
    ? numFormatter(item.nftMarketData.market_cap_usd)
    : numFormatter(item.tokenMarketData.market_cap)

  const price = `$${
    item.nftMarketData
      ? item.nftMarketData.floor_price_usd.toFixed(2).toLocaleString()
      : item.tokenMarketData.current_price?.toFixed(2).toLocaleString()
  }`

  const dateFounded = item?.events?.find(
    (event) => event.type === EventType.CREATED,
  )?.date

  return (
    <Tr>
      <Td
        borderColor="rankingListBorder"
        fontWeight={500}
        fontSize="14px"
        pr="1"
      >
        <Text color="rankingListText">{index + 1}</Text>
      </Td>
      <Td
        borderColor="rankingListBorder"
        fontWeight={500}
        fontSize="14px"
        pl="2"
      >
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
            <Box>
              <Link color="brandLinkColor" href={`wiki/${item.id}`}>
                {item.title}
              </Link>
            </Box>
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
        {item.linkedWikis?.founders ? (
          <Flex flexWrap="wrap">
            {formatFoundersArray(item.linkedWikis.founders)
              ?.slice(0, MAX_LINKED_WIKIS)
              ?.map((founderName, i, arr) => {
                const founder = item.linkedWikis.founders[i]
                return (
                  <Link
                    href={`wiki/${founder}`}
                    key={`founder${i}`}
                    color="brandLinkColor"
                  >
                    {founderName}
                    {i !== arr.length - 1 && arr.length > 1 && ', '}
                  </Link>
                )
              }) ?? <Text color="brandLinkColor">NA</Text>}
            {item.linkedWikis.founders.length > 3 && (
              <Text color="brandLinkColor">...</Text>
            )}
          </Flex>
        ) : (
          <Text color="brandLinkColor">NA</Text>
        )}
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        {item.linkedWikis?.blockchains ? (
          <Flex flexWrap="wrap">
            {item.linkedWikis.blockchains
              .slice(0, MAX_LINKED_WIKIS)
              .map((blockchain, i) => {
                return (
                  <React.Fragment key={`blockchain${i}`}>
                    {i > 0 && (
                      <Box as="span" color="brandLinkColor">
                        ,
                      </Box>
                    )}
                    <Link href={`wiki/${blockchain}`} color="brandLinkColor">
                      {blockchain.charAt(0).toUpperCase() +
                        blockchain.slice(1).replace('-', ' ')}
                    </Link>
                  </React.Fragment>
                )
              })}
          </Flex>
        ) : (
          'NA'
        )}
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        {dateFounded ? (
          <Link href={`/wiki/${item.id}/events`} color="brandLinkColor">
            <Text>{formatDate(dateFounded)}</Text>
          </Link>
        ) : (
          'NA'
        )}
      </Td>
    </Tr>
  )
}

export default RankingItem
