import React, { useEffect, useState } from 'react'
import { HStack } from '@chakra-ui/react'
import { NAV_ITEMS } from '@/data/NavItemData'
import { NavMenu } from '@/components/Layout/Navbar'
import { useRouter } from 'next/router'
import { NavItem } from '@/types/NavItemType'
import { useTranslation } from 'react-i18next'

const DesktopNav = () => {
  const router = useRouter()
  const [visibleMenu, setVisibleMenu] = useState<number | null>(null)

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
