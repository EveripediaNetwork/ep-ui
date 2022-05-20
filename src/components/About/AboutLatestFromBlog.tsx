import { blogData } from '@/data/BlogData'
import { SimpleGrid, VStack, Heading } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import BlogCard from './BlogCard'

const AboutLatestFromBlog = () => {
  const { t } = useTranslation()
  return (
    <VStack spacing={8} maxW={{ base: '100%', lg: '70%' }} mx="auto" mt="24">
      <Heading size="lg">{`${t('latestFromBlogHeading')}`}</Heading>
      <SimpleGrid
        columns={[1, 1, 2, 3]}
        spacing={4}
        mt={4}
        w="min(1200px, 90%)"
      >
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
}

export default AboutLatestFromBlog
