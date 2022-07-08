import { Image } from '@/components/Elements/Image/Image'
import { Collections } from '@/components/Profile/Collections'
import { useProfile } from '@/components/Profile/useProfile'
import UserInfo from '@/components/Profile/UserInfo'
import { ProfileProvider } from '@/components/Profile/utils'
import config from '@/config'
import { useUserProfileData } from '@/services/profile/utils'
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
  const { profileData, setAccount } = useUserProfileData(address)

  useEffect(() => {
    if (address) {
      setAccount(address)
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
      <Flex mt={-2} direction="column" align="center" pos="relative">
        <Image
          width="full"
          height="56"
          objectFit="cover"
          bgColor="profileBannerBg"
          backgroundImage="/images/homepage-bg-white.png"
          _dark={{
            backgroundImage: '/images/homepage-bg-dark.png',
          }}
          src={`${config.pinataBaseUrl}${profileData?.banner}`}
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

export default React.memo(Profile)
