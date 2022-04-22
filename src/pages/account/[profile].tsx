import { Image } from '@/components/Elements/Image/Image'
import { Collections } from '@/components/Profile/Collections'
import { useProfile } from '@/components/Profile/useProfile'
import UserInfo from '@/components/Profile/UserInfo'
import { ProfileProvider } from '@/components/Profile/utils'
import { Flex } from '@chakra-ui/react'
import { NextPage } from 'next'
import React from 'react'

export type PageWithoutFooter = NextPage & {
  noFooter?: boolean
}

const Profile: PageWithoutFooter = () => {
  const profileContext = useProfile()

  return (
    <>
   
    <ProfileProvider value={profileContext}>
      <Flex direction="column" align="center" pos="relative">
        <Image
          width="full"
          height="56"
          objectFit="cover"
          src="https://lh3.googleusercontent.com/1xS2CAb5FcEtqJKjgPQNhbNwRgbB9_ypoD9TEgV02rTC06x_TaVxczHBrbEmjLtdoSfoY8Uc1bo-tTv48GsV0rTcOwdgYWGLd7ZHkj4=h600"
        />
        <UserInfo />
        <Collections />
      </Flex>
    </ProfileProvider>
    </>
  )
}
Profile.noFooter = true

export default Profile
