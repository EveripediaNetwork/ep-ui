import React, { useEffect, useState } from 'react'
import { HStack } from '@chakra-ui/react'
import { NAV_ITEMS } from '@/data/NavItemData'
import { NavMenu } from '@/components/Layout/Navbar'
import { useRouter } from 'next/router'
import { NavItem } from '@/types/NavItemType'
import { useGetTopCategoriesLinksQuery } from '@/services/categories'

const DesktopNav = () => {
  const router = useRouter()
  const [visibleMenu, setVisibleMenu] = useState<number | null>(null)
  const { data: categoriesLinks } = useGetTopCategoriesLinksQuery()

  useEffect(() => {
    const handleRouteChange = () => {
      setVisibleMenu(null)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <HStack spacing={4} onMouseLeave={() => setVisibleMenu(null)}>
      {NAV_ITEMS(categoriesLinks || []).map((navItem: NavItem) => (
        <NavMenu
          key={navItem.id}
          navItem={navItem}
          setVisibleMenu={setVisibleMenu}
          visibleMenu={visibleMenu}
          label={navItem.label}
        />
      ))}
    </HStack>
  )
}

export default DesktopNav
