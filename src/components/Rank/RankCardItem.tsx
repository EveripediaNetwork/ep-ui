import React from 'react'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Flex, Box, Text } from '@chakra-ui/react'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'

export const RankCardItem = ({
  cardData,
  index,
}: {
  cardData: any
  index: number
}) => {
  const downIndicationIconColor = useColorModeValue('#E53E3E', '#FC8181')
  const upIndicationIconColor = useColorModeValue('#25855A', '#68D391')
  return (
    <Flex gap={4} alignItems="center" p={{ '2xl': 4, md: 2, base: 2 }}>
      <Text fontSize={{ base: 'sm', '2xl': 'lg' }}>{index + 1}</Text>
      <Flex gap={2} w="100%" alignItems="center">
        <Box
          w={{ lg: '60px', md: '40px', base: '40px' }}
          h={{ lg: '35px', md: '30px', base: '30px' }}
          bg={`url(https://ipfs.everipedia.org/ipfs/${cardData?.images?.[0]?.id})`}
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
              {cardData?.title}
            </Text>
            <Text
              color="inactiveText"
              fontSize={{ md: 'sm', lg: 'xs', base: 'sm', '2xl': 'md' }}
            >
              {cardData?.nftMarketData
                ? cardData?.nftMarketData?.alias
                : cardData?.tokenMarketData?.alias}
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
              {cardData?.nftMarketData
                ? cardData?.nftMarketData?.market_cap_usd.toLocaleString()
                : cardData?.tokenMarketData?.market_cap.toLocaleString()}
            </Text>
            <Flex
              alignItems="center"
              gap={0.5}
              width="100%"
              justifyContent="end"
            >
              {cardData?.nftMarketData
                ?.floor_price_in_usd_24h_percentage_change < 0 ? (
                <AiFillCaretDown color={downIndicationIconColor} />
              ) : (
                <AiFillCaretUp color={upIndicationIconColor} />
              )}
              <Text fontWeight="bold" fontSize={{ md: 'xs', base: 'xs' }}>
                {Math.abs(
                  cardData?.nftMarketData
                    ? cardData?.nftMarketData
                        ?.floor_price_in_usd_24h_percentage_change
                    : cardData?.tokenMarketData.price_change_24h,
                ).toFixed(3)}
                %
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
