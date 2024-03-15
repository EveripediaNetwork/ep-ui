import React from 'react'
import { Button, Stack, Text } from '@chakra-ui/react'
import { logEvent } from '@/utils/googleAnalytics'

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
  const buttonHandler = () => {
    logEvent({
      action: 'SUBSCRIBE_BUTTON',
      label: buttonTitle,
      category: 'newsletter',
      value: 1,
    })
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
      >
        {buttonTitle}
      </Button>
    </Stack>
  )
}

export default Newsletter
