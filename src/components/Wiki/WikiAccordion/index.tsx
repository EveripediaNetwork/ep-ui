import React, { useState } from 'react'
import {
  Box,
  HStack,
  Text,
  IconButton,
  BoxProps,
  chakra,
} from '@chakra-ui/react'
import { RiArrowDownSLine } from 'react-icons/ri'
import Styles from '../../../styles/markdown.module.css'

interface AccordionProps {
  title: string
  withNoDarkBg?: boolean
  collapsed?: { base: boolean; xl: boolean }
  children: React.ReactNode
  normal?: boolean
}

const WikiAccordion = ({
  title,
  withNoDarkBg,
  children,
  normal,
  ...rest
}: BoxProps & AccordionProps) => {
  const [first, setfirst] = useState(
    normal ? Styles.normalBlock : Styles.accordionDisplay,
  )

  const ChangeStyle = () => {
    if (first === Styles.accordionDisplay) {
      setfirst(Styles.accordionUnDisplay)
    } else if (first === Styles.accordionUnDisplay) {
      setfirst(Styles.accordionDisplay)
    } else if (first === Styles.normalBlock) {
      setfirst(Styles.normalNone)
    } else {
      setfirst(Styles.normalBlock)
    }
  }

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
      <HStack cursor="pointer" onClick={ChangeStyle} justify="start">
        <IconButton
          color="linkColor"
          variant="link"
          minW={3}
          aria-label={`toggle${title}`}
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
      <chakra.div className={first}>
        <Box p={2} mt={1} {...rest}>
          {children}
        </Box>
      </chakra.div>
    </Box>
  )
}

export default WikiAccordion
