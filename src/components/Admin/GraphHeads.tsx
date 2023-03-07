import React from 'react'
import { Th, Text } from '@chakra-ui/react'

export const TableHead = ({ text }: { text: string }) => {
  return (
    <Th color="primaryGray" textTransform="capitalize" fontWeight="normal">
      <Text fontWeight="bold">{text}</Text>
    </Th>
  )
}
