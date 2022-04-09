import { SidebarFilter } from '@/components/Profile/SidebarFilter'
import { TopBarFilter } from '@/components/Profile/TopBarFilter'
import { useProfileContext } from '@/components/Profile/utils'
import { chakra } from '@chakra-ui/react'
import React from 'react'

export type FilterLayoutProps = { children: React.ReactNode }

export const FilterLayout = (props: FilterLayoutProps) => {
  const { children } = props
  const { filterSidebarSize, filterSidebarIsSticky } = useProfileContext()

  return (
    <chakra.div display="flex">
      <SidebarFilter />
      <chakra.div
        w="full"
        display="flex"
        flexDir="column"
        p="4"
        gap="8"
        ml={filterSidebarIsSticky ? filterSidebarSize : 0}
      >
        <TopBarFilter />
        {children}
      </chakra.div>
    </chakra.div>
  )
}
