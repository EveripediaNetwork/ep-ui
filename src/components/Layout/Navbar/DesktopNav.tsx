import React, { useEffect, useState } from 'react'
import {
  HStack,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Button,
  chakra,
} from '@chakra-ui/react'
import { NAV_ITEMS } from '@/data/NavItemData'
import { NavMenu } from '@/components/Layout/Navbar'
import { useRouter } from 'next/router'
import { NavItem } from '@/types/NavItemType'
import { useTranslation } from 'next-i18next'
import { languageData } from '@/data/LanguageData'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import useLanguageChange from '@/hooks/useLanguageChange'

const DesktopNav = () => {
  const router = useRouter()
  const [visibleMenu, setVisibleMenu] = useState<number | null>(null)
  const lang = useSelector((state: RootState) => state.app.language)
  const { handleLangChange } = useLanguageChange()

  useEffect(() => {
    const handleRouteChange = () => {
      setVisibleMenu(null)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  const { t } = useTranslation()

  return (
    <HStack onMouseLeave={() => setVisibleMenu(null)}>
      <Menu placement={'bottom-end'}>
        <MenuButton
          as={Button}
          fontSize="sm"
          paddingX={0}
          bg="transparent"
          sx={{
            marginRight: 4,
            fontWeight: 600,
            fontSize: 'sm',
            color: 'linkColor',
            _active: {
              bg: 'transparent',
            },
            _hover: {
              bg: 'transparent',
            },
          }}
          rightIcon={<ChevronDownIcon color="linkColor" />}
          iconSpacing={1}
          defaultValue={lang}
        >
          <chakra.span textTransform={'uppercase'}>{lang}</chakra.span>
        </MenuButton>
        <MenuList color="linkColor">
          <MenuOptionGroup type="radio" onChange={handleLangChange}>
            {languageData.map((langObj) => (
              <MenuItemOption
                key={langObj.locale}
                fontSize="md"
                value={langObj.locale}
                isChecked={langObj.locale === lang}
              >
                {langObj.name}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
      {NAV_ITEMS.map((navItem: NavItem) => {
        return (
          <NavMenu
            key={navItem.id}
            navItem={navItem}
            setVisibleMenu={setVisibleMenu}
            visibleMenu={visibleMenu}
            label={t(navItem.label)}
          />
        )
      })}
    </HStack>
  )
}

export default DesktopNav
