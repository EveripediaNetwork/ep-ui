import {
  FILTER_SIDEBAR_SIZE,
  ProfileContext,
  useStickyElement,
} from '@/components/Profile/utils'
import { useState } from 'react'

export const useProfile = (): ProfileContext => {
  const [headerRef, headerIsSticky] = useStickyElement()
  const [filterSidebarRef, filterSidebarIsSticky] = useStickyElement()
  const keepHeaderSticky = headerIsSticky && !filterSidebarIsSticky
  const [filterSidebarIsOpen, setFilterSidebarIsOpen] = useState(false)
  const filterSidebarSize = filterSidebarIsOpen
    ? FILTER_SIDEBAR_SIZE.OPEN
    : FILTER_SIDEBAR_SIZE.CLOSE

  return {
    headerRef,
    headerIsSticky: keepHeaderSticky,
    filterSidebarRef,
    filterSidebarIsSticky,
    filterSidebarIsOpen,
    setFilterSidebarIsOpen,
    filterSidebarSize,
  }
}
