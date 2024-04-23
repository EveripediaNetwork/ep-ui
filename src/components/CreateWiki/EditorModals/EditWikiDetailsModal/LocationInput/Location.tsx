import { useAppDispatch, useAppSelector } from '@/store/hook'
import { Button, Center, Flex, Icon, Text } from '@chakra-ui/react'
import { MData } from '@everipedia/iq-utils'
import React from 'react'
import { RiCloseLine } from 'react-icons/ri'
import { VscLocation } from 'react-icons/vsc'

const Location = () => {
  const dispatch = useAppDispatch()
  const metadata = useAppSelector((state) => state.wiki.metadata)
  const locationString = metadata.find((m: MData) => m.id === 'location')?.value
  const parsedLocation = locationString ? JSON.parse(locationString) : ''
  const location = Array.isArray(parsedLocation)
    ? parsedLocation
    : [parsedLocation]

  const removeLocation = (year?: string) => {
    let newLocation = []
    if (Array.isArray(parsedLocation)) {
      newLocation = location.filter((item) => item?.year !== year)
    } else {
      newLocation = location.filter((item) => item?.year)
    }
    dispatch({
      type: 'wiki/updateMetadata',
      payload: {
        id: 'location',
        value: JSON.stringify(newLocation),
      },
    })
  }

  return (
    <Flex gap={2} flexWrap={'wrap'}>
      {location.length > 0 &&
        location.map((item, index) => (
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
            key={item?.year || index}
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
                {item?.year
                  ? `${item?.country} - ${item?.year}`
                  : `${item?.country}`}
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
              rounded="full"
              onClick={(e) => {
                e.stopPropagation()
                removeLocation(item?.year)
              }}
            >
              <Icon as={RiCloseLine} w="16px" h="16px" />
            </Center>
          </Flex>
        ))}
    </Flex>
  )
}

export default Location
