import { BLOG_POSTS } from '@/components/Blog/data'
import { chakra, Heading, SimpleGrid } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BlogPost } from '@/components/Blog/BlogPost'

export const Blog = () => {
  const [mounted, setMounted] = useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <chakra.div bgColor="pageBg" my={-8} py={8}>
      <chakra.div w="min(90%, 1100px)" mx="auto" my={{ base: '10', lg: '16' }}>
        <Heading mt={8} mb={4} as="h1" size="2xl" letterSpacing="wide">
          Everipedia Blog
        </Heading>
        <SimpleGrid
          mt={{ base: '15', md: '16' }}
          columns={{ base: 1, md: 2, lg: 3 }}
          spacingX="5"
          spacingY="14"
        >
          {BLOG_POSTS.map((post, i) => (
            <BlogPost post={post} key={i} />
          ))}
        </SimpleGrid>
      </chakra.div>
    </chakra.div>
  )
}

export default Blog
