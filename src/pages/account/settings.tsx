import React, { useEffect } from 'react'
import { HStack, Heading, Box, VStack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import SettingNavButton from '@/components/Settings/SettingNavButton'
import { authenticatedRoute } from '@/components/AuthenticatedRoute'
import { FaBell, FaPlusSquare, FaUserCircle } from 'react-icons/fa'
import { useWeb3Token } from '@/hooks/useWeb3Token'
import { useUserProfileData } from '@/services/profile/utils'
import { useAccount } from 'wagmi'
import { profileApiClient } from '@/services/profile'
import dynamic from 'next/dynamic'
import SignTokenMessage from './SignTokenMessage'

const NotificationSettings = dynamic(
  () => import('@/components/Settings/NotificationSettings'),
)
const ProfileSettings = dynamic(
  () => import('@/components/Settings/ProfileSettings'),
)
const AdvancedSettings = dynamic(
  () => import('@/components/Settings/AdvancedSettings'),
)

const Settings = () => {
  const { query } = useRouter()
  const { tab } = query
  const { token, reSignToken, error } = useWeb3Token()
  const { address: userAddress } = useAccount()
  const { setAccount, profileData } = useUserProfileData('', {
    withAllSettings: true,
  })

  useEffect(() => {
    if (userAddress && token) {
      profileApiClient.setHeader('authorization', token)
      setAccount(userAddress)
    }
  }, [userAddress, setAccount, token])

  if (!token)
    return <SignTokenMessage reopenSigningDialog={reSignToken} error={error} />

  return (
    <HStack alignItems="stretch" pb={8} my={-8}>
      <Box
        display={{ base: 'none', lg: 'block' }}
        p={12}
        borderRightWidth="1px"
        pr={8}
      >
        <Text
          fontSize="sm"
          letterSpacing="wide"
          opacity="0.8"
          fontWeight="bold"
          mb={5}
        >
          SETTINGS
        </Text>
        <VStack spacing={4}>
          <SettingNavButton
            text="Profile"
            Icon={FaUserCircle}
            tabName="profile"
            isActive={tab === 'profile' || !tab}
          />
          <SettingNavButton
            text="Notifications"
            Icon={FaBell}
            tabName="notifications"
            isActive={tab === 'notifications'}
          />
          <SettingNavButton
            text="Advanced Settings"
            Icon={FaPlusSquare}
            tabName="advanced"
            isActive={tab === 'advanced'}
          />
        </VStack>
      </Box>

      <VStack
        p={{ base: 4, lg: 12 }}
        pt={{ base: 14, lg: 24 }}
        w="100%"
        spacing={8}
        align="left"
      >
        <Heading textTransform="capitalize">
          {tab || 'Profile'} Settings
        </Heading>
        {(tab === 'profile' || !tab) && (
          <ProfileSettings settingsData={profileData} />
        )}
        {tab === 'notifications' && (
          <NotificationSettings
            address={userAddress}
            savedNotificationPrefs={profileData?.notifications[0]}
          />
        )}
        {tab === 'advanced' && <AdvancedSettings />}
      </VStack>
    </HStack>
  )
}

export default dynamic(() => Promise.resolve(authenticatedRoute(Settings)), {
  ssr: false,
})
