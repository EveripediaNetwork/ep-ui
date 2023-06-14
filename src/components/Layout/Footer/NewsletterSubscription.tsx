import React from 'react'
import { Box, Button, HStack, Input, Stack, Text } from '@chakra-ui/react'

const NewsletterSubscription = () => {
  const formRef = React.useRef<HTMLFormElement>(null)

  const handleNewsletterSubscription = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = new FormData(e.target as HTMLFormElement)
    const email = data.get('newsletter-email')

    if (!email) {
      return
    }

    formRef.current?.reset()
  }

  return (
    <Stack align={{ base: 'center', lg: 'flex-start' }} spacing={6}>
      <Text mb={0} fontSize="xl" fontWeight="bold">
        Suscribe to our newsletter
      </Text>
      <Text align={{ base: 'center', lg: 'start' }} maxW="600px">
        Never miss any of the most popular and trending articles on IQ.Social
        when you sign up to our email newsletter.
      </Text>
      <form
        onSubmit={handleNewsletterSubscription}
        ref={formRef}
        style={{ width: '100%' }}
      >
        <Box
          p={2}
          rounded="md"
          bg="#ffffff"
          w={{ base: '100%', md: '80%' }}
          mx={{ md: 'auto', lg: 'initial' }}
        >
          <HStack>
            <Input
              name="newsletter-email"
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
            <Button variant="solid" type="submit">
              Submit
            </Button>
          </HStack>
        </Box>
      </form>
    </Stack>
  )
}

export default NewsletterSubscription
