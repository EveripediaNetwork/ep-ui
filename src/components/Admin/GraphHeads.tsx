import React from 'react'
import { Th, Text } from '@chakra-ui/react'

export const TableHead = ({ text }: { text: string }) => {
  return (
    <Th color="#718096" textTransform="capitalize" fontWeight="normal">
      <Text fontWeight="bold">{text}</Text>
    </Th>
  )
}
