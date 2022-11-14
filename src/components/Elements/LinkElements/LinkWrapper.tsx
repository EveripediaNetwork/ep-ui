import React from 'react'
import { LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import NextLink, { LinkProps } from 'next/link'

type ChakraLinkAndNextProps = ChakraLinkProps & LinkProps

export const LinkWrapper = ({
  href,
  prefetch,
  children,
}: ChakraLinkAndNextProps) => {
  return (
    <NextLink
      href={href}
      prefetch={
        String(href).includes('/create-wiki') ||
        String(href).includes('/static/about')
          ? false
          : prefetch
      }
      // passHref
    >
      {children}
    </NextLink>
  )
}
