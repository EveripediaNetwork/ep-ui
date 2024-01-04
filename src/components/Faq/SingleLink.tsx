import React from 'react'
import { Link } from '@chakra-ui/react'

export const SingleLink = ({
  href,
  title,
}: {
  href: string
  title: string
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      textDecoration="underline"
      color="#FF5CAA"
    >
      {title}{' '}
    </Link>
  )
}
