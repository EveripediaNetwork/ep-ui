import React, { useEffect } from 'react'
import CustomAvatar from 'boring-avatars'
import {
  Avatar,
  Center,
  ChakraProps,
  CSSObject,
  HTMLChakraProps,
  Icon,
} from '@chakra-ui/react'
import { AvatarColorArray } from '@/data/AvatarData'
import { RiUserLine } from 'react-icons/ri'
import { useENSData } from '@/hooks/useENSData'
import config from '@/config'
import { useUserProfileData } from '@/services/profile/utils'
import { Image, NextChakraImageProps } from '../Image/Image'

type DisplayAvatarProps = ChakraProps & {
  address?: string | null
  svgProps?: CSSObject
  avatarIPFS?: string | null
  wrapperProps?: HTMLChakraProps<'span'>
  size?: number | string
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
    undefined,
    {
      onlyAvatar: true,
    },
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
        imgH={`${size}px`}
        imgW={`${size}px`}
        src={`${config.pinataBaseUrl}${avatarIPFS || fetchedAvatarIPFS}`}
        borderRadius="full"
        alt={alt}
        {...(rest as Omit<NextChakraImageProps, 'src'>)}
      />
    )
  } else if (avatar) {
    content = <Avatar boxSize={`${size}px`} src={avatar} name={alt} {...rest} />
  } else if (address && !avatar) {
    content = (
      <CustomAvatar
        size={size}
        variant="pixel"
        name={address}
        colors={AvatarColorArray}
      />
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
      borderRadius="full"
    >
      {content}
    </Center>
  )
}

export default DisplayAvatar
