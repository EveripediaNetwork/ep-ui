import { NextChakraImageProps } from '@/components/Elements/Image/Image'
import { IconType } from 'react-icons'

export interface ProfileLinksProps {
  twitter: string
  instagram: string
  website: string
  lens: string
  setTwitter: (twitterLink: string) => void
  setWebsite: (websiteLink: string) => void
  setInstagram: (instagramLink: string) => void
  setLens: (lensLink: string) => void
}

export interface ProfileMediaProps {
  avatarIPFSHash: string
  bannerIPFSHash: string
  isAvatarLoading: boolean
  isBannerLoading: boolean
  setAvatarIPFSHash: (avatarIpfs: string) => void
  setIsAvatarLoading: (avatarIsLoading: boolean) => void
  setBannerIPFSHash: (bannerIpfs: string) => void
  setIsBannerLoading: (bannerIsLoading: boolean) => void
}

export type ProfileSubmitButtonProps = {
  isLoading: boolean
  isAvatarLoading: boolean
  isBannerLoading: boolean
}

export interface ImageUploadProps extends NextChakraImageProps {
  defaultImage: string
  setImgIPFSHash: (id: string) => void
  imgIPFSHash: string | null
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export interface SettingNavButtonProps {
  text: string
  Icon: IconType
  tabName: string
  isActive?: boolean
}
