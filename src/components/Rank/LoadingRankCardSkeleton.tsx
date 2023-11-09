import React from 'react'
import { Flex, Box, Skeleton, Tr, Td } from '@chakra-ui/react'

const SingularSkeleton = ({ isFounders = false }: { isFounders?: boolean }) => {
  return (
    <Tr verticalAlign="middle">
      <Td verticalAlign="middle" borderColor="rankingListBorder" pr="1">
        <Skeleton h="12px" w="36px" borderRadius="15px" />
      </Td>
      {!isFounders && (
        <Td borderColor="rankingListBorder" pl="2">
          <Flex gap="2.5" alignItems="center">
            <Skeleton h="40px" w="40px" borderRadius="50%" />
            <Box>
              <Skeleton h="15px" w="180px" borderRadius="15px" />
              <Skeleton h="12px" w="36px" borderRadius="15px" mt="1" />
            </Box>
          </Flex>
        </Td>
      )}
      <Td verticalAlign="middle" borderColor="rankingListBorder">
        <Flex>
          <Skeleton h="15px" w="80px" borderRadius="15px" />
          <Skeleton h="10px" w="30px" borderRadius="15px" />
        </Flex>
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
      <Td verticalAlign="middle" borderColor="rankingListBorder">
        <Skeleton h="15px" w="60px" borderRadius="15px" />
      </Td>
    </Tr>
  )
}

export const LoadingRankCardSkeleton = ({
  length,
  isFounders,
}: { length: number; isFounders?: boolean }) => {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <SingularSkeleton key={index} isFounders={isFounders} />
      ))}
    </>
  )
}
