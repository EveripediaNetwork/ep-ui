import React, { FormEvent, useEffect, useState } from 'react'
import {
  Box,
  VStack,
  Text,
  Heading,
  Checkbox,
  Button,
  useToast,
} from '@chakra-ui/react'

const AdvancedSettings = () => {
  const [isSigningOptionRelayer, setIsSigningOptionRelayer] =
    useState<boolean>(true)

  const toast = useToast()

  useEffect(() => {
    const getSettingsFromLocalStorage = async () => {
      if (typeof window !== 'undefined') {
        // getting the settings from local storage
        const storedIsSigningOptionRelayer: string | null =
          localStorage.getItem('IS_SIGNING_OPTION_RELAYER')

        // setting the state with the values from local storage
        if (storedIsSigningOptionRelayer) {
          const parsedIsSigningOptionRelayer: boolean = JSON.parse(
            storedIsSigningOptionRelayer,
          )
          setIsSigningOptionRelayer(parsedIsSigningOptionRelayer)
        }
      }
    }
    getSettingsFromLocalStorage()
  }, [])

  const handleAdvancedSettingsSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // saving the settings to local storage
    if (typeof window !== 'undefined')
      window.localStorage.setItem(
        'IS_SIGNING_OPTION_RELAYER',
        isSigningOptionRelayer.toString(),
      )

    toast({
      title: 'Settings saved!',
      status: 'success',
      duration: 1000,
    })
  }

  return (
    <>
      <form onSubmit={handleAdvancedSettingsSave}>
        <VStack maxW="3xl" align="left" borderWidth="1px" borderRadius="md">
          <Box p={4} borderBottomWidth={0}>
            <Checkbox
              name="isSigningOptionRelayer"
              colorScheme="pink"
              isChecked={isSigningOptionRelayer}
              size="lg"
              onChange={e => setIsSigningOptionRelayer(e.target.checked)}
            >
              <VStack align="left" spacing={2} ml={4}>
                <Heading fontSize="md">Sign Edits with Relayer</Heading>
                <Text opacity={0.8} fontSize="md">
                  By default your edits will be signed with relayer. If you want
                  to sign edits with your own wallet, uncheck this option.
                </Text>
              </VStack>
            </Checkbox>
          </Box>
        </VStack>
        <Button type="submit" mt={8} size="lg">
          Save
        </Button>
      </form>
    </>
  )
}
export default AdvancedSettings
