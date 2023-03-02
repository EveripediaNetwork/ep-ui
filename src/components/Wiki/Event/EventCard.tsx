import React from 'react'
import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { Link } from '@/components/Elements'
import { RiLink } from 'react-icons/ri'

const EventCard = ({
  title,
  eventDate,
  description,
  link,
}: {
  title: string
  eventDate: string
  description: string
  link: string
}) => {
  const date = new Date(eventDate)
  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <Box bgColor="cardBg" borderRadius="16px" p="5" pb="8" minH="270px">
      <Heading fontSize="32px">{title}</Heading>
      <Text mt="1" fontSize="18px" color="homeDescriptionColor">
        {formattedDate}
      </Text>
      <Text mt="2" color="homeDescriptionColor">
        {description}
      </Text>
      {link && (
        <Flex gap="4" alignItems="center">
          <Icon as={RiLink} color="brandLinkColor" />
          <Link href={link} target="_blank" color="brandLinkColor" />
        </Flex>
      )}
    </Box>
  )
}

export default EventCard
