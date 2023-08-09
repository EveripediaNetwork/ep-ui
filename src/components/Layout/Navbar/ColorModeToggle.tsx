import { Flex, Icon, MenuItem, Switch, useColorMode } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'

const CACHE_AGE = 60 * 60 * 24 * 365

export const ColorModeToggle = ({
  isInMobileMenu,
}: {
  isInMobileMenu: boolean
}) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const ColorModeIcon = colorMode === 'light' ? FaMoon : FaSun

  useEffect(() => {
    console.log(colorMode)
    document.cookie = `theme-mode=${colorMode}; max-age=${CACHE_AGE}`
  }, [])

  return (
    <>
      <MenuItem
        minH="48px"
        px={isInMobileMenu ? 0 : 3}
        bgColor={!isInMobileMenu ? 'subMenuBg' : 'transparent'}
        sx={{
          '&:hover, &:active, &:focus': {
            bgColor: !isInMobileMenu ? 'subMenuHoverBg' : 'transparent',
          },
        }}
        onClick={toggleColorMode}
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
            pointerEvents="none"
          />
        </Flex>
      </MenuItem>
    </>
  )
}
