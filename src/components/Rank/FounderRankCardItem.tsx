import React from 'react'
import { RankCardType } from '@/types/RankDataTypes'
import {
  Box,
  Flex,
  Text,
  Td,
  Tr,
  Image,
  Stat,
  StatArrow,
} from '@chakra-ui/react'
import { formatFoundersArray } from '@/utils/DataTransform/formatFoundersArray'
import { EventType } from '@everipedia/iq-utils'
import { Link } from '../Elements'
import { SortOrder } from '@/types/RankDataTypes'
import { getWikiImageUrl } from '@/utils/WikiUtils/getWikiImageUrl'

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

const FounderRankingItem = ({
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
    ? marketCapFormatter(item.nftMarketData?.market_cap_usd)
    : marketCapFormatter(item.tokenMarketData?.market_cap)

  const marketCapChange = marketCapFormatter(
    item?.tokenMarketData.market_cap_change_24h.toString()[0] === '-'
      ? Math.abs(item?.tokenMarketData.market_cap_change_24h)
      : item?.tokenMarketData.market_cap_change_24h,
  )

  const dateFounded = item?.events?.find(
    (event) => event.type === EventType.CREATED,
  )?.date
  return (
    <Tr
      _hover={{
        bgColor: 'gray.100',
        _dark: {
          bgColor: 'whiteAlpha.100',
        },
      }}
    >
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
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
        maxW={'320px'}
        minW={'280px'}
      >
        {item?.founderWikis ? (
          <Flex alignItems={'center'}>
            <Flex mr={3}>
              {item.founderWikis
                .slice(0, MAX_LINKED_WIKIS)
                .map((founder, i) => {
                  return (
                    <React.Fragment key={`founder${i}`}>
                      <Flex
                        display={'inline-block'}
                        minW={'40px'}
                        marginLeft={i > 0 ? '-15px' : '0px'}
                      >
                        <Image
                          src={getWikiImageUrl(founder?.images)}
                          alt={founder?.title}
                          width="36px"
                          height="36px"
                          borderRadius="50%"
                          objectFit="cover"
                          border="2px solid"
                          borderColor="white"
                        />
                      </Flex>
                    </React.Fragment>
                  )
                })}
            </Flex>
            <Flex display={'inline-block'} flexWrap="wrap">
              {formatFoundersArray(
                item.founderWikis.map((founder) => founder?.title),
              )
                ?.slice(0, MAX_LINKED_WIKIS)
                ?.map((founderName, i, arr) => {
                  const founder = item.linkedWikis?.founders[i]
                  return (
                    <Link
                      href={`/wiki/${founder}`}
                      key={`founder${i}`}
                      color="brandLinkColor"
                    >
                      {founderName}
                      {i !== arr?.length - 1 && arr?.length > 1 && ', '}
                      {i === 1 && <br />}
                    </Link>
                  )
                })}
              {item.linkedWikis?.founders?.length > 3 && (
                <Text as={'span'} color="brandLinkColor">
                  ...
                </Text>
              )}
            </Flex>
          </Flex>
        ) : (
          <Text>NA</Text>
        )}
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        <Flex gap="2.5" alignItems="center">
          <Box>
            <Box maxW={'250px'} overflowX={'hidden'}>
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
                <Text>{item.title}</Text>
              )}
            </Box>
          </Box>
        </Flex>
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        <Text color="rankingListText">{marketCap}</Text>
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        <Flex gap="1" minH={5} justifyContent={'center'} alignItems={'center'}>
          <Text color="rankingListText">{marketCapChange}</Text>
          {item.nftMarketData ? (
            <Stat pb={4}>
              <StatArrow
                type={
                  item.nftMarketData?.floor_price_in_usd_24h_percentage_change <
                  0
                    ? 'decrease'
                    : 'increase'
                }
              />
            </Stat>
          ) : (
            <Stat pb={4}>
              <StatArrow
                type={
                  item.tokenMarketData?.market_cap_change_24h < 0
                    ? 'decrease'
                    : 'increase'
                }
              />
            </Stat>
          )}
        </Flex>
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
                    <Link href={`/wiki/${blockchain}`} color="brandLinkColor">
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

export default FounderRankingItem
