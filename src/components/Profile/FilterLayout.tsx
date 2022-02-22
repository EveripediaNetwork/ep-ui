import { chakra } from '@chakra-ui/react'
import React from 'react'

export type FilterLayoutProps = { children: React.ReactNode }

export const FilterLayout = (props: FilterLayoutProps) => {
  const { children } = props

  return (
    <chakra.div pos="relative" display="flex">
      <chakra.div w="15" border="solid 1px red">
        s
      </chakra.div>
      <chakra.div display="flex" flexDir="column" p="4">
        <chakra.div>t</chakra.div>
        {children}
      </chakra.div>
    </chakra.div>
  )
}
