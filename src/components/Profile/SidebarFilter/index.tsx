import React from 'react'
import { useProfileContext } from '@/components/Profile/utils'
import { chakra, HTMLChakraProps, Accordion } from '@chakra-ui/react'

import { StatusFilter } from '@/components/Profile/SidebarFilter/StatusFilter'
import { PriceFilter } from '@/components/Profile/SidebarFilter/PriceFilter'
import { CollectionsFilter } from '@/components/Profile/SidebarFilter/CollectionsFilter'
import { ChainsFilter } from '@/components/Profile/SidebarFilter/ChainsFilter'
import { CategoriesFilter } from '@/components/Profile/SidebarFilter/CategoriesFilter'
import { OnSaleInFilter } from '@/components/Profile/SidebarFilter/OnSaleInFilter'
import { Header } from './Header'

export const SidebarFilter = () => {
  const {
    filterSidebarSize,
    filterSidebarIsSticky,
    filterSidebarRef,
    filterSidebarIsOpen,
  } = useProfileContext()

  const stickyStyles: HTMLChakraProps<'div'> = {
    zIndex: 'dropdown',
    pos: 'fixed',
    top: '70px',
    bottom: 0,
    bg: 'white',
    _dark: { bg: 'gray.800' },
  }

  return (
    <>
      <chakra.div ref={filterSidebarRef} opacity="0" w="0" />

      <chakra.div
        w={filterSidebarSize}
        minW={filterSidebarSize}
        shadow="md"
        {...(filterSidebarIsSticky && stickyStyles)}
      >
        <Header />
        <chakra.div display={filterSidebarIsOpen ? 'initial' : 'none'}>
          <Accordion allowMultiple>
            <StatusFilter />
            <PriceFilter />
            <CollectionsFilter />
            <ChainsFilter />
            <CategoriesFilter />
            <OnSaleInFilter />
          </Accordion>
        </chakra.div>
      </chakra.div>
    </>
  )
}
