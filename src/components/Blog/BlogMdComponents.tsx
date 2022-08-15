import React, { ReactNode } from 'react'
import { Heading, Text } from '@chakra-ui/react'
import routeToBlock from 'react-embed/lib/routeToBlock'

export const shouldEmbed = (url: string) => {
  return routeToBlock([] as any, new URL(url) as any) !== undefined
}

const BlockQuote = ({ children }: { children: ReactNode[] }) => {
  return <blockquote>{children}</blockquote>
}

const Block = ({ children }: { children: ReactNode[] }) => {
  const blockAwareChildren = children.map((child: any) => {
    if (child.props.node) child.props.node.blockSize = children.length

    return child
  })

  return <Text>{blockAwareChildren}</Text>
}

const h1 = ({ children }: { children: ReactNode[] }) => {
  return (
    <Heading as="h1" mt={8} mb={4}>
      {children}
    </Heading>
  )
}

const h2 = ({ children }: { children: ReactNode[] }) => {
  return (
    <Heading as="h2" mt={8} mb={4}>
      {children}
    </Heading>
  )
}

const h3 = ({ children }: { children: ReactNode[] }) => {
  return (
    <Heading as="h3" mt={8} mb={4}>
      {children}
    </Heading>
  )
}

const a = ({
  href,
  children,
  ...props
}: {
  href?: string | undefined
  children: ReactNode[]
}) => {
  return (
    <a
      href={href}
      {...props}
      style={{ color: 'blue', textDecoration: 'underline' }}
    >
      {children}
    </a>
  )
}

const allowedLinkProtocols = [
  'http',
  'https',
  'mailto',
  'tel',
  'ethereum',
  'crowdfund',
]

export const uriTransformer = (uri: string) => {
  const url = (uri || '').trim()
  const first = url.charAt(0)

  if (first === '#' || first === '/') {
    return url
  }

  const colon = url.indexOf(':')
  if (colon === -1) {
    return url
  }

  const { length } = allowedLinkProtocols
  let index = -1

  // eslint-disable-next-line no-plusplus
  while (++index < length) {
    const protocol = allowedLinkProtocols[index]

    if (
      colon === protocol.length &&
      url.slice(0, protocol.length).toLowerCase() === protocol
    ) {
      return url
    }
  }

  index = url.indexOf('?')
  if (index !== -1 && colon > index) {
    return url
  }

  index = url.indexOf('#')
  if (index !== -1 && colon > index) {
    return url
  }

  return '#'
}

export const components = {
  h1,
  h2,
  h3,
  a,
  blockquote: BlockQuote,
  paragraph: Block,
}
