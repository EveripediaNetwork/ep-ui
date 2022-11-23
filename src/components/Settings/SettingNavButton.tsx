import React from 'react'
import { Text } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { Link } from '../Elements'

interface SettingNavButtonProps {
  text: string
  Icon: IconType
  tabName: string
  isActive?: boolean
}

const SettingNavButton = ({
  text,
  Icon,
  tabName,
  isActive,
}: SettingNavButtonProps) => (
  <Link
    href={`/account/settings?tab=${tabName}`}
    display="flex"
    justifyContent="left"
    alignItems="center"
    gap={4}
    bgColor={isActive ? 'brand.700' : 'transparent'}
    color={isActive ? 'white' : 'linkColor'}
    p={4}
    _hover={!isActive ? { color: 'linkHoverColor' } : {}}
    width="250px"
    borderRadius="lg"
  >
    <Icon size="20px" />
    <Text fontWeight="bold">{text}</Text>
  </Link>
)

export default SettingNavButton
