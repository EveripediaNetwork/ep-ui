import React from 'react'
import CustomAvatar from 'boring-avatars'
import { Avatar, chakra, ChakraProps } from '@chakra-ui/react'
import { AvatarColorArray } from '@/data/AvatarData'

type DisplayAvatarProps = ChakraProps & {
  avatar?: string | null
}
const DisplayAvatar = ({ avatar, ...rest }: DisplayAvatarProps) => {
  let content = null
  if (avatar) {
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
