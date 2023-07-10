import React from 'react'
import { Button } from '@chakra-ui/react'
import { ProfileSubmitButtonProps } from '@/types/SettingsType'

export const ProfileSubmitButton = ({
  isLoading,
  isAvatarLoading,
  isBannerLoading,
}: ProfileSubmitButtonProps) => {
  return (
    <Button
      isLoading={isLoading}
      disabled={isLoading || isAvatarLoading || isBannerLoading}
      loadingText="Submitting"
      type="submit"
      _disabled={{
        backgroundColor: 'gray.300',
        cursor: 'not-allowed',
        _hover: {
          backgroundColor: 'gray.400 !important',
        },
      }}
      size="lg"
      mt={8}
      w={{ base: '100%', md: '200px' }}
    >
      Save
    </Button>
  )
}
