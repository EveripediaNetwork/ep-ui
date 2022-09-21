import React from 'react'
import { LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import NextLink, { LinkProps } from 'next/link'

type ChakraLinkAndNextProps = ChakraLinkProps & LinkProps

export const LinkWrapper = ({
  href,
  prefetch,
  children,
}: ChakraLinkAndNextProps) => {
  const linkProps = {
    prefetch:
      String(href).includes('create-wiki') || String(href).includes('about')
        ? false
        : prefetch,
  }
  return (
    <NextLink href={href} passHref {...{ linkProps }}>
      {children}
    </NextLink>
  )
}
