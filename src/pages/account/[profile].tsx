import { Image } from '@/components/Elements/Image/Image'
import { Collections } from '@/components/Profile/Collections'
import { useProfile } from '@/components/Profile/useProfile'
import UserInfo from '@/components/Profile/UserInfo'
import { ProfileProvider } from '@/components/Profile/utils'
import { UserProfileHeader } from '@/components/SEO/UserProfile'
import config from '@/config'
import { getUserAddressFromUsername } from '@/services/profile'
import { useUserProfileData } from '@/services/profile/utils'
import { store } from '@/store/store'
import { Flex, Spinner, Box } from '@chakra-ui/react'
import { BaseProvider, StaticJsonRpcProvider } from '@ethersproject/providers'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export type PageWithoutFooter = NextPage & {
  noFooter?: boolean
}

const Profile: PageWithoutFooter = () => {
  const router = useRouter()
  const address = router.query.profile as string
  const { profileData, setAccount, loading } = useUserProfileData(address)

  useEffect(() => {
    if (address) {
      setAccount(address)
    }
  }, [address, setAccount])

  const profileContext = useProfile()

  return (
    <>
      <UserProfileHeader
        username={profileData?.username || address}
        bio={profileData?.bio}
        avatarIPFS={profileData?.avatar}
        links={profileData?.links[0]}
      />
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
    </>
  )
}
Profile.noFooter = true

export const getServerSideProps: GetServerSideProps = async context => {
  const userIdentifier = context.params?.profile as string

  // Redirect from regular ethereum address
  const ethAddressRegex = /^0x[0-9a-fA-F]{40}$/
  if (ethAddressRegex.test(userIdentifier)) {
    return {
      props: {},
    }
  }

  // Redirect from ens domain
  if (userIdentifier.endsWith('.eth')) {
    const provider: BaseProvider = new StaticJsonRpcProvider(config.ensRPC)
    const resolvedAddress = (await provider.resolveName(
      userIdentifier,
    )) as string
    if (resolvedAddress) {
      return {
        redirect: {
          destination: `/account/${resolvedAddress}`,
          permanent: false,
        },
      }
    }
  }

  // Redirect from username
  const { isError, data: address } = await store.dispatch(
    getUserAddressFromUsername.initiate(userIdentifier),
  )
  if (!isError) {
    return {
      redirect: {
        destination: `/account/${address}`,
        permanent: false,
      },
    }
  }

  // Redirect to 404 if no match
  return {
    redirect: {
      destination: `/404`,
      permanent: false,
    },
  }
}

export default React.memo(Profile)
