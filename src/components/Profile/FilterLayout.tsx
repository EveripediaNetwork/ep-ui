import { useProfileContext } from '@/components/Profile/utils'
import { chakra, HTMLChakraProps } from '@chakra-ui/react'
import React from 'react'

export type FilterLayoutProps = { children: React.ReactNode }

export const FilterLayout = (props: FilterLayoutProps) => {
  const { children } = props

  const { filterSidebarSize, filterSidebarIsSticky, filterSidebarRef } =
    useProfileContext()

  const stickyStyles: HTMLChakraProps<'div'> = {
    zIndex: 'dropdown',
    pos: 'fixed',
    top: '70px',
    bottom: 0,
    bg: 'white',
  }

  return (
    <chakra.div display="flex">
      <chakra.div
        w={filterSidebarSize}
        border="solid 1px red"
        ref={filterSidebarRef}
        {...(filterSidebarIsSticky && stickyStyles)}
      >
        s
      </chakra.div>
      <chakra.div
        display="flex"
        flexDir="column"
        p="4"
        ml={filterSidebarIsSticky ? filterSidebarSize : 0}
      >
        <chakra.div>t</chakra.div>
        {children}
      </chakra.div>
    </chakra.div>
  )
}
