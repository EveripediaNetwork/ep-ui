import React from 'react'
import { LinkProps as ChakraLinkProps, Link } from '@chakra-ui/react'
import { LinkProps } from 'next/link'

type ChakraLinkAndNextProps = ChakraLinkProps & LinkProps

export const LinkWrapper = ({
  href,
  // prefetch,
  children,
}: ChakraLinkAndNextProps) => {
  return (
    <Link
      href={href}
      // prefetch={
      //   String(href).includes('/create-wiki') ||
      //   String(href).includes('/static/about')
      //     ? false
      //     : prefetch
      // }
      // passHref
      // legacyBehavior
    >
      {children}
    </Link>
  )
}
