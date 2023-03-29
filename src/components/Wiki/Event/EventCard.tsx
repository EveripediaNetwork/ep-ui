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
    <Flex pos="relative" zIndex={2} gap={{ base: '4', xl: '6' }}>
      <Flex
        w={{ base: '20px', md: '24px' }}
        h={{ base: '20px', md: '24px' }}
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
      >
        <Heading fontSize={{ base: '14px', xl: '24px' }}>{title}</Heading>
        <Text
          mt={{ base: 0.5, md: '1.5' }}
          fontSize={{ base: '12px', xl: '18px' }}
          color="eventTextColor"
        >
          {formattedDate}
        </Text>
        <Text
          mt={{ base: 1, md: '2' }}
          color="eventTextColor"
          fontSize={{ base: '12px', xl: '16px' }}
        >
          {description}
        </Text>
        {link && (
          <Flex
            gap="2"
            alignItems="center"
            mt="4"
            fontSize={{ base: '12px', xl: '16px' }}
          >
            <Icon as={RiLink} color="brandLinkColor" />
            <Link
              noOfLines={1}
              maxW="70vw"
              overflow="hidden"
              textOverflow="ellipsis"
              href={link}
              target="_blank"
              color="brandLinkColor"
            >
              {link}
            </Link>
          </Flex>
        )}
      </Box>
    </Flex>
  )
}

export default EventCard
