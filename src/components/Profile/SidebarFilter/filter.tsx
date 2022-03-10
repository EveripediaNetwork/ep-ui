import {
  AccordionButton,
  AccordionPanel,
} from '@/components/Profile/SidebarFilter/FilterArcoddion'
import { AccordionItem } from '@chakra-ui/react'
import React from 'react'

export const ExampleFilter = () => {
  return (
    <AccordionItem>
      <AccordionButton>Section 1 title</AccordionButton>
      <AccordionPanel>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>
  )
}
