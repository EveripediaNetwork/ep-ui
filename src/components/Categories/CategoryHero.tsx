import React from 'react'
import { Box, Heading, Flex, Text } from '@chakra-ui/react'
import { Image } from '@/components/Elements/Image/Image'

const CategoryHero = ({
  id,
  title,
  description,
}: {
  id: string
  title: string
  description: string
}) => {
  return (
    <Box pos="relative">
      <Image
        priority
        src={`/images/categories/${id}.jpg`}
        height="350px"
        alt={title}
      />
      <Flex
        zIndex="2"
        pos="absolute"
        top="0"
        justifyContent="center"
        alignItems="center"
        left="0"
        h="full"
        w="full"
        direction="column"
      >
        <Heading
          fontSize={{ base: 25, lg: 36, xl: 48 }}
          maxW="80%"
          mx="auto"
          textAlign="center"
          as="h1"
          color="whiteAlpha.900"
        >
          {title}
        </Heading>
        <Flex
          textAlign="center"
          justifyContent="center"
          fontWeight="400"
          maxW={{ base: '90%', md: '70%', lg: '60%' }}
          mx="auto"
          px={1}
        >
          <Text
            my={4}
            mx={{ base: '1', md: '8', lg: '14' }}
            color="whiteAlpha.900"
          >
            {description || ''}
          </Text>
        </Flex>
      </Flex>
      <Flex
        bgColor="black"
        opacity="0.65"
        pos="absolute"
        top="0"
        left="0"
        w="full"
        h="full"
        zIndex="1"
      />
    </Box>
  )
}

export default CategoryHero
