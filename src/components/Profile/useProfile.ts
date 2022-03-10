import {
  COLLECTIONS_DISPLAY_SIZES,
  FILTER_SIDEBAR_SIZE,
} from '@/components/Profile/SidebarFilter/constants'
import {
  CollectionDisplaySize,
  ProfileContext,
  useStickyElement,
} from '@/components/Profile/utils'
import { useBoolean } from '@chakra-ui/react'
import { useState } from 'react'

export const useProfile = (): ProfileContext => {
  const [headerRef, headerIsSticky] = useStickyElement()
  const [filterSidebarRef, filterSidebarIsSticky] = useStickyElement()
  const keepHeaderSticky = headerIsSticky && !filterSidebarIsSticky
  const [filterSidebarIsOpen, filterSidebarSwitch] = useBoolean(false)
  const filterSidebarSize = filterSidebarIsOpen
    ? FILTER_SIDEBAR_SIZE.OPEN
    : FILTER_SIDEBAR_SIZE.CLOSE

  const [displaySize, setDisplaySize] = useState<CollectionDisplaySize>(
    COLLECTIONS_DISPLAY_SIZES.LARGE,
  )

  return {
    headerRef,
    headerIsSticky: keepHeaderSticky,
    filterSidebarRef,
    filterSidebarIsSticky,
    filterSidebarIsOpen,
    filterSidebarSwitch,
    filterSidebarSize,
    displaySize,
    setDisplaySize,
  }
}
