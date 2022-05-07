import { CiteReference } from '@/types/Wiki'
import { hashToNum } from '@/utils/hashToNum'
import { Box, Button, Text, VStack } from '@chakra-ui/react'
import React from 'react'

interface AddFromExistingProps {
  refCount: number
  references: CiteReference[]
  handleExistingCiteSubmit: (ref: CiteReference) => void
}

export const CiteFromExistingRefs = ({
  refCount,
  references,
  handleExistingCiteSubmit,
}: AddFromExistingProps) => {
  return (
    <VStack maxH="300px" overflowY="scroll" spacing={8}>
      {refCount > 0 ? (
        references.map((ref, index) => (
          <Button
            key={index}
            w="100% !important"
            onClick={() => handleExistingCiteSubmit(ref)}
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
                ref.url + ref.description,
              )}, 80%, 80%) !important`}
            >
              <Text>{ref.url}</Text>
              <Text
                textOverflow="ellipsis"
                maxW="100%"
                overflow="hidden"
                opacity={0.5}
                fontWeight="100 !important"
              >
                {ref.description}
              </Text>
            </Box>
          </Button>
        ))
      ) : (
        <Box
          p="10px !important"
          mb={8}
          w="100%"
          textAlign="center"
          fontSize="14px"
        >
          <Text p="10px !important" w="100%" textAlign="center" fontSize="14px">
            This Page has no Citations
          </Text>
          <Text
            fontSize="12px"
            fontWeight="100 !important"
            opacity={0.5}
            w="60%"
            mx="auto"
          >
            Add a Citation to this Page by clicking the New URL tab at the top
          </Text>
        </Box>
      )}
    </VStack>
  )
}
