import React, { useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Input,
  SimpleGrid,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { useAppDispatch } from '@/store/hook'
import { EventType, Wiki, BaseEvents } from '@everipedia/iq-utils'

const EventsInput = ({ wiki }: { wiki: Wiki }) => {
  const dispatch = useAppDispatch()
  const [eventTitle, setEventTitle] = useState<string>('')
  const [eventDescription, setEventDescription] = useState<string>('')
  const [eventDate, setEventDate] = useState<string>('')

  const handleAddEvent = () => {
    const eventType =
      wiki?.events?.length === 0 || !wiki?.events
        ? EventType.CREATED
        : EventType.DEFAULT

    const eventData: BaseEvents = {
      type: eventType,
      description: eventDescription,
      date: eventDate,
      title: eventTitle,
      link: '',
    }

    dispatch({
      type: 'wiki/addEvent',
      payload: {
        ...eventData,
      },
    })

    setEventDate('')
    setEventDescription('')
    setEventTitle('')
  }

  return (
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
          <Button size="sm" rounded="md" w="98px" onClick={handleAddEvent}>
            Add
          </Button>
        </Box>
      </Flex>
    </Box>
  )
}

export default EventsInput
