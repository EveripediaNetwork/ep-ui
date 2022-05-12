import { CiteReference } from '@/types/Wiki'
import { hashToNum } from '@/utils/hashToNum'
import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'

interface ReferenceCardProps {
  index: number
  handleExistingCiteSubmit: (reference: CiteReference, index: number) => void
  reference: CiteReference
}
export const ReferenceCard = ({
  index,
  handleExistingCiteSubmit,
  reference,
}: ReferenceCardProps) => {
  return (
    <Button
      key={index}
      w="100% !important"
      onClick={() => handleExistingCiteSubmit(reference, index)}
      h="unset !important"
    >
      <Box
        textAlign="start"
        w="100% !important"
        p={8}
        bgColor="#f7f9fc !important"
        _dark={{
          bgColor: '#2e3445 !important',
          color: 'white !important',
        }}
        borderLeftWidth="3px !important"
        borderColor={`hsl(${hashToNum(
          reference.url + reference.description,
        )}, 80%, 80%) !important`}
      >
        <Text>{reference.url}</Text>
        <Text
          textOverflow="ellipsis"
          maxW="100%"
          overflow="hidden"
          opacity={0.5}
          fontWeight="100 !important"
        >
          {reference.description}
        </Text>
      </Box>
    </Button>
  )
}
