import React from 'react'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Flex, Box, Text } from '@chakra-ui/react'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import Link from '@/components/Elements/LinkElements/Link'
import { RankCardType } from '@/types/RankDataTypes'

export const RankCardItem = ({
  cardData,
  index,
}: {
  cardData: RankCardType
  index: number
}) => {
  const downIndicationIconColor = useColorModeValue('#E53E3E', '#FC8181')
  const upIndicationIconColor = useColorModeValue('#25855A', '#68D391')
  const getAlias = (text: string) => (text ?? 'Unknown') || text

  const getTokenAlias = (text: string) => {
    if (text === null) {
      return 'Unknown'
    }
    if (text) {
      return text
    }
    return ''
  }

  return (
    <Link
      href={`https://iq.wiki/wiki/${cardData.id}`}
      className="group"
      _dark={{
        _hover: { textDecoration: 'none' },
      }}
      _light={{
        _hover: { textDecoration: 'none' },
      }}
      _groupHover={{ textDecoration: 'none' }}
    >
      <Flex
        gap={4}
        alignItems="center"
        p={{ '2xl': 4, md: 2, base: 2 }}
        w="100%"
      >
        <Text fontSize={{ base: 'sm', '2xl': 'lg' }} fontWeight={600}>
          {index}
        </Text>
        <Flex gap={2} w="100%" alignItems="center">
          <Box
            w={{ lg: '60px', md: '40px', base: '40px' }}
            h={{ lg: '50px', md: '30px', base: '30px' }}
            bg={
              cardData?.nftMarketData
                ? `url(${cardData?.nftMarketData.image})`
                : `url(${cardData?.tokenMarketData.image})`
            }
            bgPos="center"
            bgSize="contain"
            bgRepeat="no-repeat"
            borderRadius="md"
          />
          <Flex w="100%" justifyContent="space-between">
            <Flex
              flexDir={cardData?.tokenMarketData ? 'column' : 'row'}
              alignItems={cardData?.nftMarketData && 'center'}
            >
              <Text
                color="primaryPinkIcon"
                fontSize={{ base: 'xs', lg: 'md' }}
                whiteSpace="nowrap"
                _groupHover={{
                  textDecoration: 'underline',
                  textDecorationColor: 'brand.500',
                }}
                _dark={{
                  _groupHover: { textDecorationColor: 'brand.500' },
                }}
              >
                {cardData?.title}
              </Text>
              {cardData?.tokenMarketData && (
                <Text color="inactiveText" fontSize={{ base: 'xs', lg: 'sm' }}>
                  {cardData?.nftMarketData
                    ? getAlias(cardData?.nftMarketData?.alias)
                    : getTokenAlias(cardData?.tokenMarketData?.alias)}
                </Text>
              )}
            </Flex>
            <Flex
              flexDir="column"
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
                  : cardData?.tokenMarketData?.market_cap?.toLocaleString()}
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
    </Link>
  )
}
