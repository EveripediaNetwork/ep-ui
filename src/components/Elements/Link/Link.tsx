import NextLink, { LinkProps } from 'next/link'
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'
import React from 'react'

type ChakraLinkAndNextProps = ChakraLinkProps & LinkProps

const Link = ({ href, children, ...props }: ChakraLinkAndNextProps) => (
  <NextLink
    href={href}
    prefetch={!(href.includes('create-wiki') || href.includes('about'))}
    passHref
  >
    <ChakraLink {...props}>{children}</ChakraLink>
  </NextLink>
)

export default Link
