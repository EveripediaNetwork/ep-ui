import {
  Flex,
  Icon,
  MenuItem,
  Switch,
  useColorMode,
  Divider,
} from '@chakra-ui/react'
import React from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'

export const ColorModeToggle = ({
  isInMobileMenu,
}: {
  isInMobileMenu: boolean
}) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const ColorModeIcon = colorMode === 'light' ? FaMoon : FaSun

  return (
    <>
      {!isInMobileMenu && <Divider />}
      <MenuItem
        minH="48px"
        px={isInMobileMenu ? 0 : 3}
        bgColor={!isInMobileMenu ? 'subMenuBg' : 'transparent'}
        _hover={{ bgColor: 'transparent' }}
        _active={{ bgColor: 'transparent' }}
        _focus={{ bgColor: 'transparent' }}
      >
        <Icon
          cursor="pointer"
          fontSize="4xl"
          color="linkColor"
          fontWeight={600}
          as={ColorModeIcon}
          pr={3}
        />
        <Flex
          ml={isInMobileMenu ? 2 : 'unset'}
          fontSize="md"
          fontWeight="semibold"
          color="linkColor"
          flex="auto"
        >
          <span style={isInMobileMenu ? { fontSize: 18 } : {}}>Night Mode</span>
          <Switch
            ml="auto"
            isChecked={colorMode === 'dark'}
            onChange={toggleColorMode}
          />
        </Flex>
      </MenuItem>
    </>
  )
}
