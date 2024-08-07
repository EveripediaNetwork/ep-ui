import { Flex, Icon, Center, Text, Button } from '@chakra-ui/react'
import React from 'react'
import { RiCloseLine } from 'react-icons/ri'
import { VscLocation } from 'react-icons/vsc'
import type { TLocationType } from './location.type'

const LocationItem = (props: TLocationType) => {
  const { location, removeLocation, handleLocationChange } = props
  return (
    <Flex
      gap="2"
      alignItems="center"
      borderRadius="md"
      bg="gray.200"
      px="2"
      _dark={{
        bg: 'whiteAlpha.200',
      }}
      w="max-content"
      onClick={handleLocationChange}
    >
      <Flex alignItems="center" gap="1" flexShrink={0}>
        <Icon as={VscLocation} w="16px" h="16px" />
      </Flex>
      <Button
        w="max-content"
        display="flex"
        gap={2}
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
          {`${location.country} - ${location.year}`}
        </Text>
      </Button>
      <Center
        flexShrink={0}
        boxSize={4}
        fontSize="xs"
        fontWeight="bold"
        lineHeight="none"
        color="red.100"
        bg="red.400"
        _hover={{
          bg: 'red.500',
        }}
        cursor={'pointer'}
        rounded="full"
        onClick={(e) => {
          e.stopPropagation()
          removeLocation(location)
        }}
      >
        <Icon as={RiCloseLine} w="16px" h="16px" />
      </Center>
    </Flex>
  )
}

export default LocationItem
