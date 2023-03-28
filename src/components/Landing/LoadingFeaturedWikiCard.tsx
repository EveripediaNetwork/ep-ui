import {
  VStack,
  HStack,
  chakra,
  Skeleton,
  Flex,
  SkeletonCircle,
} from '@chakra-ui/react'
import React from 'react'

export const TrendingSkeleton = () => {
  const itemsCount = [1, 2, 3, 4]
  return (
    <VStack
      w="full"
      pt={{ base: '2', lg: '4' }}
      px="2"
      gap="5"
      overflow="hidden"
    >
      {itemsCount.map((item, i) => (
        <HStack w="full">
          <chakra.span minW="2" alignSelf="center">
            {i + 1}
          </chakra.span>
          <Skeleton
            rounded="lg"
            w={{ base: '55px', md: '65px', lg: '75px' }}
            h={{ base: '48px', md: '55px', lg: '63px' }}
          />
          <VStack w="full" alignItems="start">
            <Skeleton rounded="lg" h="16px" w="100px" />
            <Skeleton rounded="lg" h="14px" w="280px" />
            <Skeleton rounded="lg" h="14px" w="180px" />
          </VStack>
        </HStack>
      ))}
    </VStack>
  )
}
export const LoadingFeaturedWikiCard = () => {
  return (
    <chakra.div px={2} mx="auto">
      <Flex
        alignSelf="center"
        direction="column"
        textAlign="left"
        bg="white"
        _dark={{ bgColor: 'gray.700', color: 'white' }}
        cursor="pointer"
        rounded="lg"
        shadow="md"
        gap="2"
        pb="3"
      >
        <Skeleton w="full" height="250px" rounded="md" />

        <Flex direction="column" px="5" gap="2">
          <Skeleton rounded="lg" h="16px" w="100px" />
          <Skeleton rounded="lg" h="14px" w="280px" />
          <Skeleton rounded="lg" h="14px" w="180px" />
          <HStack justifyContent="space-between">
            <Flex alignItems="center" gap={3} width="50%">
              <SkeletonCircle size="30px" />
              <Skeleton rounded="lg" h="18px" w="60px" />
            </Flex>
            <Skeleton rounded="lg" h="18px" w="100px" />
          </HStack>
        </Flex>
      </Flex>
    </chakra.div>
  )
}
