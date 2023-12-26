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
import { getUserCreatedWikis, getUserEditedWikis } from '@/services/wikis'
import { store } from '@/store/store'
import { ProfileData } from '@/types/ProfileType'
import { provider } from '@/utils/WalletUtils/getProvider'
import { Box, Flex } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { Activity } from '@/types/ActivityDataType'
import { ITEM_PER_PAGE } from '@/data/Constants'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface ProfileProps {
  profileData: ProfileData
  createdWikis: Activity[]
  editedWikis: Activity[]
}

const Profile = ({ profileData, createdWikis, editedWikis }: ProfileProps) => {
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
        links={profileData?.links?.[0]}
        bio={profileData?.bio}
      />
      <ProfileProvider value={profileContext}>
        <Flex mt={-2} direction="column" align="center" pos="relative">
          <Image
            width="full"
            height="56"
            objectFit="cover"
            bgColor="careersBackground"
            bgImage="/images/backgrounds/homepage-bg-white.png"
            _dark={{
              bgImage: '/images/backgrounds/careers-background-dark.png',
            }}
            hideOnError
            src={`${config.pinataBaseUrl}${profileData?.banner}`}
            alt={`${profileData?.username || address}-background-image`}
          />
          <UserInfo />
          <Collections createdWikis={createdWikis} editedWikis={editedWikis} />
        </Flex>
      </ProfileProvider>
    </Box>
  )
}

Profile.footer = false

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userIdentifier = context.params?.profile as string
  const locale = context.locale
  const props = {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  }

  // Redirect if /accounts/settings is hit
  if (userIdentifier === 'settings') {
    return {
      redirect: {
        destination: '/settings/account',
        permanent: false,
      },
      props,
    }
  }

  // Redirect from regular ethereum address
  const ethAddressRegex = /^0x[0-9a-fA-F]{40}$/
  if (ethAddressRegex.test(userIdentifier)) {
    const [profileData, createdWikiData, editedWikiData] = await Promise.all([
      store.dispatch(getUserProfile.initiate(userIdentifier)),
      store.dispatch(
        getUserCreatedWikis.initiate({
          id: userIdentifier,
          limit: ITEM_PER_PAGE,
          offset: 0,
        }),
      ),
      store.dispatch(
        getUserEditedWikis.initiate({
          id: userIdentifier,
          limit: ITEM_PER_PAGE,
          offset: 0,
        }),
      ),
    ])
    return {
      props: {
        profileData: profileData.data || null,
        createdWikis: createdWikiData.data || [],
        editedWikis: editedWikiData.data || [],
        ...props,
      },
    }
  }

  // Redirect from ens domain
  if (userIdentifier.endsWith('.eth')) {
    const resolvedAddress = (await provider.getEnsAddress({
      name: userIdentifier,
    })) as string
    if (resolvedAddress) {
      return {
        redirect: {
          destination: `/account/${resolvedAddress}`,
          permanent: false,
        },
        props,
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
      props,
    }
  }

  // Redirect to 404 if no match
  return {
    redirect: {
      destination: '/404',
      permanent: false,
    },
    props,
  }
}

export default React.memo(Profile)
