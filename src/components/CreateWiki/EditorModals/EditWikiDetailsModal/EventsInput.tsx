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

  const removeEventHandler = (id: string) => {
    dispatch({
      type: 'wiki/removeEvent',
      payload: {
        eventId: id,
      },
    })
  }

  return (
    <>
      <Box>
        <Text fontWeight="semibold">Event Dates</Text>
        <Box flex="8" w="full" mt="1.5">
          <SimpleGrid
            gridTemplateColumns={{ base: '1fr', md: '0.8fr 1fr 1fr' }}
            gap="3"
          >
            <Input
              type="date"
              placeholder="Select date"
              fontSize={{ base: '12px', md: '14px' }}
              value={eventDate}
              onChange={e => {
                setEventDate(e.target.value)
              }}
            />
            <Input
              fontSize={{ base: '12px', md: '14px' }}
              type="text"
              placeholder="Title"
              value={eventTitle}
              onChange={e => {
                setEventTitle(e.target.value)
              }}
            />
            <Input
              type="url"
              placeholder="Link"
              fontSize={{ base: '12px', md: '14px' }}
            />
          </SimpleGrid>
        </Box>
        <SimpleGrid
          gridTemplateColumns={{ base: '1fr', md: '2fr 110px' }}
          gap="3"
          mt="3"
        >
          <Textarea
            value={eventDescription}
            placeholder="Write a short description for the event date"
            h={{ base: '80px', md: 'initial' }}
            fontSize={{ base: '12px', md: '14px' }}
            onChange={e => {
              setEventDescription(e.target.value)
            }}
          />
          <Button
            isDisabled={!inputIsValid}
            w="full"
            rounded="md"
            onClick={handleAddEvent}
            h="40px"
          >
            {selectedEvent ? 'Update' : 'Add'}
          </Button>
        </SimpleGrid>
      </Box>
      {wiki.events && wiki.events?.length > 0 && (
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
                    onClick={() => removeEventHandler(wikiEvent.date)}
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
