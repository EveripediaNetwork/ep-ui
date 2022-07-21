import React from 'react'
import {
  Box,
  HStack,
  Text,
  IconButton,
  useDisclosure,
  BoxProps,
  useBreakpointValue,
} from '@chakra-ui/react'
import { RiArrowDownSLine } from 'react-icons/ri'

interface AccordionProps {
  title: string
  withNoDarkBg?: boolean
  collapsed?: {base: boolean, xl: boolean}
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
  const isDefaultOpen = useBreakpointValue(collapsed? collapsed : {base:false , xl:false})

  return (
    <Box
      w="100%"
      borderWidth={1}
      bgColor="wikiCardBg"
      _dark={{
        bgColor: withNoDarkBg ? 'gray.800' : 'gray.700',
      }}
      p={3}
      borderRadius={4}
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
      {isOpen === isDefaultOpen && (
        <Box p={2} mt={1} {...rest}>
          {children}
        </Box>
      )}
    </Box>
  )
}

export default WikiAccordion
