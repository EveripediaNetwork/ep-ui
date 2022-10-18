import { LinkProps } from 'next/link'
import { LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import React from 'react'
import { LinkWrapper } from './LinkWrapper'
import { PatchedLinkOverlay } from './PatchedLinkOverlay'

type ChakraLinkAndNextProps = ChakraLinkProps & LinkProps

const LinkOverlay = ({
  href,
  prefetch,
  children,
  ...props
}: ChakraLinkAndNextProps) => {
  return (
    <LinkWrapper href={href} prefetch={prefetch}>
      <PatchedLinkOverlay {...props}>{children}</PatchedLinkOverlay>
    </LinkWrapper>
  )
}

export default LinkOverlay
