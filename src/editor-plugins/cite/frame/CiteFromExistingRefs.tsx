import { CiteReference } from '@/types/Wiki'
import { Box, Button, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { ReferenceCard } from './ReferenceCard'

interface AddFromExistingProps {
  refCount: number
  references: CiteReference[]
  handleExistingCiteSubmit: (ref: CiteReference, index: number) => void
  setTabIndex: (index: number) => void
}

export const CiteFromExistingRefs = ({
  refCount,
  references,
  handleExistingCiteSubmit,
  setTabIndex,
}: AddFromExistingProps) => {
  return (
    <VStack maxH="300px" overflowY="scroll" spacing={8}>
      {refCount ? (
        references.map((reference, index) => (
          <ReferenceCard
            index={index}
            handleExistingCiteSubmit={handleExistingCiteSubmit}
            reference={reference}
          />
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
          <Button
            className="toastui-editor-ok-button"
            outline="0 !important"
            w="60% !important"
            mt="10px !important"
            onClick={() => setTabIndex(0)}
          >
            Cite New
          </Button>
        </Box>
      )}
    </VStack>
  )
}
