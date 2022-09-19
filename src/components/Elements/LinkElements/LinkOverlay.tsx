import { LinkProps } from 'next/link'
import {
  LinkOverlay as ChakraLinkOverlay,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'
import React from 'react'
import { LinkWrapper } from './LinkWrapper'

type ChakraLinkAndNextProps = ChakraLinkProps & LinkProps

const LinkOverlay = ({
  href,
  prefetch,
  children,
  ...props
}: ChakraLinkAndNextProps) => {
  return (
    <LinkWrapper href={href} prefetch={prefetch}>
      <ChakraLinkOverlay {...props}>{children}</ChakraLinkOverlay>
    </LinkWrapper>
  )
}

export default LinkOverlay
