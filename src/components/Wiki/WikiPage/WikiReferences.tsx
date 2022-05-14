import React, { useEffect, useState } from 'react'
import { CiteReference } from '@/types/Wiki'
import {
  Box,
  Heading,
  SimpleGrid,
  Tag,
  Text,
  LinkBox,
  LinkOverlay,
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
          <LinkBox
            display="flex"
            key={ref.id}
            id={`cite-id-${ref.id}`}
            bg={
              currentLocationHash === `#cite-id-${ref.id}`
                ? 'blue.50'
                : 'transparent'
            }
            _dark={{
              bg:
                currentLocationHash === `#cite-id-${ref.id}`
                  ? 'gray.700'
                  : 'transparent',
            }}
            borderRadius={4}
            p={2}
            scrollMarginTop="20vh"
            gap={2}
            maxW="400px"
            _hover={{
              bg: 'gray.50',
              _dark: {
                bg: 'gray.900',
              },
            }}
          >
            <Text color="blue.500">[{index + 1}] </Text>
            <Box>
              <Tag colorScheme="blue" as="h3" size="sm" fontWeight="500">
                <LinkOverlay rel="nofollow" p="0 !important" href={ref.url}>
                  {new URL(ref.url).hostname}
                </LinkOverlay>
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
          </LinkBox>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default WikiReferences
