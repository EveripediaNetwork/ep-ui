import React from 'react'
import { Flex, Text, Icon } from '@chakra-ui/react'
import { RiCoinsFill } from 'react-icons/ri'
import { BiImage } from 'react-icons/bi'

export const InvalidRankCardItem = ({
  index,
  cardType,
}: {
  index: number
  cardType: string
}) => {
  return (
    <Flex gap={4} alignItems="center" p={{ '2xl': 4, md: 2, base: 2 }}>
      <Text fontSize={{ base: 'sm', '2xl': 'lg' }}>{index}</Text>
      <Flex gap={2} w="100%" alignItems="center">
        <Icon
          as={cardType === 'NFT' ? BiImage : RiCoinsFill}
          w={{ lg: '60px', md: '40px', base: '40px' }}
          h={{ lg: '35px', md: '30px', base: '30px' }}
          color="primaryPinkIcon"
        />

        <Flex w="100%">
          <Flex w="65%" alignItems="center">
            <Text
              color="primaryPinkIcon"
              fontSize={{ md: 'sm', lg: 'xs', base: 'sm', '2xl': 'md' }}
              whiteSpace="nowrap"
            >
              Unavailable
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
              $0.00
            </Text>
            <Flex
              alignItems="center"
              gap={0.5}
              width="100%"
              justifyContent="end"
            >
              {/* <AiFillCaretUp color={upIndicationIconColor} /> */}
              <Text fontWeight="bold" fontSize={{ md: 'xs', base: 'xs' }}>
                0%
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
