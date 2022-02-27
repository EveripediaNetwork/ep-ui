import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createContext } from '@chakra-ui/react-utils'

type TypeValue<T> = T[keyof T]

export const FILTER_SIDEBAR_SIZE = {
  OPEN: 85,
  CLOSE: 15,
} as const

type FilterSidebarSize = TypeValue<typeof FILTER_SIDEBAR_SIZE>

export const COLLECTIONS_DISPLAY_SIZES = {
  LARGE: '320px',
  SMALL: '207px',
} as const

export type CollectionDisplaySize = TypeValue<typeof COLLECTIONS_DISPLAY_SIZES>

type BooleanSwitch = {
  readonly on: () => void
  readonly off: () => void
  readonly toggle: () => void
}

export type ProfileContext = {
  headerIsSticky: boolean
  headerRef: MutableRefObject<HTMLDivElement | null>
  filterSidebarIsSticky: boolean
  filterSidebarRef: MutableRefObject<HTMLDivElement | null>
  filterSidebarIsOpen: boolean
  filterSidebarSwitch: BooleanSwitch
  filterSidebarSize: FilterSidebarSize
  displaySize: CollectionDisplaySize
  setDisplaySize: Dispatch<SetStateAction<CollectionDisplaySize>>
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
