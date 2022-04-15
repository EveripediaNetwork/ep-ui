import {
  Flex,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  VStack,
} from '@chakra-ui/react'
import React from 'react'

const SingleSkeleton = () => {
  return (
    <HStack
      bgColor="cardBg"
      justifyContent="space-between"
      borderWidth="1px"
      borderColor="cardBorder"
      borderRadius="lg"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.10)"
      px={{ base: 3, lg: 5 }}
      py={{ base: 3, lg: 5 }}
      w="100%"
    >
      <HStack maxW="70%">
        <Skeleton
          h={{ base: 65, lg: 100 }}
          w={{ base: 65, lg: 100 }}
          borderRadius="lg"
        />
        <VStack justifyItems="start">
          <SkeletonText noOfLines={3} spacing="4" pl="4" w="lg" />
          <HStack alignSelf="start" alignItems="end">
            <SkeletonCircle size="6" ml="4" />
            <Skeleton h="4" w="16" rounded="sm" />
            <Skeleton h="4" w="16" rounded="sm" />
            <Skeleton h="4" w="16" rounded="sm" />
            <Skeleton h="4" w="16" rounded="sm" />
            <Skeleton h="4" w="16" rounded="sm" />
          </HStack>
        </VStack>
      </HStack>
      <Flex ml="0 !important" direction="column" gap="16">
        <Skeleton h="4" w="12" rounded="sm" ml="auto" />

        <Skeleton h="4" w="16" rounded="sm" mt="auto" ml="auto" />
      </Flex>
    </HStack>
  )
}

export const SearchSkeleton = () => {
  return (
    <VStack spacing={4}>
      {Array.from({ length: 4 }).map((_, i) => (
        <SingleSkeleton key={i} />
      ))}
    </VStack>
  )
}
