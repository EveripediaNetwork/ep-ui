import { useProfileContext } from '@/components/Profile/utils'
import { chakra, Flex, HTMLChakraProps, Icon, Square } from '@chakra-ui/react'
import React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { RiFilter3Fill } from 'react-icons/ri'

export type FilterLayoutProps = { children: React.ReactNode }

export const FilterLayout = (props: FilterLayoutProps) => {
  const { children } = props

  const {
    filterSidebarSize,
    filterSidebarIsSticky,
    filterSidebarRef,
    filterSidebarSwitch,
    filterSidebarIsOpen,
  } = useProfileContext()

  const stickyStyles: HTMLChakraProps<'div'> = {
    zIndex: 'dropdown',
    pos: 'fixed',
    top: '70px',
    bottom: 0,
    bg: 'white',
  }

  return (
    <chakra.div display="flex">
      <chakra.div ref={filterSidebarRef} opacity="0" w="0" />

      <chakra.div
        w={filterSidebarSize}
        minW={filterSidebarSize}
        shadow="md"
        {...(filterSidebarIsSticky && stickyStyles)}
      >
        <Flex
          _hover={{ shadow: 'md' }}
          justify="space-between"
          h="15"
          align="center"
          onClick={filterSidebarSwitch.toggle}
          cursor="pointer"
          px="4"
        >
          {filterSidebarIsOpen && (
            <Flex align="center" gap="2">
              <Icon as={RiFilter3Fill} boxSize="6" />
              <chakra.span fontWeight="semibold">Filter</chakra.span>
            </Flex>
          )}
          <chakra.span
            display="flex"
            justifyContent="center"
            w={filterSidebarIsOpen ? 'auto' : 'full'}
            flexShrink="0"
          >
            <Icon
              as={FiArrowRight}
              boxSize="6"
              transform={filterSidebarIsOpen ? 'rotate(180deg)' : ''}
              transition="all 0.3s ease"
            />
          </chakra.span>
        </Flex>
      </chakra.div>
      <chakra.div
        w="full"
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
