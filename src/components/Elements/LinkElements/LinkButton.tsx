import React from 'react'
import { LinkProps, Button, ButtonProps } from '@chakra-ui/react'
import { LinkProps as NextLinkProps } from 'next/link'
import { LinkWrapper } from './LinkWrapper'

type ChakraAndNextLinkProps = LinkProps & NextLinkProps & ButtonProps
const LinkButton = ({
  href,
  prefetch,
  children,
  ...props
}: ChakraAndNextLinkProps) => {
  return (
    <LinkWrapper href={href} prefetch={prefetch}>
      <Button as="a" {...props}>
        {children}
      </Button>
    </LinkWrapper>
  )
}

export default LinkButton
