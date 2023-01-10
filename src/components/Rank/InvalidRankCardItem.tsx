import React from 'react'
import { Flex, Text, Icon, Box } from '@chakra-ui/react'
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
        <Box
          w={{ lg: '60px', md: '40px', base: '40px' }}
          h={{ lg: '50px', md: '30px', base: '30px' }}
        >
          <Icon
            as={cardType === 'NFT' ? BiImage : RiCoinsFill}
            w="full"
            h="full"
            color="gray.500"
          />
        </Box>
        <Flex w="100%" justifyContent="space-between">
          <Flex alignItems="center">
            <Text
              color="gray.500"
              fontSize={{ base: 'sm', lg: 'md' }}
              whiteSpace="nowrap"
            >
              Coming Soon
            </Text>
          </Flex>
          <Flex
            flexDir="column"
            alignItems="flex-start"
            justifyContent="space-around"
          >
            <Text
              color="inactiveText"
              fontSize="xs"
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
              <Text fontWeight="bold" fontSize="xs">
                0%
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
