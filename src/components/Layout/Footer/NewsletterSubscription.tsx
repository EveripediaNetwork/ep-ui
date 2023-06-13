import React from 'react'
import { Box, Button, HStack, Input, Stack, Text } from '@chakra-ui/react'

const NewsletterSubscription = () => {
  return (
    <Stack align={{ base: 'center', lg: 'flex-start' }} spacing={6}>
      <Text mb={0} fontSize="xl" fontWeight="bold">
        Suscribe to our newsletter
      </Text>
      <Text align={{ base: 'center', lg: 'start' }} maxW="600px">
        Never miss any of the most popular and trending articles on IQ.Social
        when you sign up to our email newsletter.
      </Text>
      <Box p={2} rounded="md" bg="#ffffff" w="80%">
        <HStack>
          <Input
            variant={'solid'}
            borderWidth={1}
            color={'gray.800'}
            _placeholder={{
              color: 'gray.700',
            }}
            border="none"
            required
            placeholder="Enter your email"
            bg="#ffffff"
          />
          <Button variant="solid">Submit</Button>
        </HStack>
      </Box>
    </Stack>
  )
}

export default NewsletterSubscription
