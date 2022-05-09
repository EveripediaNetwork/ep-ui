import React, { useEffect, useState } from 'react'
import { CiteReference } from '@/types/Wiki'
import { Box, Flex, Heading, SimpleGrid, Tag, Text } from '@chakra-ui/react'

interface WikiReferencesProps {
  references: CiteReference[]
}
const WikiReferences = ({ references }: WikiReferencesProps) => {
  const [currentLocationHash, setCurrentLocationHash] = useState('')
  useEffect(() => {
    const onHashChanged = () => {
      setCurrentLocationHash(window.location.hash)
    }
    window.addEventListener('hashchange', onHashChanged)
    return () => {
      window.removeEventListener('hashchange', onHashChanged)
    }
  }, [])

  if (references.length === 0) return null
  return (
    <Box borderTopWidth="1px" p={4}>
      <Heading my={4} fontWeight="500">
        REFERENCES
      </Heading>
      <SimpleGrid mt={4} columns={2} spacing={4}>
        {references.map((reference, index) => (
          <Flex
            id={`cite-id-${reference.id}`}
            bgColor={
              currentLocationHash === `#cite-id-${reference.id}`
                ? '#cca7002a'
                : 'transparent'
            }
            borderRadius={4}
            p={2}
            scrollMarginTop="20vh"
            gap={2}
            align="start"
            key={index}
            maxW="400px"
          >
            <Text color="blue.500">[{index + 1}] </Text>
            <Box>
              <Tag colorScheme="blue" as="h3" fontSize="sm" fontWeight="500">
                {reference.url}
              </Tag>
              <Text display="inline" ml={2} mt={2} lineHeight="7">
                {reference.description}
              </Text>
            </Box>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default WikiReferences
