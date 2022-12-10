import {
  useGetNFTRankingQuery,
  useGetTokenRankingQuery,
} from '@/services/ranking'
import {
  Box,
  Flex,
  Button,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
} from 'react-icons/ai'
import { IconType } from 'react-icons/lib'

interface RankCardProps {
  title: string
  icon: IconType
}
const RankCard = ({ title, icon }: RankCardProps) => {
  const downIndicationIconColor = useColorModeValue('#E53E3E', '#FC8181')
  const upIndicationIconColor = useColorModeValue('#25855A', '#68D391')
  const [queryLimit, setQueryLimit] = useState<number>(0)

  let queryKind = ''

  if (title === 'NFTs') {
    queryKind = 'NFT'
  } else if (title === 'Cryptocurrencies') {
    queryKind = 'TOKEN'
  }
  // eslint-disable-next-line
  const { data: nftsQuery } =
    queryKind === 'NFT'
      ? // eslint-disable-next-line
        useGetNFTRankingQuery({
          kind: queryKind,
          limit: 10,
          offset: queryLimit,
        }) // eslint-disable-next-line
      : useGetTokenRankingQuery({
          kind: queryKind,
          limit: 10,
          offset: queryLimit,
        })

  const queryResult = nftsQuery

  console.log(queryResult, title)
  const offsetIncrease = () => {
    if (queryResult) {
      setQueryLimit(queryLimit + 1)
    }
  }

  return (
    <Flex
      w={{ lg: '32%', md: '49%', base: '100%' }}
      border="1px solid"
      borderColor="rankCardBorder"
      p={{ '2xl': 4, md: 2, base: 2 }}
      borderRadius="lg"
      flexDirection="column"
      mb={4}
      height="fit-content"
    >
      <Flex gap="1" mb="4" alignItems="center">
        <Icon
          as={icon}
          w={{ lg: '24px', md: '18px' }}
          h={{ lg: '24px', md: '18px' }}
          color="primaryPinkIcon"
        />
        <Text fontSize={{ lg: 'xl', md: 'sm' }}>{title}</Text>
      </Flex>
      <Flex gap={12} flexDir="column">
        {queryResult?.map((item: any, index: number) => {
          return (
            <Flex gap={4} alignItems="center" key={index}>
              <Text fontSize={{ base: 'sm', '2xl': 'lg' }}>{index + 1}</Text>
              <Flex gap={2} w="100%" alignItems="center">
                <Box
                  w={{ lg: '60px', md: '40px', base: '40px' }}
                  h={{ lg: '35px', md: '30px', base: '30px' }}
                  bg={`url(https://ipfs.everipedia.org/ipfs/${item?.images?.[0]?.id})`}
                  bgPos="center"
                  bgSize="cover"
                  borderRadius="md"
                />
                <Flex w="100%">
                  <Flex flexDir="column" w="65%">
                    <Text
                      color="primaryPinkIcon"
                      fontSize={{ md: 'sm', lg: 'xs', base: 'sm', '2xl': 'md' }}
                      whiteSpace="nowrap"
                    >
                      {item?.title}
                    </Text>
                    <Text
                      color="inactiveText"
                      fontSize={{ md: 'sm', lg: 'xs', base: 'sm', '2xl': 'md' }}
                    >
                      {item?.nftMarketData
                        ? item?.nftMarketData?.alias
                        : item?.tokenMarketData?.alias}
                    </Text>
                  </Flex>
                  <Flex
                    flexDir="column"
                    w="35%"
                    alignItems="flex-start"
                    justifyContent="space-around"
                  >
                    <Text
                      color="inactiveText"
                      fontSize={{ md: 'xs', base: 'sm' }}
                      width="100%"
                      textAlign="right"
                      whiteSpace="nowrap"
                    >
                      $
                      {item?.nftMarketData
                        ? item?.nftMarketData?.market_cap_usd
                        : item?.tokenMarketData?.market_cap}
                    </Text>
                    <Flex
                      alignItems="center"
                      gap={0.5}
                      width="100%"
                      justifyContent="end"
                    >
                      {item?.nftMarketData
                        ?.floor_price_in_usd_24h_percentage_change < 0 ? (
                        <AiFillCaretDown color={downIndicationIconColor} />
                      ) : (
                        <AiFillCaretUp color={upIndicationIconColor} />
                      )}
                      <Text
                        fontWeight="bold"
                        fontSize={{ md: 'xs', base: 'xs' }}
                      >
                        {Math.abs(
                          item?.nftMarketData
                            ? item?.nftMarketData
                                ?.floor_price_in_usd_24h_percentage_change
                            : item?.tokenMarketData.price_change_24h,
                        ).toFixed(3)}
                        %
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          )
        })}
        <Flex justifyContent="space-between">
          <Button
            leftIcon={<AiOutlineDoubleLeft />}
            _hover={{ bg: 'transparent' }}
            p="0"
            bg="transparent"
            _active={{ bg: 'transparent' }}
            onClick={() => {
              setQueryLimit(queryLimit - 1)
            }}
            disabled={queryLimit <= 0}
          >
            Prev
          </Button>
          <Button
            rightIcon={<AiOutlineDoubleRight />}
            _hover={{ bg: 'transparent' }}
            p="0"
            bg="transparent"
            _active={{ bg: 'transparent' }}
            onClick={() => {
              offsetIncrease()
            }}
            disabled={!queryResult}
          >
            Next
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default RankCard
