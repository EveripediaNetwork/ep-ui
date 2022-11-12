import { Image } from '@/components/Elements/Image/Image'
import { Collections } from '@/components/Profile/Collections'
import { useProfile } from '@/components/Profile/useProfile'
import UserInfo from '@/components/Profile/UserInfo'
import { ProfileProvider } from '@/components/Profile/utils'
import { UserProfileHeader } from '@/components/SEO/UserProfile'
import config from '@/config'
import { AvatarColorArray } from '@/data/AvatarData'
import { useENSData } from '@/hooks/useENSData'
import { getUserAddressFromUsername, getUserProfile } from '@/services/profile'
import { store } from '@/store/store'
import { ProfileData } from '@/types/ProfileType'
import { Box, Flex } from '@chakra-ui/react'
import { BaseProvider, StaticJsonRpcProvider } from '@ethersproject/providers'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

interface ProfileProps {
  profileData: ProfileData
}

const Profile = ({ profileData }: ProfileProps) => {
  const router = useRouter()
  const address = router.query.profile as string
  const [avatar] = useENSData(address)

  const profileContext = useProfile()

  let userAvatar = ''
  if (profileData?.avatar) {
    userAvatar = `${config.pinataBaseUrl}${profileData?.avatar}`
  } else if (avatar) {
    userAvatar = avatar
  } else {
    userAvatar = `https://source.boringavatars.com/pixel/${address}?square=true?colors=${AvatarColorArray}`
  }

  return (
    <Box key={address}>
      <UserProfileHeader
        username={profileData?.username || address}
        avatarURL={userAvatar}
        links={profileData?.links[0]}
        bio={profileData?.bio}
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
            hideOnError
            src={`${config.pinataBaseUrl}${profileData?.banner}`}
            alt={`${profileData?.username || address}-background-image`}
          />
          <UserInfo />
          <Collections />
        </Flex>
      </ProfileProvider>
    </Box>
  )
}

Profile.footer = false

export const getServerSideProps: GetServerSideProps = async context => {
  const userIdentifier = context.params?.profile as string

  // Redirect from regular ethereum address
  const ethAddressRegex = /^0x[0-9a-fA-F]{40}$/
  if (ethAddressRegex.test(userIdentifier)) {
    const { data: profileData } = await store.dispatch(
      getUserProfile.initiate(userIdentifier),
    )
    return {
      props: {
        profileData: profileData || null,
      },
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
