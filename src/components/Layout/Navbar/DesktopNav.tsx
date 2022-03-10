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
  const [navData, setNavData] = useState<NavItem[]>(NAV_ITEMS)
  const { data: topCategoriesLinks } = useGetTopCategoriesLinksQuery()

  // Update nav data when top categories links are loaded
  useEffect(() => {
    if (topCategoriesLinks) {
      const topCategories = topCategoriesLinks.map(
        ({ title, id, icon }, i) => ({
          id: parseInt(`10${i}${2}`, 10),
          label: title || id,
          href: `/categories/${id}`,
          hasImage: true,
          icon,
        }),
      )
      setNavData([
        ...NAV_ITEMS.map(navItem => {
          if (navItem.label === 'Explore') {
            return {
              ...navItem,
              subItem: [...(navItem.subItem || []), ...topCategories],
            }
          }
          return navItem
        }),
      ])
    }
  }, [topCategoriesLinks])

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
      {navData.map(navItem => (
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
