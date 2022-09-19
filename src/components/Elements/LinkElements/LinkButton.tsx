import React from 'react'
import { LinkProps } from 'next/link'
import { Button, ButtonProps } from '@chakra-ui/react'
import { LinkWrapper } from './LinkWrapper'

type ChakraAndNextProps = ButtonProps & LinkProps

const LinkButton = ({
  href,
  prefetch,
  children,
  ...props
}: ChakraAndNextProps) => {
  return (
    <LinkWrapper href={href as string} prefetch={prefetch}>
      <Button as="a" {...props}>
        {children}
      </Button>
    </LinkWrapper>
  )
}

export default LinkButton
