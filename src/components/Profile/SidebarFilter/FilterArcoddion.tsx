import React from 'react'
import {
  AccordionButton as ChakraAccordionButton,
  AccordionButtonProps as ChakraAccordionButtonProps,
  AccordionIcon,
  chakra,
  AccordionPanel as ChakraAccordionPanel,
  AccordionPanelProps as ChakraAccordionPanelProps,
  useAccordionItemState,
} from '@chakra-ui/react'

export type AccordionButtonProps = ChakraAccordionButtonProps

export const AccordionButton = (props: AccordionButtonProps) => {
  const { children, ...rest } = props
  const { isOpen } = useAccordionItemState()
  return (
    <ChakraAccordionButton
      borderBottomWidth={isOpen ? 1 : 0}
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
