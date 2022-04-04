import React from 'react'
import { useProfileContext } from '@/components/Profile/utils'
import { chakra, Flex, Icon } from '@chakra-ui/react'
import { FiArrowRight } from 'react-icons/fi'
import { RiFilter3Fill } from 'react-icons/ri'

export const Header = () => {
  const { filterSidebarSwitch, filterSidebarIsOpen } = useProfileContext()

  return (
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
      >
        <Icon
          as={FiArrowRight}
          boxSize="6"
          transform={filterSidebarIsOpen ? 'rotate(180deg)' : ''}
          transition="all 0.3s ease"
        />
      </chakra.span>
    </Flex>
  )
}
