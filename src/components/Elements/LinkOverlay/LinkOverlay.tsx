import NextLink, { LinkProps } from 'next/link'
import {
  LinkOverlay as ChakraLinkOverlay,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'
import React from 'react'

type ChakraLinkAndNextProps = ChakraLinkProps & LinkProps

const LinkOverlay = ({
  href,
  prefetch,
  children,
  ...props
}: ChakraLinkAndNextProps) => {
  const linkProps = {
    prefetch:
      String(href).includes('create-wiki') || String(href).includes('about')
        ? false
        : prefetch,
  }
  return (
    <NextLink href={href} passHref {...linkProps}>
      <ChakraLinkOverlay {...props}>{children}</ChakraLinkOverlay>
    </NextLink>
  )
}

export default LinkOverlay
