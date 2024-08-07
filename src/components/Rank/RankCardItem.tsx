import React from 'react'
import type { RankCardType, SortOrder } from '@/types/RankDataTypes'
import {
  Box,
  Flex,
  Text,
  Td,
  Tr,
  chakra,
  Tag,
  Skeleton,
} from '@chakra-ui/react'
import { EventType } from '@everipedia/iq-utils'
import { Link } from '../Elements'
import { Image } from '../Elements/Image/Image'
import { useGetWikiTitleByIdQuery } from '@/services/wikis'

type CryptoFormatResult =
  | string
  | { numberOfZeros: number; significantFigures: string }

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
  maximumFractionDigits: 4,
}).format

function cryptoFormatter(num: number): CryptoFormatResult {
  const priceFormatter = Intl.NumberFormat('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format

  if (priceFormatter(num) === '0.00') {
    const parts = String(num).split('.')
    const decimalPart = parts[1]
    const firstNonZeroIndex =
      decimalPart.length - decimalPart.replace(/^0+/, '').length
    const significantFigures = decimalPart.substr(firstNonZeroIndex, 3)

    return {
      numberOfZeros: firstNonZeroIndex,
      significantFigures: significantFigures,
    }
  }
  return priceFormatter(num)
}

const RankingItem = ({
  index,
  item,
  order,
  offset,
  listingLimit,
  size = 40,
}: {
  index: number
  item: RankCardType
  order: SortOrder
  offset: number
  listingLimit: number
  size?: number
}) => {
  const marketCap = item.nftMarketData
    ? marketCapFormatter(item.nftMarketData?.market_cap_usd)
    : marketCapFormatter(item.tokenMarketData?.market_cap)

  const price = item.nftMarketData
    ? priceFormatter(item.nftMarketData?.floor_price_usd)
    : cryptoFormatter(item.tokenMarketData?.current_price)

  const dateFounded = item?.events?.find(
    (event) => event.type === EventType.CREATED,
  )?.date

  console.log('founderWikis', {
    founderWikis: item.founderWikis,
    title: item.title,
  })

  return (
    <Tr
      _hover={{
        bgColor: 'gray.100',
        _dark: {
          bgColor: 'whiteAlpha.100',
        },
      }}
    >
      <Td
        borderColor="rankingListBorder"
        fontWeight={500}
        fontSize="14px"
        px={{ base: 3, md: '6' }}
        minW="65px"
      >
        <Text color="rankingListText" width={'fit-content'}>
          {order === 'descending'
            ? index + offset + 1
            : listingLimit + offset - index}
        </Text>
      </Td>
      <Td
        borderColor="rankingListBorder"
        fontWeight={500}
        fontSize="14px"
        pl={{ base: 0, md: '2' }}
        pr={{ base: 2, md: 6 }}
        // maxW='350px'
        minW="200px"
      >
        <Flex gap="2.5" alignItems="center">
          <Box
            flexShrink="0"
            w={{ base: '24px', md: '40px' }}
            h={{ base: '24px', md: '40px' }}
          >
            <Image
              imgBoxSize={size}
              src={
                item.nftMarketData
                  ? item.nftMarketData?.image
                  : item.tokenMarketData?.image
              }
              alt={item.title}
              w={{ base: '24px', md: '40px' }}
              h={{ base: '24px', md: '40px' }}
              borderRadius="50%"
              objectFit="cover"
              quality={70}
            />
          </Box>
          <Box>
            <Box
              overflow={'hidden'}
              textOverflow={'ellipsis'}
              whiteSpace={'nowrap'}
              maxW={{ base: '175px', md: '200px' }}
              overflowX={'hidden'}
            >
              {item.nftMarketData ? (
                item.nftMarketData?.hasWiki ? (
                  <Link color="brandLinkColor" href={`/wiki/${item.id}`}>
                    {item.title}
                  </Link>
                ) : (
                  <Text>{item.title}</Text>
                )
              ) : item.tokenMarketData?.hasWiki ? (
                <Link color="brandLinkColor" href={`/wiki/${item.id}`}>
                  {item.title}
                </Link>
              ) : (
                <Text
                  overflow={'hidden'}
                  textOverflow={'ellipsis'}
                  whiteSpace={'nowrap'}
                >
                  {item.title}
                </Text>
              )}
            </Box>
            <Text
              color={'gray.500'}
              _dark={{ color: 'whiteAlpha.700' }}
              textTransform={'uppercase'}
            >
              {item.nftMarketData
                ? item.nftMarketData?.alias
                : item.tokenMarketData?.alias}
            </Text>
          </Box>
        </Flex>
      </Td>
      <Td
        borderColor="rankingListBorder"
        fontWeight={500}
        fontSize="14px"
        px={{ base: 2, md: 6 }}
        minW="150px"
      >
        {typeof price !== 'string' ? (
          <Text>
            $0.0<chakra.sub>{price.numberOfZeros}</chakra.sub>
            {price.significantFigures}{' '}
          </Text>
        ) : (
          <Text color="rankingListText">{`$${price}`}</Text>
        )}
      </Td>
      <Td
        borderColor="rankingListBorder"
        fontWeight={500}
        fontSize="14px"
        px={{ base: 2, md: 6 }}
        minW="175px"
      >
        <Flex gap="1">
          <Text color="rankingListText">{marketCap}</Text>
          {item.nftMarketData ? (
            <Text
              alignSelf="flex-start"
              fontSize="10px"
              lineHeight="15px"
              color={
                item.nftMarketData?.floor_price_in_usd_24h_percentage_change < 0
                  ? 'red.500'
                  : 'green.500'
              }
            >
              {Math.abs(
                item.nftMarketData?.floor_price_in_usd_24h_percentage_change,
              ).toFixed(2)}
              %
            </Text>
          ) : (
            <Text
              alignSelf="flex-start"
              fontSize="10px"
              lineHeight="15px"
              color={
                item.tokenMarketData?.price_change_24h < 0
                  ? 'red.500'
                  : 'green.500'
              }
            >
              {Math.abs(item.tokenMarketData?.price_change_24h).toFixed(2)}%
            </Text>
          )}
        </Flex>
      </Td>
      <Td
        borderColor="rankingListBorder"
        fontWeight={500}
        fontSize="14px"
        px={{ base: 2, md: 6 }}
        maxW="350px"
        minW="250px"
      >
        {item.founderWikis && item.founderWikis.length > 0 ? (
          <Flex flexWrap="wrap" gap="1">
            {item.founderWikis.slice(0, MAX_LINKED_WIKIS).map((founder, i) => (
              <React.Fragment key={`founder-${founder.id}-${i}`}>
                <Link
                  href={`/wiki/${founder.id}`}
                  color="brandLinkColor"
                  fontWeight={500}
                  fontSize="14px"
                >
                  {founder.title}
                </Link>
                {i <
                  Math.min(item.founderWikis.length, MAX_LINKED_WIKIS) - 1 && (
                  <Box as="span">,</Box>
                )}
              </React.Fragment>
            ))}
            {item.founderWikis.length > MAX_LINKED_WIKIS && (
              <Text color="brandLinkColor">...</Text>
            )}
          </Flex>
        ) : (
          <Text>N/A</Text>
        )}
      </Td>
      <Td
        borderColor="rankingListBorder"
        fontWeight={500}
        fontSize="14px"
        px={{ base: 2, md: 6 }}
        minW="150px"
      >
        {item.blockchainWikis && item.blockchainWikis.length > 0 ? (
          <Flex flexWrap="wrap" gap="1">
            {item.blockchainWikis
              .slice(0, MAX_LINKED_WIKIS)
              .map((blockchain, i) => (
                <React.Fragment key={`blockchain-${blockchain.id}-${i}`}>
                  <Link
                    href={`/wiki/${blockchain.id}`}
                    color="brandLinkColor"
                    fontWeight={500}
                    fontSize="14px"
                  >
                    {blockchain.title}
                  </Link>
                  {i <
                    Math.min(item.blockchainWikis.length, MAX_LINKED_WIKIS) -
                      1 && <Box as="span">,</Box>}
                </React.Fragment>
              ))}
            {item.blockchainWikis.length > MAX_LINKED_WIKIS && (
              <Text color="brandLinkColor">...</Text>
            )}
          </Flex>
        ) : (
          <Text>N/A</Text>
        )}
      </Td>

      <Td
        borderColor="rankingListBorder"
        fontWeight={500}
        fontSize="14px"
        px={{ base: 2, md: 6 }}
        minW="150px"
      >
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
