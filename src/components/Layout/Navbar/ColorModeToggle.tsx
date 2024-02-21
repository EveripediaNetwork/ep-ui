import { Button, Flex, Icon, Switch, useColorMode } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useTranslation } from 'next-i18next'

export const ColorModeToggle = ({
  isInMobileMenu,
}: {
  isInMobileMenu: boolean
}) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const ColorModeIcon = colorMode === 'light' ? FaMoon : FaSun
  const { t } = useTranslation('common')

  useEffect(() => {
    if (colorMode === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }, [colorMode])

  return (
    <>
      <Button
        minH={{ base: '35px', md: '48px' }}
        px={isInMobileMenu ? 0 : 3}
        w="full"
        bgColor="transparent"
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
          <span style={isInMobileMenu ? { fontSize: 18 } : {}}>
            {t('NightMode')}
          </span>
          <Switch
            ml="auto"
            isChecked={colorMode === 'dark'}
            pointerEvents="none"
          />
        </Flex>
      </Button>
    </>
  )
}
