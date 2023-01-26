import React from 'react'
import { Flex, Text, Icon, Box, Tr, Td } from '@chakra-ui/react'

import { BiImage } from 'react-icons/bi'

export const InvalidRankCardItem = ({ index }: { index: number }) => {
  return (
    <Tr>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        <Text color="rankingListText">{index + 1}</Text>
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        <Flex gap="2.5" alignItems="center">
          <Box flexShrink="0" w="40px" h="40px">
            <Icon as={BiImage} w="full" h="full" color="gray.500" />
          </Box>
          <Box>Coming Soon</Box>
        </Flex>
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        <Text color="rankingListText">Coming Soon</Text>
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        <Flex gap="1">
          <Text color="rankingListText">NA</Text>
        </Flex>
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        <Flex gap="1">
          <Text color="rankingListText">Coming Soon</Text>
        </Flex>
      </Td>
      <Td borderColor="rankingListBorder" fontWeight={500} fontSize="14px">
        NA
      </Td>
      <Td
        borderColor="rankingListBorder"
        fontWeight={500}
        color="rankingListText"
        fontSize="14px"
      >
        Coming soon
      </Td>
    </Tr>
  )
}
