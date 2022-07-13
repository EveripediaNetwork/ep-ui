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
import { RiAccountCircleLine } from 'react-icons/ri'
import { useENSData } from '@/hooks/useENSData'
import config from '@/config'
import { useUserProfileData } from '@/services/profile/utils'

type DisplayAvatarProps = ChakraProps & {
  address?: string | null
  svgProps?: CSSObject
  avatarIPFS?: string | null
  wrapperProps?: HTMLChakraProps<'span'>
  size?: number | string
  mt?: number | string
}
const DisplayAvatar = ({
  address,
  svgProps,
  avatarIPFS,
  wrapperProps,
  size = 26,
  mt = 2,
  ...rest
}: DisplayAvatarProps) => {
  const [avatar, ,] = useENSData(address)
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
      <Avatar
        boxSize={`${size}px`}
        mt="2px"
        src={`${config.pinataBaseUrl}${avatarIPFS || fetchedAvatarIPFS}`}
        {...rest}
      />
    )
  } else if (avatar) {
    content = <Avatar size="xs" src={avatar} {...rest} />
  } else if (address && !avatar) {
    content = (
      <CustomAvatar
        size={size}
        variant="pixel"
        name="Unnamed"
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
        as={RiAccountCircleLine}
        mt={mt}
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
