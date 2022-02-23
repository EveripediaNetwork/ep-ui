import React from 'react'
import { Box, Flex, Avatar, Text } from '@chakra-ui/react'

interface AboutTestimonialsProps {
  testimonial: string
  author: string
  designation: string
  img: string
  location?: string
}

const AboutTestimonial = ({
  testimonial,
  author,
  img,
  designation,
  location,
}: AboutTestimonialsProps) => (
  <Flex
    direction={{ base: 'column', md: 'row' }}
    alignItems={{ base: 'center', md: 'flex-start' }}
    p={8}
    gap={8}
    bgColor="pageBg"
    mx="auto"
    borderRadius="lg"
  >
    <Avatar name={author} src={img} h="150px" w="150px" />
    <Box>
      <Text fontSize="lg">{testimonial}</Text>
      <Text fontSize="lg" fontWeight="bold" mt={4}>
        {author}
      </Text>
      <Flex direction={{ base: 'column', md: 'row' }}>
        <Text color="brand.500">{designation}</Text> {location && '⠀•⠀'}
        <Text>{location}</Text>
      </Flex>
    </Box>
  </Flex>
)

export default AboutTestimonial
