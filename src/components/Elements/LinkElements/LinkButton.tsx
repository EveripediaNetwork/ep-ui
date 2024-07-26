import React from 'react'
import { Button, ButtonProps, Link, LinkProps } from '@chakra-ui/react'
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
    <Link as={LinkWrapper} href={href as string} prefetch={prefetch}>
      <Button as="a" {...props}>
        {children}
      </Button>
    </Link>
  )
}

export default LinkButton
