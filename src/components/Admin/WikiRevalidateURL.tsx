import { useRevalidateURLMutation } from '@/services/admin'
import { isValidUrl } from '@/utils/textUtils'
import { Button, Flex, FormControl, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'

export const WikiRevalidateURL = () => {
  const [revalidateURL] = useRevalidateURLMutation()
  const [revalidateActive, setRevalidateActive] = useState<boolean>(true)
  const [revalidateURLText, setRevalidateURLText] = useState<string>('')
  const toast = useToast()
  const revalidateURLFunc = async () => {
    const data = await revalidateURL(revalidateURLText)
    if (Object.keys(data)[0] === 'error') {
      toast({
        title: 'Failed Revalidation',
        description: 'Check URL and try again',
        status: 'error',
        duration: 2000,
      })
    } else {
      toast({
        title: 'Revalidation Successful',
        description: `You have Successfully revalidated: ${revalidateURLText}`,
        status: 'success',
        duration: 4000,
      })
    }
  }

  const handleManualValidation = (url: string) => {
    const rex = new RegExp(`${window.location.origin}`)
    const path = new URL(url).pathname
    const pathOrigin = new URL(url).origin
    if (url.length >= 1 && isValidUrl(url) && rex.test(`${pathOrigin}/%22`)) {
      setRevalidateActive(false)
      setRevalidateURLText(path)
    } else {
      setRevalidateActive(true)
    }
  }
  return (
    <FormControl isRequired>
      <Flex>
        <Input
          onChange={(e) => {
            handleManualValidation(e.target.value)
          }}
          placeholder="Enter URL"
          borderLeftRadius="md"
          borderRightRadius="none"
        />
        <Button
          disabled={revalidateActive}
          onClick={() => {
            revalidateURLFunc()
          }}
          borderLeftRadius="none"
          borderRightRadius="md"
        >
          Revalidate Url
        </Button>
      </Flex>
    </FormControl>
  )
}
