import React from 'react'
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'
import NextLink, { LinkProps } from 'next/link'

type ChakraLinkAndNextProps = ChakraLinkProps & LinkProps

const Link = ({
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
    <NextLink href={href} passHref {...{ linkProps }}>
      <ChakraLink {...props}>{children}</ChakraLink>
    </NextLink>
  )
}

export default Link
