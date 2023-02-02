import React from 'react'
import { Box, Heading, Text, Icon } from '@chakra-ui/react'
import { IconType } from 'react-icons/lib'

interface AboutFeaturesCardProps {
  title: string
  content: string
  icon: IconType
}

const AboutFeaturesCard = ({
  title,
  content,
  icon,
}: AboutFeaturesCardProps) => (
  <Box
    bgColor="gray.100"
    _dark={{
      bgColor: 'gray.700',
    }}
    p={8}
    rounded="md"
  >
    <Icon as={icon} mb={4} w="40px" h="40px" />
    <Heading as="h3" size="md" mb={4}>
      {title}
    </Heading>
    <Text>{content}</Text>
  </Box>
)

export default AboutFeaturesCard
