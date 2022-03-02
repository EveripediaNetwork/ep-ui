import React from 'react'
import { Link, Text } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import NextLink from 'next/link'

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
  <NextLink href={`/account/settings?tab=${tabName}`} passHref>
    <Link
      href="passRef"
      display="flex"
      justifyContent="left"
      alignItems="center"
      gap={4}
      bgColor={isActive ? 'brand.700' : 'transparent'}
      color={isActive ? 'white' : 'linkColor'}
      p={4}
      _hover={{ color: 'linkHoverColor' }}
      width="300px"
      borderRadius="lg"
    >
      <Icon size="20px" />
      <Text fontWeight="bold">{text}</Text>
    </Link>
  </NextLink>
)

export default SettingNavButton
