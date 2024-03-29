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
    bgColor="aboutFeaturesCardBg"
    border="1px solid"
    borderColor="aboutFeaturesCardBorder"
    p={8}
    rounded="md"
  >
    <Icon as={icon} mb={4} w="40px" h="40px" />
    <Heading fontWeight={700} fontSize={{ base: '18px', lg: '20px' }} mb={4}>
      {title}
    </Heading>
    <Text fontWeight={500} fontSize={{ base: '14px', md: '16px', lg: '18px' }}>
      {content}
    </Text>
  </Box>
)

export default AboutFeaturesCard
