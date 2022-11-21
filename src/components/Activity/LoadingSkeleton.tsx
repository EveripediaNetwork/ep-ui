import { HStack, Skeleton, SkeletonText, VStack } from '@chakra-ui/react'
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
        <SkeletonText noOfLines={4} spacing="4" pl="4" w="lg" />
      </HStack>
      <HStack gap={10} ml="0 !important">
        <VStack spacing={2} display={{ base: 'none', lg: 'flex' }}>
          <Skeleton h="10" w="20" rounded="md" />
        </VStack>
        <HStack
          marginInlineStart="0 !important"
          flexDirection={{ base: 'column', lg: 'row' }}
          gap={3}
          minW={0}
        >
          <Skeleton h="10" w="14" rounded="md" />

          <Skeleton h="10" w="14" rounded="md" />
        </HStack>
      </HStack>
    </HStack>
  )
}

export const LoadingSkeleton = ({ count = 4 }: { count?: number }) => {
  return (
    <VStack spacing={4}>
      {Array.from({ length: count }).map((_, i) => (
        <SingleSkeleton key={i} />
      ))}
    </VStack>
  )
}
