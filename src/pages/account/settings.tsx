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
  // getting query params from url
  const { query } = useRouter()
  const { tab } = query

  return (
    <HStack bgColor="pageBg" mt={-8} mb={-8} pt={8} pb={8}>
      <Box m={8} borderRightWidth="1px" borderColor="borderColor" pr={8}>
        <Text
          fontSize="sm"
          letterSpacing="wide"
          opacity="0.8"
          fontWeight="bold"
          mb={4}
        >
          SETTINGS
        </Text>
        <VStack spacing={4}>
          <SettingNavButton
            text="Profile"
            Icon={FaUserCircle}
            tabName="profile"
            isActive={tab === 'profile'}
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
      <Heading>Settings {tab}</Heading>
    </HStack>
  )
}
export default Settings
