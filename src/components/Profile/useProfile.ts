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
import { useAccount } from 'wagmi'

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

  const [ensAccount] = useAccount({
    fetchEns: true,
  })

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
    ensAccount,
  }
}
