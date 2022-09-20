import React from 'react'
import { LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import NextLink, { LinkProps } from 'next/link'

type ChakraLinkAndNextProps = ChakraLinkProps & LinkProps

export const LinkWrapper = ({
  href,
  prefetch = false,
  children,
}: ChakraLinkAndNextProps) => {
  // PREFETCH TEST -- REMOVE
  console.table({
    href: href as string,
    prefetch:
      String(href).includes('/create-wiki') ||
      String(href).includes('/static/about')
        ? false
        : prefetch,
  })
  // END PREFETCH TEST -- REMOVE
  return (
    <NextLink
      href={href}
      prefetch={
        String(href).includes('/create-wiki') ||
        String(href).includes('/static/about')
          ? false
          : prefetch
      }
      passHref
    >
      {children}
    </NextLink>
  )
}
