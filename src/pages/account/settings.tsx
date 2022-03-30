import React from 'react'
import { HStack, Heading, Box, VStack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import NotificationSettings from '@/components/Settings/NotificationSettings'
import ProfileSettings from '@/components/Settings/ProfileSettings'
import SettingNavButton from '@/components/Settings/SettingNavButton'
import { authenticatedRoute } from '@/components/AuthenticatedRoute'
import {
  FaBell,
  FaPlusSquare,
  FaUserCircle,
  FaUserShield,
} from 'react-icons/fa'
import AdvancedSettings from '@/components/Settings/AdvancedSettings'

const Settings = () => {
  const { query } = useRouter()
  const { tab } = query

  return (
    <HStack bgColor="pageBg" alignItems="stretch" my={8} mt={-8} mb={-8} pb={8}>
      <Box
        display={{ base: 'none', lg: 'block' }}
        p={{ base: 8, lg: 12 }}
        borderRightWidth="1px"
        borderColor="borderColor"
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
        {(tab === 'profile' || !tab) && <ProfileSettings />}
        {tab === 'notifications' && <NotificationSettings />}
        {tab === 'advanced' && <AdvancedSettings />}
      </VStack>
    </HStack>
  )
}

export default authenticatedRoute(Settings)
