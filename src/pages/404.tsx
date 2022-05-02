import React from 'react'
import {
  Container,
  Stack,
  Box,
  Heading,
  Text,
  Button,
  Image,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

const Error = () => {
  const router = useRouter()
  return (
    <Container maxW="6xl">
      <Stack
        align="center"
        spacing={{ base: 8, md: 20 }}
        direction={{ base: 'column-reverse', lg: 'row' }}
      >
        <Stack
          mb="20"
          flex={1}
          maxW={{ base: 'md', md: 'xl' }}
          align={{ base: 'center', lg: 'flex-start' }}
          spacing={{ base: 5, md: 8 }}
        >
          <Heading
            display="inline-block"
            fontWeight="bold"
            fontSize={{ base: 'xl', md: '4xl' }}
          >
            OPPS! LOST IN SPACE?
          </Heading>
          <Text
            textAlign={{ base: 'center', lg: 'left' }}
            fontSize={{ base: 'md', md: '2xl', lg: 'xl' }}
          >
            Seems like you’ve landed in the wrong space. Don’t worry, We’ve got
            you. Let’s take you back to where it’s safe.
          </Text>
          <Button onClick={() => router.push('/')} variant="solid">
            Take me back Home
          </Button>
        </Stack>
        <Box
          position="relative"
          flex="1"
          py={{ base: 16, md: 20 }}
          px={{ base: 10, lg: 2 }}
        >
          <Image alt="Astronaut" src="/images/astronaut.svg" h="90%" w="90%" />
        </Box>
      </Stack>
    </Container>
  )
}

export default Error
