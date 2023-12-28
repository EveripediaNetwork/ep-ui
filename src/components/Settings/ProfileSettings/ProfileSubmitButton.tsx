import React from 'react'
import { Button } from '@chakra-ui/react'
import { ProfileSubmitButtonProps } from '@/types/SettingsType'
import { useTranslation } from 'next-i18next'

export const ProfileSubmitButton = ({
  isLoading,
  isAvatarLoading,
  isBannerLoading,
}: ProfileSubmitButtonProps) => {
  const { t } = useTranslation('settings')
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
      {t('settingSave')}
    </Button>
  )
}
