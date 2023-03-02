import React, { useState } from 'react'
import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  chakra,
} from '@chakra-ui/react'
import { useAppDispatch } from '@/store/hook'
import { EventType, Wiki, BaseEvents } from '@everipedia/iq-utils'
import { FiCalendar } from 'react-icons/fi'
import { RiCloseLine } from 'react-icons/ri'

const EventsInput = ({ wiki }: { wiki: Wiki }) => {
  const dispatch = useAppDispatch()
  const [eventTitle, setEventTitle] = useState<string>('')
  const [eventTitleError, setEventTitleError] = useState<string>('')
  const [eventDescription, setEventDescription] = useState<string>('')
  const [eventDescriptionError, setEventDescriptionError] = useState<string>('')
  const [eventDate, setEventDate] = useState<string>('')
  const [eventLink, setEventLink] = useState<string>('')
  const [eventLinkError, setEventLinkError] = useState<string>('')
  const [selectedEvent, setSelectedEvent] = useState<BaseEvents | null>(null)
  const [inputsInvalid, setInputsInvalid] = useState<boolean>(false)

  const clearInputs = () => {
    setEventLinkError('')
    setEventDescriptionError('')
    setEventTitleError('')
    setEventDate('')
    setEventDescription('')
    setEventTitle('')
    setEventLink('')
  }

  const inputIsValid =
    eventDate.length > 0 &&
    eventDescription.trim().length > 0 &&
    eventTitle.trim().length > 0

  const checkValididty = () => {
    if (!inputIsValid) {
      setInputsInvalid(true)
    } else {
      setInputsInvalid(false)
    }
  }

  const handleAddEvent = () => {
    if (!inputIsValid) {
      setInputsInvalid(true)
      return
    }

    setInputsInvalid(false)

    if (eventTitle.length > 80) {
      setEventTitleError('Title must not be longer than 80 characters')
      return
    }

    if (eventLink.length > 500) {
      setEventLinkError('Link must not be longer than 500 characters')
      return
    }

    if (eventDescription.length > 255) {
      setEventDescriptionError(
        'Description must not be longer than 255 characters',
      )
      return
    }

    if (eventLink) {
      if (!eventLink.startsWith('https://')) {
        setEventLinkError('Invalid link, link should start with https')
        return
      }
    }

    const eventType =
      wiki?.events?.length === 0 || !wiki?.events
        ? EventType.CREATED
        : EventType.DEFAULT

    const eventData: BaseEvents = {
      type: selectedEvent ? selectedEvent.type : eventType,
      description: eventDescription,
      date: new Date(eventDate).toISOString(),
      title: eventTitle,
      link: eventLink,
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
    clearInputs()
  }

  const removeEventHandler = (id: string) => {
    dispatch({
      type: 'wiki/removeEvent',
      payload: {
        eventId: id,
      },
    })

    clearInputs()
    setSelectedEvent(null)
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
                checkValididty()
              }}
            />
            <Input
              fontSize={{ base: '12px', md: '14px' }}
              type="text"
              placeholder="Title"
              value={eventTitle}
              onChange={e => {
                setEventTitle(e.target.value)
                checkValididty()
              }}
            />
            <Input
              type="url"
              value={eventLink}
              onChange={e => {
                setEventLink(e.target.value)
              }}
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
              checkValididty()
            }}
          />
          <Button
            isDisabled={inputsInvalid}
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
                <Flex alignItems="center" gap="1" flexShrink={0}>
                  <Icon as={FiCalendar} w="16px" h="16px" />
                </Flex>
                <Button
                  w="max-content"
                  display="flex"
                  gap={2}
                  bg="gray.100"
                  color="black"
                  onClick={() => {
                    setSelectedEvent(() => wikiEvent)
                    setEventDate(
                      new Date(wikiEvent?.date as string).toISOString(),
                    )
                    setEventTitle(wikiEvent?.title as string)
                    setEventDescription(wikiEvent?.description as string)
                    setEventLink(wikiEvent.link as string)
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
                  <Text
                    fontWeight="normal"
                    fontSize="xs"
                    noOfLines={1}
                    display="inline-block"
                    overflowX="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    maxWidth="100px"
                  >
                    {wikiEvent.title}
                  </Text>
                  <Center
                    flexShrink={0}
                    boxSize={4}
                    fontSize="xs"
                    fontWeight="bold"
                    lineHeight="none"
                    color="red.100"
                    bg="red.400"
                    _hover={{ bg: 'red.500' }}
                    rounded="full"
                    onClick={e => {
                      e.stopPropagation()
                      removeEventHandler(wikiEvent.date)
                    }}
                  >
                    <Icon as={RiCloseLine} />
                  </Center>
                </Button>
              </Flex>
            ))}
        </Flex>
      )}
      <>
        {inputsInvalid && (
          <chakra.span color="red.400" fontSize={{ base: '12px', md: '14px' }}>
            Please fill in all required fields.
          </chakra.span>
        )}
        {eventTitleError && (
          <chakra.span color="red.400" fontSize={{ base: '12px', md: '14px' }}>
            {eventTitleError}
          </chakra.span>
        )}
        {eventLinkError && (
          <chakra.span color="red.400" fontSize={{ base: '12px', md: '14px' }}>
            {eventLinkError}
          </chakra.span>
        )}
        {eventDescriptionError && (
          <chakra.span color="red.400" fontSize={{ base: '12px', md: '14px' }}>
            {eventDescriptionError}
          </chakra.span>
        )}
      </>
    </>
  )
}

export default EventsInput
