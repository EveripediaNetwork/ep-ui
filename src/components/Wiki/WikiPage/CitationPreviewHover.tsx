import { Link } from '@chakra-ui/react'
import React from 'react'

const CitationPreviewHover = ({
  text,
  href,
}: {
  text: string
  href?: string
}) => {
  return <Link href={href}>{text}</Link>
}

export default CitationPreviewHover
