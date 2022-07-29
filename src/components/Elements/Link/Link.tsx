import React from 'react'
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'
import NextLink, { LinkProps } from 'next/link'

type ChakraLinkAndNextProps = ChakraLinkProps & LinkProps

const Link = ({ href, children, ...props }: ChakraLinkAndNextProps) => {
  let linkProps = {}
  if (href.includes('create-wiki') || href.includes('about')) {
    linkProps = {
      prefetch: false,
    }
  }
  return (
    <NextLink href={href} passHref {...{ linkProps }}>
      <ChakraLink {...props}>{children}</ChakraLink>
    </NextLink>
  )
}

export default Link
