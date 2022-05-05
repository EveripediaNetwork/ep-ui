import { SimpleGrid, VStack, Heading, Box } from '@chakra-ui/react'
import React from 'react'

const AboutLatestFromBlog = () => (
  <VStack spacing={8} maxW="7xl" mx="auto" mt="24">
    <Heading size="lg">Latest from our blog</Heading>
    <SimpleGrid columns={[1, 1, 2, 3]} spacing={4} mt={4} w="min(1200px, 90%)">
      <Box
        h="250px"
        w="100%"
        bgColor={`hsl(${Math.floor(Math.random() * 360)}, 10%, 80%)`}
      />
      <Box
        h="250px"
        w="100%"
        bgColor={`hsl(${Math.floor(Math.random() * 360)}, 10%, 80%)`}
      />
      <Box
        h="250px"
        w="100%"
        bgColor={`hsl(${Math.floor(Math.random() * 360)}, 10%, 80%)`}
      />
    </SimpleGrid>
  </VStack>
)

export default AboutLatestFromBlog
