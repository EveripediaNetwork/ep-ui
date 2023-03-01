import React from 'react'
import { Box, Flex, Skeleton, Td, Tr } from '@chakra-ui/react'

const SingleLoadingSkeleton = () => {
  return (
    <Tr verticalAlign="middle">
      <Td>
        <Flex gap="3" alignItems="center">
          <Skeleton w="40px" h="40px" borderRadius="50%" />
          <Box>
            <Skeleton w="80px" h="12px" borderRadius="18px" />
            <Skeleton mt="2" w="80px" h="12px" borderRadius="18px" />
          </Box>
        </Flex>
      </Td>
      <Td>
        <Skeleton w="15px" h="12px" borderRadius="18px" />
      </Td>
      <Td>
        <Skeleton w="15px" h="12px" borderRadius="18px" />
      </Td>
      <Td>
        <Skeleton w="15px" h="12px" borderRadius="18px" />
      </Td>
      <Td>
        <Flex gap="3" alignItems="center">
          <Skeleton w="40px" h="40px" />
          <Box>
            <Skeleton w="150px" h="12px" borderRadius="18px" />
          </Box>
        </Flex>
      </Td>
      <Td>
        <Skeleton w="80px" h="12px" borderRadius="18px" />
      </Td>
      <Td>
        <Skeleton w="60px" h="12px" borderRadius="18px" />
      </Td>
      <Td>
        <Skeleton w="60px" h="12px" borderRadius="18px" />
      </Td>
    </Tr>
  )
}

export const LoadingAdminTableSkeleton = ({ length }: { length: number }) => {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <SingleLoadingSkeleton key={index} />
      ))}
    </>
  )
}
