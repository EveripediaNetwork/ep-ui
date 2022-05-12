import React, { useEffect, useState } from 'react'
import { CiteReference } from '@/types/Wiki'
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Tag,
  Text,
  Link,
} from '@chakra-ui/react'

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
      <Heading my={4} p={2} fontWeight="medium">
        REFERENCES
      </Heading>
      <SimpleGrid mb={8} columns={[1, 2, 3]} spacing={4}>
        {references.map((ref, index) => (
          <Flex
            id={`cite-id-${ref.id}`}
            bg={
              currentLocationHash === `#cite-id-${ref.id}`
                ? '#c5e2f644'
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
              <Tag colorScheme="blue" as="h3" size="sm" fontWeight="500">
                <Link rel="nofollow" p="0 0 0 0 !important" href={ref.url}>
                  {new URL(ref.url).hostname}
                </Link>
              </Tag>
              <Text>{ref.description}</Text>
              {ref.timestamp && (
                <Text opacity={0.6} fontSize="sm">
                  {new Date(ref.timestamp).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </Text>
              )}
            </Box>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default WikiReferences
