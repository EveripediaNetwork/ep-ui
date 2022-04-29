import React from 'react'
import { Box, Heading, Text, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const Error = () => {
    const router = useRouter()
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading display="inline-block" as="h2" size="2xl">
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color="gray.500" mb={6}>
        The page you are looking for does not seem to exist
      </Text>

      <Button onClick={() => router.push('/')} size="lg" variant="solid">
        Go to Home
      </Button>
    </Box>
  )
}
export default Error
