import React, { useState } from 'react'
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Input,
  SimpleGrid,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { useAppDispatch } from '@/store/hook'
import { EventType, Wiki, BaseEvents } from '@everipedia/iq-utils'
import { FiCalendar } from 'react-icons/fi'
import { RiCloseLine } from 'react-icons/ri'

const EventsInput = ({ wiki }: { wiki: Wiki }) => {
  const dispatch = useAppDispatch()
  const [eventTitle, setEventTitle] = useState<string>('')
  const [eventDescription, setEventDescription] = useState<string>('')
  const [eventDate, setEventDate] = useState<string>('')
  const [selectedEvent, setSelectedEvent] = useState<BaseEvents | null>(null)

  const inputIsValid =
    eventDate.trim().length > 0 &&
    eventDescription.trim().length > 0 &&
    eventTitle.trim().length > 0

  const handleAddEvent = () => {
    if (!inputIsValid) return

    const eventType =
      wiki?.events?.length === 0 || !wiki?.events
        ? EventType.CREATED
        : EventType.DEFAULT

    const eventData: BaseEvents = {
      type: selectedEvent ? selectedEvent.type : eventType,
      description: eventDescription,
      date: new Date(eventDate).toISOString(),
      title: eventTitle,
      link: '',
    }

    if (selectedEvent) {
      dispatch({
        type: 'wiki/addEvent',
        payload: {
          ...eventData,
        },
      })
      setSelectedEvent(null)
    } else {
      dispatch({
        type: 'wiki/addEvent',
        payload: {
          ...eventData,
        },
      })
    }

    setEventDate('')
    setEventDescription('')
    setEventTitle('')
  }

  return (
    <>
      <Box>
        <Text fontWeight="semibold">Event Dates</Text>
        <Flex
          gap="3"
          w="full"
          mt="1.5"
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <Box flex="8" w="full">
            <SimpleGrid
              gridTemplateColumns={{ base: '1fr', md: '1.2fr 2fr' }}
              gap="3"
            >
              <Input
                type="date"
                placeholder="Select date"
                fontSize="14px"
                value={eventDate}
                onChange={e => {
                  setEventDate(e.target.value)
                }}
              />
              <Input
                type="text"
                placeholder="Title"
                value={eventTitle}
                onChange={e => {
                  setEventTitle(e.target.value)
                }}
              />
            </SimpleGrid>
            <Textarea
              mt="3"
              value={eventDescription}
              placeholder="Write a short description for the event date"
              onChange={e => {
                setEventDescription(e.target.value)
              }}
            />
          </Box>
          <Box flex="1" alignSelf="center" w="max-content">
            <Button
              isDisabled={!inputIsValid}
              size="sm"
              rounded="md"
              w="98px"
              onClick={handleAddEvent}
            >
              {selectedEvent ? 'Update' : 'Add'}
            </Button>
          </Box>
        </Flex>
      </Box>
      {wiki.events && (
        <Flex
          border="1px solid"
          borderRadius="6px"
          py="3"
          px="2.5"
          gap="2.5"
          flexWrap="wrap"
          borderColor="gray.200"
          _dark={{ borderColor: 'whiteAlpha.200' }}
        >
          {wiki.events &&
            wiki.events.map(wikiEvent => (
              <Flex key={wikiEvent.date} gap="2">
                <Flex alignItems="center" gap="1">
                  <Icon as={FiCalendar} w="16px" h="16px" />
                </Flex>
                <Button
                  display="flex"
                  gap={2}
                  bg="gray.100"
                  color="black"
                  onClick={() => {
                    setSelectedEvent(() => wikiEvent)
                    setEventDate(wikiEvent?.date as string)
                    setEventTitle(wikiEvent?.title as string)
                    setEventDescription(wikiEvent?.description as string)
                  }}
                  _hover={{
                    bg: 'gray.100',
                  }}
                  _dark={{
                    color: 'white',
                    bg: 'whiteAlpha.100',
                  }}
                  rounded="md"
                  size="xs"
                  px={2}
                >
                  <HStack>
                    <Text
                      fontWeight="normal"
                      fontSize="xs"
                      noOfLines={1}
                      display="-webkit-box"
                      overflow="clip"
                      textOverflow="ellipsis"
                    >
                      {wikiEvent.title}
                    </Text>
                  </HStack>
                  <Center
                    boxSize={4}
                    fontSize="xs"
                    fontWeight="bold"
                    lineHeight="none"
                    color="red.100"
                    bg="red.400"
                    _hover={{ bg: 'red.500' }}
                    rounded="full"
                  >
                    <Icon as={RiCloseLine} />
                  </Center>
                </Button>
              </Flex>
            ))}
        </Flex>
      )}
    </>
  )
}

export default EventsInput
