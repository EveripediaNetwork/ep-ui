import React from 'react'
import {
  AccordionButton as ChakraAccordionButton,
  AccordionButtonProps as ChakraAccordionButtonProps,
  AccordionIcon,
  chakra,
  AccordionPanel as ChakraAccordionPanel,
  AccordionPanelProps as ChakraAccordionPanelProps,
} from '@chakra-ui/react'

export type AccordionButtonProps = ChakraAccordionButtonProps

export const AccordionButton = (props: AccordionButtonProps) => {
  const { children, ...rest } = props
  return (
    <ChakraAccordionButton
      borderWidth={1}
      h="15"
      fontWeight="semibold"
      {...rest}
    >
      <chakra.div flex="1" textAlign="left">
        {children}
      </chakra.div>
      <AccordionIcon />
    </ChakraAccordionButton>
  )
}

export const AccordionPanel = (props: ChakraAccordionPanelProps) => {
  return <ChakraAccordionPanel p="5" {...props} />
}
