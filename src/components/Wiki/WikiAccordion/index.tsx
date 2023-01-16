import React, { useRef, useState } from 'react'
import {
  Box,
  HStack,
  Text,
  IconButton,
  useDisclosure,
  BoxProps,
  // useBreakpointValue,
  chakra,
} from '@chakra-ui/react'
import { RiArrowDownSLine } from 'react-icons/ri'
import Styles from '../../../styles/markdown.module.css'

interface AccordionProps {
  title: string
  withNoDarkBg?: boolean
  collapsed?: { base: boolean; xl: boolean }
  children: React.ReactNode
}

const WikiAccordion = ({
  title,
  withNoDarkBg,
  collapsed,
  children,
  ...rest
}: BoxProps & AccordionProps) => {
  const { isOpen, onToggle } = useDisclosure()
  const ChangeStyle = () => {}
  return (
    <Box
      w="100%"
      borderWidth={1}
      bgColor="wikiCardBg"
      _dark={{
        bgColor: withNoDarkBg ? 'gray.800' : 'gray.700',
      }}
      p={3}
      borderRadius={8}
    >
      <HStack cursor="pointer" onClick={onToggle} justify="start">
        <IconButton
          color="linkColor"
          variant="link"
          minW={3}
          aria-label={`toggle ${title}`}
          icon={<RiArrowDownSLine />}
        />
        <Text
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
          fontSize="14px"
          color="linkColor"
        >
          {title}
        </Text>
      </HStack>
      <chakra.div
        className={Styles.accordionDisplay}
        display={{
          base: isOpen === true ? 'unset' : 'none',
          xl: isOpen === false ? 'unset' : 'none',
        }}
      >
        <Box p={2} mt={1} {...rest}>
          {children}
        </Box>
      </chakra.div>
    </Box>
  )
}

export default WikiAccordion
