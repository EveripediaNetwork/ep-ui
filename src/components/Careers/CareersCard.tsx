import React from 'react'
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { CareersDatatype } from '@/data/CareersData'

const CareerCard = ({
  title,
  description,
  location,
  link,
}: CareersDatatype) => {
  return (
    <Box
      boxShadow="md"
      borderRadius="16px"
      border="1px solid"
      borderColor="careersCardBorder"
      p="6"
    >
      <Heading
        color="brandLinkColor"
        fontWeight={700}
        fontSize={{ base: '24px', lg: '36px' }}
      >
        {title}
      </Heading>
      <Text
        mt={{ base: '2', md: '3' }}
        color="careersTextColor"
        fontWeight={600}
        fontSize={{ base: '16px', lg: '18px' }}
      >
        {location}
      </Text>
      <Text
        mt={{ base: '3', md: '4' }}
        color="careersTextColor"
        fontWeight={500}
        fontSize={{ base: '16px', lg: '18px' }}
      >
        {description}
      </Text>
      <Flex mt={{ base: '4', md: '6' }} justifyContent="flex-end">
        <Button as="a" href={link} target="_blank" size="lg" variant="solid">
          Apply now
        </Button>
      </Flex>
    </Box>
  )
}

export default CareerCard
