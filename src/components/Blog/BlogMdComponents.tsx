import React, { ClassAttributes, ImgHTMLAttributes, ReactNode } from 'react'
import { Heading } from '@chakra-ui/react'

const BlockQuote = ({ children }: { children: ReactNode[] }) => (
  <blockquote>{children}</blockquote>
)

const p = ({ children }: { children: ReactNode[] }) => (
  <p style={{ marginBottom: '16px' }}>{children}</p>
)

const h1 = ({ children }: { children: ReactNode[] }) => (
  <Heading as="h1" mt={8} mb={4}>
    {children}
  </Heading>
)

const h2 = ({ children }: { children: ReactNode[] }) => (
  <Heading as="h2" mt={8} mb={4}>
    {children}
  </Heading>
)

const h3 = ({ children }: { children: ReactNode[] }) => (
  <Heading as="h3" mt={8} mb={4}>
    {children}
  </Heading>
)

const img = (
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLImageElement> &
    ImgHTMLAttributes<HTMLImageElement>,
) => <img style={{ margin: 'auto' }} {...props} alt="Blog entry asset" />

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
      style={{ color: '#fe5caa', textDecoration: 'underline' }}
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

  if (first === '#' || first === '/') return url

  const colon = url.indexOf(':')
  if (colon === -1) return url

  const { length } = allowedLinkProtocols
  let index = -1

  // eslint-disable-next-line no-plusplus
  while (++index < length) {
    const protocol = allowedLinkProtocols[index]

    if (
      colon === protocol.length &&
      url.slice(0, protocol.length).toLowerCase() === protocol
    )
      return url
  }

  index = url.indexOf('?')
  if (index !== -1 && colon > index) return url

  index = url.indexOf('#')
  if (index !== -1 && colon > index) return url

  return '#'
}

export const components = {
  h1,
  h2,
  h3,
  a,
  blockquote: BlockQuote,
  p,
  img,
}
