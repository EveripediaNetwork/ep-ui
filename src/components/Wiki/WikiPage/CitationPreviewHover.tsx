import { Link } from '@chakra-ui/react'
import React from 'react'

const CitationPreviewHover = ({
  text,
  href,
}: {
  text: string
  href?: string
}) => {
  return (
    <Link href={href}>
      <sup>{text}</sup>
    </Link>
  )
}

export default CitationPreviewHover
