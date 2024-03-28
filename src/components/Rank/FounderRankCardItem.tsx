import React from 'react'
import { RankCardType } from '@/types/RankDataTypes'
import { Box, Flex, Text, Td, Tr, Stat, StatArrow } from '@chakra-ui/react'
import { formatFoundersArray } from '@/utils/DataTransform/formatFoundersArray'
import { EventType } from '@everipedia/iq-utils'
import { Link } from '../Elements'
import { SortOrder } from '@/types/RankDataTypes'
import { getWikiImageUrl } from '@/utils/WikiUtils/getWikiImageUrl'
import Image from 'next/image'

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
      <Td
        borderColor="rankingListBorder"
        fontWeight={500}
        fontSize="14px"
        px={{ base: 3, md: '6' }}
        minW="65px"
      >
        <Text color="rankingListText" width="fit-content">
          {order === 'descending'
            ? index + offset + 1
            : listingLimit + offset - index}
        </Text>
      </Td>
      <Td
        borderColor="rankingListBorder"
        fontWeight={500}
        fontSize="14px"
        maxW={'350px'}
        minW={'300px'}
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
                          width={36}
                          height={36}
                          style={{
                            borderRadius: '50%',
                            objectFit: 'cover',
                            height: '36px',
                            width: '36px',
                            border: '2px solid',
                            borderColor: 'white',
                          }}
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
      <Td
        borderColor="rankingListBorder"
        fontWeight={500}
        fontSize="14px"
        px={2}
        minW="150px"
      >
        <Flex
          gap="2.5"
          alignItems="center"
          sx={{
            wordBreak: 'break-word',
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
          }}
        >
          <Box>
            <Box maxW={'100px'}>
              {item.nftMarketData ? (
                item.nftMarketData?.hasWiki ? (
                  <Link color="brandLinkColor" href={`/wiki/${item.id}`}>
                    <Text>{item.title}</Text>
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
      <Td
        borderColor="rankingListBorder"
        fontWeight={500}
        fontSize="14px"
        maxW={50}
      >
        <Text color="rankingListText">{marketCap}</Text>
      </Td>
      <Td
        borderColor="rankingListBorder"
        fontWeight={500}
        fontSize="14px"
        minW="150px"
      >
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
      <Td
        borderColor="rankingListBorder"
        fontWeight={500}
        fontSize="14px"
        minW="150px"
      >
        {item.linkedWikis?.blockchains ? (
          <Flex flexWrap="wrap">
            {item.linkedWikis.blockchains
              .slice(0, MAX_LINKED_WIKIS)
              .map((blockchain, i) => {
                return (
                  <React.Fragment key={`blockchain${i}`}>
                    {i > 0 && (
                      <Box as="span" color="brandLinkColor">
                        , &nbsp;
                      </Box>
                    )}
                    <Link href={`/wiki/${blockchain}`} color="brandLinkColor">
                      {blockchain.charAt(0).toUpperCase() +
                        blockchain.slice(1).replace('-', '')}
                    </Link>
                  </React.Fragment>
                )
              })}
          </Flex>
        ) : (
          <Text>NA</Text>
        )}
      </Td>
      <Td
        borderColor="rankingListBorder"
        fontWeight={500}
        fontSize="14px"
        minW="155px"
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

export default FounderRankingItem
