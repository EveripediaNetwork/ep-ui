import React, { useState } from 'react'
import { Button, Center, Flex, Icon, Text } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { FiCalendar } from 'react-icons/fi'
import { RiCloseLine } from 'react-icons/ri'
import { BaseEvents, EventType } from '@everipedia/iq-utils'

export const EventsList = ({
  handleFormChange,
}: {
  handleFormChange: (e: Exclude<BaseEvents, 'type'>) => void
}) => {
  const wiki = useAppSelector(state => state.wiki)
  const dispatch = useAppDispatch()
  const [feedbackMessage, setFeedbackMessage] = useState<string>('')
  const dateFoundedEvent =
    wiki.events && wiki.events.find(event => event.type === EventType.CREATED)

  const removeEventHandler = (date: string) => {
    if (
      wiki.events &&
      wiki.events.length > 1 &&
      date === dateFoundedEvent?.date
    ) {
      setFeedbackMessage('The Date Founded cannot be removed.')
      return
    }

    setFeedbackMessage('')

    dispatch({
      type: 'wiki/removeEvent',
      payload: {
        date,
      },
    })
  }

  if (!wiki.events?.length) return <></>

  return (
    <>
      <Flex
        border="1px solid"
        borderRadius="6px"
        py="3"
        px="2.5"
        gap="2.5"
        flexWrap="wrap"
        borderColor="gray.200"
        _dark={{
          borderColor: 'whiteAlpha.200',
        }}
      >
        {wiki.events?.map(wikiEvent => (
          <Flex
            key={wikiEvent.date}
            gap="2"
            alignItems="center"
            borderRadius="md"
            bg="gray.200"
            pl="2"
            _dark={{
              bg: 'whiteAlpha.200',
            }}
          >
            <Flex alignItems="center" gap="1" flexShrink={0}>
              <Icon as={FiCalendar} w="16px" h="16px" />
              {wikiEvent.type === EventType.CREATED && (
                <Text
                  fontSize="8px"
                  color="gray.800"
                  pt="1px"
                  _dark={{ color: 'whiteAlpha.900' }}
                >
                  Created
                </Text>
              )}
            </Flex>
            <Button
              onClick={() => {
                handleFormChange(wikiEvent)
              }}
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
                _hover={{
                  bg: 'red.500',
                }}
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
      {feedbackMessage && (
        <Text color="red.500" fontSize="sm" mt="2">
          {feedbackMessage}
        </Text>
      )}
    </>
  )
}
