import NextLink, { LinkProps } from 'next/link'
import {
  LinkOverlay as ChakraLinkOverlay,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'
import React from 'react'

type ChakraLinkAndNextProps = ChakraLinkProps & LinkProps

const LinkOverlay = ({ href, children, ...props }: ChakraLinkAndNextProps) => (
  <NextLink
    href={href}
    prefetch={!(href.includes('create-wiki') || href.includes('about'))}
    passHref
  >
    <ChakraLinkOverlay {...props}>{children}</ChakraLinkOverlay>
  </NextLink>
)

export default LinkOverlay
