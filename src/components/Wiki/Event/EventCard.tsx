import React from 'react'
import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { Link } from '@/components/Elements'
import { RiArrowRightUpLine, RiLink } from 'react-icons/ri'

const EventCard = ({
  title,
  eventDate,
  description,
  link,
}: {
  title?: string
  eventDate: string
  description?: string
  link?: string
}) => {
  const date = new Date(eventDate)
  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <Flex pos="relative" zIndex={2} gap="6">
      <Flex
        w="24px"
        h="24px"
        borderRadius="50%"
        bgColor="brandLinkColor"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
      >
        <Icon color="white" as={RiArrowRightUpLine} />
      </Flex>
      <Box
        bgColor="cardBg"
        flexGrow="1"
        flexBasis="100%"
        borderRadius="16px"
        p="5"
        pb="8"
      >
        <Heading fontSize="32px">{title}</Heading>
        <Text mt="1.5" fontSize="18px" color="eventTextColor">
          {formattedDate}
        </Text>
        <Text mt="2" color="eventTextColor">
          {description}
        </Text>
        {link && (
          <Flex gap="2" alignItems="center" mt="4">
            <Icon as={RiLink} color="brandLinkColor" />
            <Link href={link} target="_blank" color="brandLinkColor">
              {link}
            </Link>
          </Flex>
        )}
      </Box>
    </Flex>
  )
}

export default EventCard
