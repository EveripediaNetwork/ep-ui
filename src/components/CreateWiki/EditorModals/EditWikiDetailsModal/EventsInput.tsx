import React, { ChangeEvent, FormEvent, useState } from 'react'
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
  // chakra,
  Tooltip,
} from '@chakra-ui/react'
import { useAppDispatch } from '@/store/hook'
import { EventType, Wiki, BaseEvents } from '@everipedia/iq-utils'
import { FiCalendar } from 'react-icons/fi'
import { RiCloseLine } from 'react-icons/ri'
import { isValidUrl } from '@/utils/textUtils'

const EventsInput = ({ wiki }: { wiki: Wiki }) => {
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState({
    eventDate: '',
    eventTitle: '',
    eventLink: '',
    eventDescription: '',
  })
  const [isValid, setIsValid] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<BaseEvents | null>(null)

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })

    if (
      formData.eventDate.length > 0 &&
      formData.eventTitle.length > 0 &&
      formData.eventDescription.length > 0 &&
      formData.eventTitle.length <= 80 &&
      formData.eventDescription.length <= 255
    ) {
      if (
        formData.eventLink &&
        isValidUrl(formData.eventLink) &&
        formData.eventLink.length <= 500
      ) {
        setIsValid(true)
      }
    } else {
      setIsValid(false)
    }
  }

  const handleAddEvent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsValid(true)

    const eventType =
      wiki?.events?.length === 0 || !wiki?.events
        ? EventType.CREATED
        : EventType.DEFAULT

    const eventData: BaseEvents = {
      type: selectedEvent ? selectedEvent.type : eventType,
      description: formData.eventDescription,
      date: new Date(formData.eventDate).toISOString(),
      title: formData.eventTitle,
      link: formData.eventLink,
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

    setFormData({
      eventDate: '',
      eventTitle: '',
      eventDescription: '',
      eventLink: '',
    })
  }

  const removeEventHandler = (id: string) => {
    dispatch({
      type: 'wiki/removeEvent',
      payload: {
        eventId: id,
      },
    })

    setFormData({
      eventDate: '',
      eventTitle: '',
      eventDescription: '',
      eventLink: '',
    })
    setSelectedEvent(null)
  }

  return (
    <>
      <form action="" onSubmit={handleAddEvent}>
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
                name="eventDate"
                onChange={handleInputChange}
              />
              <Input
                fontSize={{ base: '12px', md: '14px' }}
                type="text"
                placeholder="Title"
                name="eventTitle"
                onChange={handleInputChange}
              />
              <Input
                type="url"
                name="eventLink"
                placeholder="Link"
                fontSize={{ base: '12px', md: '14px' }}
                onChange={handleInputChange}
              />
            </SimpleGrid>
          </Box>
          <SimpleGrid
            gridTemplateColumns={{ base: '1fr', md: '2fr 110px' }}
            gap="3"
            mt="3"
          >
            <Textarea
              name="eventDescription"
              placeholder="Write a short description for the event date"
              h={{ base: '80px', md: 'initial' }}
              fontSize={{ base: '12px', md: '14px' }}
              onChange={handleInputChange}
            />
            <Tooltip
              label="Please fill out all required fields and ensure they meet the character limit."
              isOpen={!isValid}
              shouldWrapChildren
              color="gray.600"
              bgColor="white"
              _dark={{ bgColor: 'gray.800', color: 'whiteAplha.700' }}
            >
              <Button type="submit" disabled={!isValid}>
                {selectedEvent ? 'Update' : 'Add'}
              </Button>
            </Tooltip>
          </SimpleGrid>
        </Box>
      </form>
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
                    setFormData({
                      eventDate: new Date(wikiEvent?.date as string)
                        .toISOString()
                        .substr(0, 10),
                      eventTitle: wikiEvent?.title as string,
                      eventDescription: wikiEvent?.description as string,
                      eventLink: wikiEvent.link as string,
                    })
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
                    maxWidth="150px"
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
    </>
  )
}

export default EventsInput
