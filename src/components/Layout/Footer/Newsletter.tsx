import React from 'react'
import { Button, Stack, Text } from '@chakra-ui/react'
import { usePostHog } from 'posthog-js/react'

const Newsletter = ({
  header,
  body,
  url,
  buttonTitle,
  ...rest
}: {
  header: string
  body: string
  url: string
  buttonTitle: string
}) => {
  const posthog = usePostHog()

  const buttonHandler = () => {
    posthog.capture('newsletter_subscribe_click', { label: buttonTitle })
  }
  return (
    <Stack
      justifyContent={'space-between'}
      align={{ base: 'center', lg: 'flex-start' }}
      spacing={4}
    >
      <Text fontSize="xl" fontWeight="bold" py={2}>
        {header}
      </Text>
      <Text
        align={{ base: 'center', lg: 'start' }}
        maxW={{ base: '600px', '2xl': '500px' }}
      >
        {body}
      </Text>
      <Button
        as="a"
        href={url}
        target="_blank"
        size="lg"
        variant="solid"
        {...rest}
        onClick={buttonHandler}
        _hover={{ bg: 'gray.200' }}
      >
        {buttonTitle}
      </Button>
    </Stack>
  )
}

export default Newsletter
