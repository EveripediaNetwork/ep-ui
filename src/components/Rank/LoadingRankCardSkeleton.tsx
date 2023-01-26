import React from 'react'
import { Flex, Box, Skeleton, Tr, Td } from '@chakra-ui/react'

const SingularSkeleton = () => {
  return (
    <Tr verticalAlign="middle">
      <Td verticalAlign="middle" borderColor="rankingListBorder">
        <Skeleton h="12px" w="36px" borderRadius="15px" />
      </Td>
      <Td borderColor="rankingListBorder">
        <Flex gap="2.5" alignItems="center">
          <Skeleton h="40px" w="40px" borderRadius="50%" />
          <Box>
            <Skeleton h="15px" w="180px" borderRadius="15px" />
            <Skeleton h="12px" w="36px" borderRadius="15px" mt="1" />
          </Box>
        </Flex>
      </Td>
      <Td verticalAlign="middle" borderColor="rankingListBorder">
        <Flex>
          <Skeleton h="15px" w="80px" borderRadius="15px" />
          <Skeleton h="10px" w="30px" borderRadius="15px" />
        </Flex>
      </Td>
      <Td verticalAlign="middle" borderColor="rankingListBorder">
        <Skeleton h="15px" w="60px" borderRadius="15px" />
      </Td>
      <Td verticalAlign="middle" borderColor="rankingListBorder">
        <Flex>
          <Skeleton h="15px" w="80px" borderRadius="15px" />
          <Skeleton h="10px" w="30px" borderRadius="15px" />
        </Flex>
      </Td>
      <Td verticalAlign="middle" borderColor="rankingListBorder">
        <Skeleton h="15px" w="80px" borderRadius="15px" />
      </Td>
      <Td verticalAlign="middle" borderColor="rankingListBorder">
        <Skeleton h="15px" w="60px" borderRadius="15px" />
      </Td>
    </Tr>
  )
}

export const LoadingRankCardSkeleton = ({ length }: { length: number }) => {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <SingularSkeleton key={index} />
      ))}
    </>
  )
}
