import React from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'

const CareersHero = ({
  title,
  description,
}: {
  title: string
  description?: string
}) => {
  return (
    <Box
      my={-2}
      bgColor="careersBackground"
      minH="300px"
      py="20"
      bgImage="/images/backgrounds/homepage-bg-white.png"
      _dark={{
        bgImage: '/images/backgrounds/careers-background-dark.png',
      }}
      bgSize="cover !important"
    >
      <Flex justifyContent="center" direction="column" mx="auto" maxW="1120px">
        <Heading
          textAlign="center"
          color="careersHeadingColor"
          fontWeight={700}
          fontSize={{ lg: '6xl', md: '4xl', base: '2xl', '2xl': '7xl' }}
          mb={{ base: 6, md: 0 }}
        >
          {title}
        </Heading>
        {description && (
          <Text
            color="careersTextColor"
            textAlign="center"
            mt={{ md: 3 }}
            fontSize={{ '2xl': '2xl', md: 'xl', base: 'md' }}
            px={{ base: '3', md: 0 }}
          >
            {description}
          </Text>
        )}
      </Flex>
    </Box>
  )
}

export default CareersHero
