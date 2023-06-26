import React from 'react'
import { Button, Stack, Text } from '@chakra-ui/react'

const Newsletter = ({header, body, url, buttonTitle,  ...rest}: {header: string, body: string, url: string, buttonTitle: string}) => {

  return (
    <Stack align={{ base: 'center', lg: 'flex-start' }} spacing={4}>
      <Text fontSize="xl" fontWeight="bold" py={2}>
        {header}
      </Text>
      <Text align={{ base: 'center', lg: 'start' }} maxW="600px">
        {body}
      </Text>
      <Button
        as="a"
        href={url}
        target="_blank"
        size="lg"
        variant="solid"
        {...rest}
      >
        {buttonTitle}
      </Button>
    </Stack>
  )
}

export default Newsletter
