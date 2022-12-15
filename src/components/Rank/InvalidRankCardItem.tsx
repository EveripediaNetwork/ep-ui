import React from 'react'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Flex, Box, Text } from '@chakra-ui/react'

export const InvalidRankCardItem = ({ index }: { index: number }) => {
  const rankPlaceholderImg = useColorModeValue(
    'rankImgPlaceholderLight.png',
    'rankImgPlaceholderDark.png',
  )
  return (
    <Flex gap={4} alignItems="center" p={{ '2xl': 4, md: 2, base: 2 }}>
      <Text fontSize={{ base: 'sm', '2xl': 'lg' }}>{index}</Text>
      <Flex gap={2} w="100%" alignItems="center">
        <Box
          w={{ lg: '60px', md: '40px', base: '40px' }}
          h={{ lg: '35px', md: '30px', base: '30px' }}
          bg={`url(/images/${rankPlaceholderImg})`}
          _dark={{
            bg: `url(/images/rankImgPlaceholderDark.png)`,
            bgPos: 'center',
            bgSize: '90%',
            bgRepeat: 'no-repeat',
          }}
          bgPos="center"
          bgSize="90%"
          borderRadius="md"
          bgRepeat="no-repeat"
        />
        <Flex w="100%">
          <Flex flexDir="column" w="65%">
            <Text
              color="primaryPinkIcon"
              fontSize={{ md: 'sm', lg: 'xs', base: 'sm', '2xl': 'md' }}
              whiteSpace="nowrap"
            >
              Unavailable
            </Text>
            <Text
              color="inactiveText"
              fontSize={{ md: 'sm', lg: 'xs', base: 'sm', '2xl': 'md' }}
            >
              ...
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
