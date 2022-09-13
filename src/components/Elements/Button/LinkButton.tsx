import React from 'react'
import Link, { LinkProps } from 'next/link'
import { Button, ButtonProps } from '@chakra-ui/react'

type ChakraAndNextProps = ButtonProps & LinkProps

const LinkButton = ({
  href,
  prefetch,
  children,
  ...props
}: ChakraAndNextProps) => {
  const linkProps = {
    prefetch:
      String(href).includes('create-wiki') || String(href).includes('about')
        ? false
        : prefetch,
  }
  return (
    <Link href={href} passHref {...{ linkProps }}>
      <Button as="a" {...props}>
        {children}
      </Button>
    </Link>
  )
}

export default LinkButton
