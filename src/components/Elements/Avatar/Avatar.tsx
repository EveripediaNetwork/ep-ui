import React from 'react'
import CustomAvatar from 'boring-avatars'
import {
  Avatar,
  chakra,
  ChakraProps,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { RiAccountCircleLine } from 'react-icons/ri'
import { AccountDataType } from '@/types/AccountDataType'
import { AvatarColorArray } from '@/data/AvatarData'

type DisplayAvatarProps = ChakraProps & {
  accountData: AccountDataType
}
const DisplayAvatar = ({ accountData, ...rest }: DisplayAvatarProps) => {
  const color = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.800', 'gray.400')
  let content = null
  if (accountData) {
    if (accountData.ens?.avatar) {
      content = <Avatar size="xs" src={accountData.ens.avatar} {...rest} />
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
  } else {
    content = (
      <Icon
        cursor="pointer"
        fontSize="3xl"
        color={color}
        fontWeight={600}
        as={RiAccountCircleLine}
        mt={2}
        _hover={{
          textDecoration: 'none',
          color: linkHoverColor,
        }}
      />
    )
  }

  return (
    <chakra.span
      zIndex="popover"
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
