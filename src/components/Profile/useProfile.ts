import {
  FILTER_SIDEBAR_SIZE,
  ProfileContext,
  useStickyElement,
} from '@/components/Profile/utils'
import { useBoolean } from '@chakra-ui/react'

export const useProfile = (): ProfileContext => {
  const [headerRef, headerIsSticky] = useStickyElement()
  const [filterSidebarRef, filterSidebarIsSticky] = useStickyElement()
  const keepHeaderSticky = headerIsSticky && !filterSidebarIsSticky
  const [filterSidebarIsOpen, filterSidebarSwitch] = useBoolean(false)
  const filterSidebarSize = filterSidebarIsOpen
    ? FILTER_SIDEBAR_SIZE.OPEN
    : FILTER_SIDEBAR_SIZE.CLOSE

  return {
    headerRef,
    headerIsSticky: keepHeaderSticky,
    filterSidebarRef,
    filterSidebarIsSticky,
    filterSidebarIsOpen,
    filterSidebarSwitch,
    filterSidebarSize,
  }
}
