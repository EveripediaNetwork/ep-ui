import React from 'react'
import { FormControl, FormLabel, VStack } from '@chakra-ui/react'
import ImageUpload from '../ImageUpload'
import { ProfileMediaProps } from '@/types/SettingsType'
import { useTranslation } from 'next-i18next'

export const ProfileMedia = ({
  setAvatarIPFSHash,
  avatarIPFSHash,
  isAvatarLoading,
  setIsAvatarLoading,
  bannerIPFSHash,
  isBannerLoading,
  setBannerIPFSHash,
  setIsBannerLoading,
}: ProfileMediaProps) => {
  const { t } = useTranslation('settings')
  return (
    <>
      <VStack flex="1" align={{ base: 'center', lg: 'left' }} spacing={8}>
        <FormControl w={{ base: 'auto', md: '100%' }}>
          <FormLabel
            htmlFor="profile-image"
            textAlign={{ base: 'center', md: 'left' }}
          >
            {t('settingProfileImage')}
          </FormLabel>
          <ImageUpload
            defaultImage="/images/defaults/default-user-avatar.png"
            w="140px"
            h="140px"
            rounded="full"
            alt="new profile"
            setImgIPFSHash={setAvatarIPFSHash}
            imgIPFSHash={avatarIPFSHash}
            isLoading={isAvatarLoading}
            setIsLoading={setIsAvatarLoading}
          />
        </FormControl>
        <FormControl w={{ base: 'auto', md: '100%' }}>
          <FormLabel
            htmlFor="profile-banner"
            textAlign={{ base: 'center', md: 'left' }}
          >
            {t('settingProfileBanner')}
          </FormLabel>
          <ImageUpload
            defaultImage="/images/defaults/default-user-avatar.png"
            w="300px"
            h="120px"
            borderRadius="lg"
            alt="new banner"
            setImgIPFSHash={setBannerIPFSHash}
            imgIPFSHash={bannerIPFSHash}
            isLoading={isBannerLoading}
            setIsLoading={setIsBannerLoading}
          />
        </FormControl>
      </VStack>
    </>
  )
}
