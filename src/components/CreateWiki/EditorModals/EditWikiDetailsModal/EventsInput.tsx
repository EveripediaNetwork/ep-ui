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
import { EventType, Wiki } from '@everipedia/iq-utils'

const EventsInput = ({ wiki }: { wiki: Wiki }) => {
  const dispatch = useAppDispatch()
  const [eventTitle, setEventTitle] = useState<string>('')
  const [eventDescription, setEventDescription] = useState<string>('')
  const [eventDate, setEventDate] = useState<string>()

  const handleAddEvent = () => {
    dispatch({
      type: 'wiki/events',
      payload: {
        type: EventType.CREATED,
        description: eventDescription,
        title: eventTitle,
        date: eventDate,
      },
    })
  }

  return (
    <Box>
      <Text fontWeight="semibold">Event Dates</Text>
      <Flex gap="3" w="full" mt="1.5">
        <Box flex="8" w="full">
          <SimpleGrid gridTemplateColumns="1.2fr 2fr" gap="3">
            <Input
              type="date"
              placeholder="Select date"
              fontSize="14px"
              onChange={e => {
                setEventDate(e.target.value)
              }}
            />
            <Input
              type="text"
              placeholder="Title"
              onChange={e => {
                setEventTitle(e.target.value)
              }}
            />
          </SimpleGrid>
          <Textarea
            mt="3"
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
