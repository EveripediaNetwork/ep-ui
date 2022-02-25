import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createContext } from '@chakra-ui/react-utils'

export const FILTER_SIDEBAR_SIZE = {
  OPEN: 40,
  CLOSE: 15,
} as const

type FilterSidebarSize =
  typeof FILTER_SIDEBAR_SIZE[keyof typeof FILTER_SIDEBAR_SIZE]

export type ProfileContext = {
  // headerIsSticky: boolean
  // headerRef: MutableRefObject<HTMLDivElement | null>
  // filterSidebarIsSticky: boolean
  // filterSidebarRef: MutableRefObject<HTMLDivElement | null>
  filterSidebarIsOpen: boolean
  setFilterSidebarIsOpen: Dispatch<SetStateAction<boolean>>
  filterSidebarSize: FilterSidebarSize
}

export const useStickyElement = () => {
  const [elementIsSticky, setElementIsStiky] = useState<boolean>(false)

  const stickyRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onScroll = () => {
      if (!stickyRef?.current) return
      const headerIsSticky = window.pageYOffset > stickyRef?.current?.offsetTop
      setElementIsStiky(headerIsSticky)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    // clean up code
    return () => window.removeEventListener('scroll', onScroll)
  }, [elementIsSticky])

  return [stickyRef, elementIsSticky] as const
}

export const [ProfileProvider, useProfileContext] =
  createContext<ProfileContext>({
    name: 'ProfilePage',
  })
