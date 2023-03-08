import React from 'react'
import { Button } from '@chakra-ui/react'

export const ProfileSubmitButton = ({
  isLoading,
  isAvatarLoading,
  isBannerLoading,
}: {
  isLoading: boolean
  isAvatarLoading: boolean
  isBannerLoading: boolean
}) => {
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
    >
      Save
    </Button>
  )
}
