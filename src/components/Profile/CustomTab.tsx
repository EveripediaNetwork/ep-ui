import { chakra, TabProps, useTab } from '@chakra-ui/react'
import React from 'react'

export const CustomTab = React.forwardRef<
  HTMLDivElement,
  TabProps & { noTab?: boolean }
>((props, ref) => {
  const { noTab, ...rest } = props
  const tabProps = useTab({ ...rest, ref })
  const isSelected = !!tabProps['aria-selected']

  return (
    <chakra.button
      display="flex"
      alignItems="center"
      _focus={{ boxShadow: 'none' }}
      p="5"
      cursor="pointer"
      color="fadedText2"
      pos="relative"
      {...(isSelected && {
        color: 'black',
        _dark: {
          color: 'white',
        },
        _after: {
          transition: 'background-color 0.4s ease 0s',
          bg: 'blue.400',
          bottom: 0,
          left: 0,
          content: "''",
          h: '2px',
          w: 'full',
          pos: 'absolute',
          borderTopRadius: 'base',
        },
      })}
      {...props}
      {...(!noTab && tabProps)}
    >
      {tabProps.children}
    </chakra.button>
  )
})
