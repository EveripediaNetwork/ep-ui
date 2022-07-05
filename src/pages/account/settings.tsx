import React, { useEffect, useState } from 'react'
import { HStack, Heading, Box, VStack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import NotificationSettings from '@/components/Settings/NotificationSettings'
import SettingNavButton from '@/components/Settings/SettingNavButton'
import { authenticatedRoute } from '@/components/AuthenticatedRoute'
import { FaBell, FaPlusSquare, FaUserCircle } from 'react-icons/fa'
import AdvancedSettings from '@/components/Settings/AdvancedSettings'
import { useWeb3Token } from '@/hooks/useWeb3Token'
import { useUserProfileData } from '@/services/profile/utils'
import { useAccount } from 'wagmi'
import { profileApiClient } from '@/services/profile'
import ProfileSettings from '@/components/Settings/ProfileSettings'
import SignTokenMessage from './SignTokenMessage'

const Settings = () => {
  const { query } = useRouter()
  const { tab } = query
  const { token, reSignToken, error } = useWeb3Token()
  const { data: accountData } = useAccount()
  const { setAccount, profileData } = useUserProfileData('', {
    withAllSettings: true,
  })

  useEffect(() => {
    if (accountData?.address && token) {
      profileApiClient.setHeader('authorization', token)
      setAccount(accountData.address)
    }
  }, [accountData?.address, setAccount, token])

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <></>

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
            address={accountData?.address}
            savedNotificationPrefs={profileData?.notifications[0]}
          />
        )}
        {tab === 'advanced' && <AdvancedSettings />}
      </VStack>
    </HStack>
  )
}

export default authenticatedRoute(Settings)
