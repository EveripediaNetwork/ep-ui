import React from 'react'
import { LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import NextLink, { LinkProps } from 'next/link'

type ChakraLinkAndNextProps = ChakraLinkProps & LinkProps

const prefetchDisabledRoutes = [
  '/create-wiki',
  '/static/about',
  '/account/settings',
  '/admin',
]

export const LinkWrapper = ({
  href,
  prefetch,
  children,
}: ChakraLinkAndNextProps) => {
  return (
    <NextLink
      href={href}
      prefetch={
        prefetchDisabledRoutes.includes(href as string) ? false : prefetch
      }
      passHref
    >
      {children}
    </NextLink>
  )
}
