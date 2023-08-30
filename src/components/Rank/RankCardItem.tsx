import React from 'react'
import { RankCardType } from '@/types/RankDataTypes'
import { Box, Flex, Text, Td, Tr, Image } from '@chakra-ui/react'
import { formatFoundersArray } from '@/utils/DataTransform/formatFoundersArray'
import { EventType } from '@everipedia/iq-utils'
import { Link } from '../Elements'
import { SortOrder } from '@/types/RankDataTypes'

const MAX_LINKED_WIKIS = 3

const formatDate = (date: string) => {
  const eventDate = new Date(date)
  return eventDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  })
}

const marketCapFormatter = Intl.NumberFormat('en', {
  notation: 'compact',
}).format

const priceFormatter = Intl.NumberFormat('en', {
  notation: 'standard',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format

const RankingItem = ({
  index,
  item,
  order,
  offset,
  listingLimit,
}: {
  index: number
  item: RankCardType
  order: SortOrder
  offset: number
  listingLimit: number
}) => {
  const marketCap = item.nftMarketData
    ? marketCapFormatter(item.nftMarketData.market_cap_usd)
    : marketCapFormatter(item.tokenMarketData.market_cap)

  const price = `$${
    item.nftMarketData
      ? priceFormatter(item.nftMarketData.floor_price_usd)
      : priceFormatter(item.tokenMarketData.current_price)
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
        <Text color="rankingListText">
          {order === 'descending'
            ? index + offset + 1
            : listingLimit + offset - index}
        </Text>
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
              {item.nftMarketData ? (
                item.nftMarketData?.hasWiki ? (
                  <Link color="brandLinkColor" href={`wiki/${item.id}`}>
                    {item.title}
                  </Link>
                ) : (
                  <Text>{item.title}</Text>
                )
              ) : item.tokenMarketData?.hasWiki ? (
                <Link color="brandLinkColor" href={`wiki/${item.id}`}>
                  {item.title}
                </Link>
              ) : (
                <Text>{item.title}</Text>
              )}
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
              })}
            {item.linkedWikis.founders.length > 3 && (
              <Text color="brandLinkColor">...</Text>
            )}
          </Flex>
        ) : (
          <Text>NA</Text>
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
          <Text>NA</Text>
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
