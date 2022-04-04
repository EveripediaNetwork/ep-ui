import React from 'react'
import CustomAvatar from 'boring-avatars'
import { Avatar, chakra, ChakraProps } from '@chakra-ui/react'
import { AvatarColorArray } from '@/data/AvatarData'
import { useENSData } from '@/hooks/useENSData'

type DisplayAvatarProps = ChakraProps & {
  address?: string | null
}
const DisplayAvatar = ({ address, ...rest }: DisplayAvatarProps) => {
  const [avatar, ,] = useENSData(address)

  let content = null
  if (address && avatar) {
    content = <Avatar size="xs" src={avatar} {...rest} />
  } else {
    content = (
      <CustomAvatar
        size={25}
        variant="pixel"
        name="Unnamed"
        colors={AvatarColorArray}
      />
    )
  }

  return (
    <chakra.span
      zIndex="banner"
      sx={{
        svg: {
          ...rest,
        },
      }}
    >
      {content}
    </chakra.span>
  )
}

export default DisplayAvatar
