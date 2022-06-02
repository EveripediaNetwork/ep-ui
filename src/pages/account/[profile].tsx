import { Image } from '@/components/Elements/Image/Image'
import { Collections } from '@/components/Profile/Collections'
import { useProfile } from '@/components/Profile/useProfile'
import UserInfo from '@/components/Profile/UserInfo'
import { ProfileProvider } from '@/components/Profile/utils'
import config from '@/config'
import { validateAddress } from '@/utils/validateAddress'
import { Flex, Spinner, Box } from '@chakra-ui/react'
import { BaseProvider, StaticJsonRpcProvider } from '@ethersproject/providers'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

export type PageWithoutFooter = NextPage & {
  noFooter?: boolean
}

const Profile: PageWithoutFooter = () => {
  const router = useRouter()
  const provider: BaseProvider = new StaticJsonRpcProvider(config.ensRPC)
  const address = router.query.profile as string
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (address) {
      if (!validateAddress(address)) {
        const lookUpAddress = async () => {
          const resolvedAddress = (await provider.resolveName(
            address,
          )) as string
          if (resolvedAddress) {
            router.push(`/account/${resolvedAddress}`)
          } else {
            return router.push(`/404`)
          }
          return null
        }
        lookUpAddress()
      } else {
        setLoading(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  const profileContext = useProfile()

  return (
    <ProfileProvider value={profileContext}>
      <Flex direction="column" align="center" pos="relative">
        <Image
          width="full"
          height="56"
          objectFit="cover"
          src="https://lh3.googleusercontent.com/1xS2CAb5FcEtqJKjgPQNhbNwRgbB9_ypoD9TEgV02rTC06x_TaVxczHBrbEmjLtdoSfoY8Uc1bo-tTv48GsV0rTcOwdgYWGLd7ZHkj4=h600"
        />
        {!loading ? (
          <>
            <UserInfo />
            <Collections />
          </>
        ) : (
          <Box mt="20">
            <Spinner size="xl" />
          </Box>
        )}
      </Flex>
    </ProfileProvider>
  )
}
Profile.noFooter = true

export default Profile
