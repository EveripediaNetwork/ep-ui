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
import { useTranslation } from 'next-i18next'

export const ProfileWalletInfo = ({
  userAddress,
}: {
  userAddress?: string
}) => {
  const toast = useToast()
  const clipboard = useClipboard(userAddress || '')
  const { t } = useTranslation('settings')

  return (
    <FormControl>
      <FormLabel htmlFor="username">{t('settingWalletAddress')}</FormLabel>
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
