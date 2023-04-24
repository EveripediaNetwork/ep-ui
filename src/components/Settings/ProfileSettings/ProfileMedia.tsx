import React from 'react'
import { FormControl, FormLabel, VStack } from '@chakra-ui/react'
import ImageUpload from '../ImageUpload'

interface ProfileMediaProps {
  avatarIPFSHash: string
  bannerIPFSHash: string
  isAvatarLoading: boolean
  isBannerLoading: boolean
  setAvatarIPFSHash: (avatarIpfs: string) => void
  setIsAvatarLoading: (avatarIsLoading: boolean) => void
  setBannerIPFSHash: (bannerIpfs: string) => void
  setIsBannerLoading: (bannerIsLoading: boolean) => void
}

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
  return (
    <>
      <VStack flex="1" align={{ base: 'center', lg: 'left' }} spacing={8}>
        <FormControl w={{ base: 'auto', md: '100%' }}>
          <FormLabel htmlFor="profile-image">Profile Image</FormLabel>
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
          <FormLabel htmlFor="profile-banner">Profile Banner</FormLabel>
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
