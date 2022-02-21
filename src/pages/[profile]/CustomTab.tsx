import { chakra, TabProps, useTab } from '@chakra-ui/react'
import React from 'react'

export const CustomTab = React.forwardRef<HTMLDivElement, TabProps>(
  (props, ref) => {
    const tabProps = useTab({ ...props, ref })
    const isSelected = !!tabProps['aria-selected']

    return (
      <chakra.button
        display="flex"
        alignItems="center"
        _focus={{ boxShadow: 'none' }}
        p="5"
        cursor="pointer"
        color="gray.500"
        pos="relative"
        {...(isSelected && {
          color: 'black',
          _after: {
            transition: 'background-color 0.4s ease 0s',
            bg: 'blue.400',
            bottom: 0,
            left: 0,
            content: "''",
            h: 1,
            w: 'full',
            pos: 'absolute',
            borderTopRadius: 'base',
          },
        })}
        {...tabProps}
      >
        {tabProps.children}
      </chakra.button>
    )
  },
)
