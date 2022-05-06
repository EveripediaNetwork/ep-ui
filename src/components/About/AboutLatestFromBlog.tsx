import { blogData } from '@/data/BlogData'
import { SimpleGrid, VStack, Heading } from '@chakra-ui/react'
import React from 'react'
import BlogCard from './BlogCard'

const AboutLatestFromBlog = () => (
  <VStack spacing={8} maxW="7xl" mx="auto" mt="24">
    <Heading size="lg">Latest from our blog</Heading>
    <SimpleGrid columns={[1, 1, 2, 3]} spacing={4} mt={4} w="min(1200px, 90%)">
      {blogData.map(data => (
        <BlogCard
          title={data.title}
          body={data.body}
          image={data.image}
          date={data.date}
        />
      ))}
    </SimpleGrid>
  </VStack>
)

export default AboutLatestFromBlog
