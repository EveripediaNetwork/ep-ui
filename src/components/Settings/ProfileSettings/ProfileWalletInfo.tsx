import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useClipboard,
  useToast,
} from '@chakra-ui/react'
import { FaCopy } from 'react-icons/fa'

export const ProfileWalletInfo = ({
  userAddress,
}: {
  userAddress?: string
}) => {
  const toast = useToast()
  const clipboard = useClipboard(userAddress || '')

  return (
    <FormControl>
      <FormLabel htmlFor="username">Wallet Address</FormLabel>
      <InputGroup>
        <Input
          cursor="pointer"
          readOnly
          _focus={{ outline: 'none' }}
          value={userAddress}
          onClick={() => {
            clipboard.onCopy()
            toast({
              title: 'Copied!',
              status: 'success',
              duration: 1000,
            })
          }}
        />
        <InputRightElement pointerEvents="none">
          <FaCopy color="gray" />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  )
}
