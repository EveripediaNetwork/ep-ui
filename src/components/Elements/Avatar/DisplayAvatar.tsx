import React, { useEffect } from 'react'
import CustomAvatar from 'boring-avatars'
import {
  Avatar,
  Box,
  Center,
  ChakraProps,
  HTMLChakraProps,
  Icon,
  SystemStyleObject,
} from '@chakra-ui/react'
import { AvatarColorArray } from '@/data/AvatarData'
import { RiUserLine } from 'react-icons/ri'
import { useENSData } from '@/hooks/useENSData'
import config from '@/config'
import {
  UserProfileFetchOptions,
  useUserProfileData,
} from '@/services/profile/utils'
import { Image, NextChakraImageProps } from '../Image/Image'

type DisplayAvatarProps = ChakraProps & {
  address?: string | null
  svgProps?: SystemStyleObject
  avatarIPFS?: string | null
  wrapperProps?: HTMLChakraProps<'span'>
  size?: number
  alt: string | undefined
}
const DisplayAvatar = ({
  address,
  svgProps,
  avatarIPFS,
  wrapperProps,
  size = 26,
  alt,
  ...rest
}: DisplayAvatarProps) => {
  const [avatar] = useENSData(address)

  const { avatar: fetchedAvatarIPFS, setAccount } = useUserProfileData(
    UserProfileFetchOptions.ONLY_AVATAR,
  )
  let content = null

  useEffect(() => {
    if (address && !avatarIPFS) {
      setAccount(address)
    }
  }, [address, avatarIPFS, setAccount])

  if (avatarIPFS || fetchedAvatarIPFS) {
    content = (
      <Image
        imgBoxSize={size}
        src={`${config.pinataBaseUrl}${avatarIPFS || fetchedAvatarIPFS}`}
        borderRadius="full"
        {...(rest as Omit<NextChakraImageProps, 'src'>)}
        alt={alt || 'Avatar'}
        rounded="50%"
      />
    )
  } else if (avatar) {
    content = (
      <Avatar
        boxSize={`${size}px`}
        src={avatar}
        name={alt}
        {...rest}
        rounded="50%"
      />
    )
  } else if (address && !avatar) {
    content = (
      <Box w={`${size}px`} h={`${size}px`} rounded="full" overflow="hidden">
        <CustomAvatar
          size={size}
          variant="pixel"
          name={address}
          colors={AvatarColorArray}
        />
      </Box>
    )
  } else {
    content = (
      <Icon
        cursor="pointer"
        fontSize={size}
        color="gray.600"
        _dark={{ color: 'gray.200' }}
        fontWeight={600}
        as={RiUserLine}
        title={alt}
        rounded="50%"
      />
    )
  }

  return (
    <Center
      {...wrapperProps}
      sx={{
        svg: {
          ...svgProps,
        },
      }}
    >
      {content}
    </Center>
  )
}

export default DisplayAvatar
