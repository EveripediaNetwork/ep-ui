import { useAppSelector } from '@/store/hook'
import { Button, Flex, Icon, Text } from '@chakra-ui/react'
import { MData } from '@everipedia/iq-utils'
import React from 'react'
import { FiCalendar } from 'react-icons/fi'

const Location = () => {
  const metadata = useAppSelector((state) => state.wiki.metadata)
  const locationString = metadata.find((m: MData) => m.id === 'location')?.value
  const location = locationString ? JSON.parse(locationString) : ''
  return (
    <>
      {location && (
        <Flex
          gap="2"
          alignItems="center"
          borderRadius="md"
          bg="gray.200"
          pl="2"
          _dark={{
            bg: 'whiteAlpha.200',
          }}
          w="max-content"
        >
          <Flex alignItems="center" gap="1" flexShrink={0}>
            <Icon as={FiCalendar} w="16px" h="16px" />
          </Flex>
          <Button
            w="max-content"
            display="flex"
            gap={2}
            bg="gray.100"
            color="black"
            _active={{
              bg: 'gray.100',
            }}
            _hover={{
              bg: 'gray.100',
            }}
            _dark={{
              color: 'white',
              bg: 'whiteAlpha.100',
            }}
            borderLeftRadius="0"
            size="xs"
            px={2}
          >
            <Text
              fontWeight="normal"
              fontSize="xs"
              noOfLines={1}
              display="inline-block"
              overflowX="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              maxWidth="150px"
            >
              {`${location?.country}`}
            </Text>
          </Button>
        </Flex>
      )}
    </>
  )
}

export default Location
