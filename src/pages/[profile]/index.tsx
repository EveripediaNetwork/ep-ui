import { Image } from '@/components/Elements/Image/Image'
import { Collections } from '@/pages/[profile]/Collections'
import UserInfo from '@/pages/[profile]/UserInfo'
import { Flex } from '@chakra-ui/react'
import { NextPage } from 'next'
import React from 'react'

const Profile: NextPage = () => (
  <Flex direction="column" align="center" pb="60" pos="relative">
    <Image
      width="full"
      height="56"
      objectFit="cover"
      src="https://lh3.googleusercontent.com/1xS2CAb5FcEtqJKjgPQNhbNwRgbB9_ypoD9TEgV02rTC06x_TaVxczHBrbEmjLtdoSfoY8Uc1bo-tTv48GsV0rTcOwdgYWGLd7ZHkj4=h600"
    />
    <UserInfo />
    <Collections />
  </Flex>
)

export default Profile
