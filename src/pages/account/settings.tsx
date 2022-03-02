import NotificationSettings from '@/components/Settings/NotificationSettings'
import ProfileSettings from '@/components/Settings/ProfileSettings'
import SettingNavButton from '@/components/Settings/SettingNavButton'
import { HStack, Heading, Box, VStack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import {
  FaBell,
  FaPlusSquare,
  FaUserCircle,
  FaUserShield,
} from 'react-icons/fa'

const Settings = () => {
  const { query } = useRouter()
  const { tab } = query

  return (
    <HStack bgColor="pageBg" align="flex-start" my={8} mt={-8} mb={-8} pb={8}>
      <Box p={12} borderRightWidth="1px" borderColor="borderColor" pr={8}>
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
            text="Account Support"
            Icon={FaUserShield}
            tabName="support"
            isActive={tab === 'support'}
          />
          <SettingNavButton
            text="Advanced Settings"
            Icon={FaPlusSquare}
            tabName="advanced"
            isActive={tab === 'advanced'}
          />
        </VStack>
      </Box>
      <VStack p={12} pt={'24'} spacing={8} align="left">
        <Heading textTransform="capitalize">{tab} Settings</Heading>
        {tab === 'profile' && <ProfileSettings />}
        {tab === 'notifications' && <NotificationSettings />}
      </VStack>
    </HStack>
  )
}
export default Settings
