import NextLink, { LinkProps } from 'next/link'
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'
import React from 'react'

type ChakraLinkAndNextProps = ChakraLinkProps & LinkProps

const Link = ({ href, children, ...props }: ChakraLinkAndNextProps) => {
  let linkProps = {}
  if (href.includes('create-wiki') || href.includes('about')) {
    console.log('AVOIDING PREFETCH: ', href)
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
