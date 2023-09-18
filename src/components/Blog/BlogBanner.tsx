import { Stack, Text, Button } from '@chakra-ui/react'
import React from 'react'

const BlogBanner = () => {
  return (
    <Stack
      alignItems="center"
      spacing={{ base: 2, md: 4 }}
      px={{ base: 4, md: 14, lg: '24' }}
      py={{ base: '8', xl: 20 }}
      bg="brand.50"
      _dark={{ bg: 'brand.200' }}
      rounded="lg"
    >
      <Text
        fontWeight={'semibold'}
        fontSize={{ xl: '3xl', md: '2xl', base: 'xl' }}
        textAlign="center"
        color={'brand.500'}
      >
        Stay up to date with IQ wiki
      </Text>
      <Text fontSize={{ xl: 'lg', base: 'md' }} textAlign="center">
        Join thousands of others in receiving the most interesting wikis on
        IQ.wiki every week
      </Text>
      <Button
        as="a"
        fontSize={{ base: 'xs', md: 'md', lg: 'inherit' }}
        px={{ base: '8', lg: 10 }}
        href="https://www.getdrip.com/forms/505929689/submissions/new"
        target="_blank"
        w="fit-content"
        maxW="fit-content"
      >
        Join now
      </Button>
    </Stack>
  )
}

export default BlogBanner
