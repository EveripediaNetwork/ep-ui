import React from 'react'
import CustomAvatar from 'boring-avatars'
import { Avatar, chakra, ChakraProps, Icon } from '@chakra-ui/react'
import { AvatarColorArray } from '@/data/AvatarData'
import { RiAccountCircleLine } from 'react-icons/ri'
import { useENSData } from '@/hooks/useENSData'

type DisplayAvatarProps = ChakraProps & {
  address?: string | null
}
const DisplayAvatar = ({ address, ...rest }: DisplayAvatarProps) => {
  const [avatar, ,] = useENSData(address)
  let content = null
  if (avatar) {
    content = <Avatar size="xs" src={avatar} {...rest} />
  } else if (address && !avatar) {
    content = (
      <CustomAvatar
        size={25}
        variant="pixel"
        name="Unnamed"
        colors={AvatarColorArray}
      />
    )
  } else {
    content = (
      <Icon
        cursor="pointer"
        fontSize="3xl"
        color="gray.600"
        _dark={{ color: 'gray.200' }}
        fontWeight={600}
        as={RiAccountCircleLine}
        mt={2}
      />
    )
  }

  return <chakra.span zIndex="banner">{content}</chakra.span>
}

export default DisplayAvatar
