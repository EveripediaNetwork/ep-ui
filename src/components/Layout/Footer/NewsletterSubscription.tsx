import React from 'react'
import { Button, Stack, Text } from '@chakra-ui/react'

const NewsletterSubscription = () => {
  return (
    <Stack align={{ base: 'center', lg: 'flex-start' }} spacing={6}>
      <Text mb={0} fontSize="xl" fontWeight="bold">
        Subscribe to our newsletter
      </Text>
      <Text align={{ base: 'center', lg: 'start' }} maxW="600px">
        Never miss any of the most popular and trending articles on IQ.Social
        when you sign up to our email newsletter.
      </Text>
      <Button
        as="a"
        href="https://www.getdrip.com/forms/505929689/submissions/new"
        target="_blank"
        size="lg"
        variant="solid"
        bg="#fff"
        color="gray.800"
        _hover={{ bg: '#fff', color: 'gray.800' }}
      >
        Subscribe
      </Button>
    </Stack>
  )
}

export default NewsletterSubscription
