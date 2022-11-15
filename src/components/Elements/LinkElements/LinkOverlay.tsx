import Link, { LinkProps } from 'next/link'
import {
  LinkProps as ChakraLinkProps,
  LinkOverlay as ChakraLinkOverlay,
} from '@chakra-ui/react'
import React from 'react'

type ChakraLinkAndNextProps = ChakraLinkProps & LinkProps

const LinkOverlay = ({
  href,
  prefetch,
  children,
  ...props
}: ChakraLinkAndNextProps) => {
  return (
    <ChakraLinkOverlay href={href} prefetch={prefetch} as={Link} {...props}>
      {children}
    </ChakraLinkOverlay>
  )
}

export default LinkOverlay
