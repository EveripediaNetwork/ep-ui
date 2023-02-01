import React from 'react'
import { LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import NextLink, { LinkProps } from 'next/link'

type ChakraLinkAndNextProps = ChakraLinkProps & LinkProps

const POLYGON_MUMBAI_ERROR_LINK = 'https://mumbai.polygonscan.com//tx/'

export const LinkWrapper = ({
  href,
  prefetch,
  children,
}: ChakraLinkAndNextProps) => {
  const isValidLink = href.toString().includes(POLYGON_MUMBAI_ERROR_LINK)

  return isValidLink ? (
    <a href={href}>{children} </a>
  ) : (
    <NextLink
      href={href}
      prefetch={
        String(href).includes('/create-wiki') ||
        String(href).includes('/static/about')
          ? false
          : prefetch
      }
      passHref
      legacyBehavior
    >
      {children}
    </NextLink>
  )
}
