import React from 'react'
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'
import { LinkProps } from 'next/link'
import { LinkWrapper } from './LinkWrapper'

type ChakraLinkAndNextProps = ChakraLinkProps & LinkProps

const Link = ({
  href,
  prefetch,
  children,
  ...props
}: ChakraLinkAndNextProps) => {
  return (
    <LinkWrapper href={href} prefetch={prefetch}>
      <ChakraLink {...props}>{children}</ChakraLink>
    </LinkWrapper>
  )
}

export default Link
