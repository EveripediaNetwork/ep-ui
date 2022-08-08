import React, { useRef, useState, useEffect } from 'react'
import { isAddress } from 'ethers/lib/utils'
import { Heading, Text } from '@chakra-ui/react'
import Embed from 'react-embed'
import routeToBlock from 'react-embed/lib/routeToBlock'
import useSWR from 'swr'
import axios from 'axios'
import NextImage from 'next/image'

const TextMedia = ({ media }: any) => {
  const [content, setContent] = useState<any>(null)

  useEffect(() => {
    fetch(media)
      .then(r => r.text())
      .then(r => setContent(r))
  }, [])

  return <div>{content}</div>
}

const Image = ({ alt, src }: any) => {
  return (
    <figure>
      <NextImage width={100} height={100} src={src} />
      {alt && <figcaption>{alt}</figcaption>}
    </figure>
  )
}

// eslint-disable-next-line jsx-a11y/media-has-caption
const AudioMedia = ({ media }: any) => <audio controls src={media} />

const VideoMedia = ({ media }: any) => {
  const videoRef = useRef<any>(null)
  const [isMuted, setMuted] = useState(true)

  useEffect(() => {
    if (videoRef && videoRef.current) videoRef.current.muted = isMuted
  }, [isMuted])

  return (
    <div className="relative">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <video ref={videoRef} muted autoPlay controls={false} loop playsInline>
        <source src={media} />
      </video>
      {/* eslint-disable-next-line react/button-has-type */}
      <button
        onClick={() => setMuted(state => !state)}
        style={{ backdropFilter: 'blur(2px) brightness(1.3)' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isMuted ? (
            <>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                clipRule="evenodd"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </>
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          )}
        </svg>
      </button>
    </div>
  )
}

const Media = ({ media, mediaMimeType }: any) => {
  if (mediaMimeType?.includes('text')) return <TextMedia media={media} />

  if (mediaMimeType?.includes('video')) return <VideoMedia media={media} />

  if (mediaMimeType?.includes('audio')) return <AudioMedia media={media} />

  return <img src={media} alt="mirror mdia component" />
}

const toTrimmedAddress = (value: string) => {
  if (!value) return ''
  return `${value.substr(0, 6)}…${value.substr(value.length - 4, value.length)}`
}

const tsFormat = (value: string) => {
  // eslint-disable-next-line radix
  const dateObj = new Date(parseInt(value) * 1000)

  return `${String(dateObj.getUTCDate()).padStart(2, '0')}/${String(
    dateObj.getUTCMonth() + 1,
  ).padStart(2, '0')}/${dateObj.getUTCFullYear() - 2000}`
}

export const shouldEmbed = (url: string) => {
  return routeToBlock([] as any, new URL(url) as any) !== undefined
}

const NFT = ({
  data: {
    name,
    description,
    ownerOf,
    ownerOfUrl,
    creatorOf,
    platform,
    platformUrl,
    mediaUrl,
    mediaPageUrl,
    mediaMimeType,
    timestamp,
  },
}: any) => {
  return (
    <div data-nft>
      <section>
        <span>
          {isAddress(creatorOf) ? toTrimmedAddress(creatorOf) : creatorOf}
        </span>

        <a href={mediaPageUrl} target="_blank" rel="noreferrer">
          <svg viewBox="0 0 177 68" fill="currentColor">
            <path
              d="M17.405 64.127l5.324-24.978c1.127-5.098 2.15-11.419 2.56-15.802.819 3.058 2.662 8.767 4.3 13.05l10.75 28.24c1.024 2.548 1.331 2.956 2.355 3.262.41.081.492.098 1.556.101h11.606c3.232-.02 3.365-.3 4.141-3.873L72.693 4.894c.205-1.02.307-1.937.307-2.345 0-.816-.307-1.326-.921-1.937C71.464.102 71.157 0 68.597 0h-8.19c-3.89 0-3.993.102-4.812 3.874L50.68 26.813c-.921 4.588-2.355 13.05-2.764 17.637-1.024-3.568-2.867-9.073-4.403-13.05L33.07 3.365C32.046.816 31.842.408 30.715.102a16.23 16.23 0 00-.14-.028l-.126-.022c-.246-.039-.491-.049-1.29-.051L28.448 0H17.712c-3.788 0-3.89.102-4.71 3.874L.308 63.107C.102 64.127 0 65.044 0 65.452c0 .815.307 1.325.921 1.937.588.487.895.602 3.16.611h9.096c3.32-.02 3.452-.3 4.228-3.873zm65.413 0l4.812-22.328h25.35c3.233-.02 3.366-.3 4.142-3.874l1.126-5.097c.41-1.733.41-1.835.41-2.345 0-.816-.308-1.325-.922-1.937-.614-.51-.922-.612-3.482-.612H90.6l2.765-13.151h29.184c3.789 0 3.891-.102 4.71-3.772l1.331-6.117c.362-1.53.404-1.789.41-2.179v-.166c0-.816-.307-1.326-.922-1.937-.614-.51-.921-.612-3.481-.612H82.715c-3.789 0-3.891.102-4.71 3.772L65.307 63.107c-.205 1.02-.307 1.937-.307 2.345 0 .815.307 1.325.922 1.937.587.487.894.602 3.16.611h9.595c3.334-.02 3.46-.295 4.14-3.873zm61.259 0l10.564-49.344h16c3.795 0 3.897-.102 4.718-3.772l1.333-6.117c.205-1.122.308-1.836.308-2.345 0-.816-.308-1.326-.923-1.937-.615-.51-.923-.612-3.487-.612h-49.231c-3.795 0-3.897.102-4.718 3.772l-1.333 6.117c-.205 1.02-.308 1.937-.308 2.345 0 .816.308 1.325.923 1.937.615.51.923.612 3.487.612h15.385l-10.257 48.324c-.307 1.427-.41 1.835-.41 2.345 0 .815.308 1.325.923 1.937.589.487.896.602 3.166.611h9.624c3.326-.02 3.459-.3 4.236-3.873z"
              fill="currentColor"
              fillRule="nonzero"
            />
          </svg>
        </a>
      </section>

      {mediaUrl && mediaMimeType && (
        <section className="nfte__media">
          <Media media={mediaUrl} mediaMimeType={mediaMimeType} />
        </section>
      )}

      <div className="pt-3 pb-4 px-6">
        <div>
          <p>
            Collected by{' '}
            <a href={ownerOfUrl}>
              {isAddress(ownerOf) ? toTrimmedAddress(ownerOf) : ownerOf}
            </a>
          </p>
          <a target="_blank" href={mediaPageUrl} rel="noreferrer">
            <span>
              {mediaPageUrl?.includes('etherscan.io') ? 'View' : 'Buy / Bid'}
            </span>{' '}
            <span>→</span>
          </a>
        </div>

        <p>{name}</p>
        <p>{description}</p>

        <div className="!mt-4">
          <span>{tsFormat(timestamp)}</span>
          <a target="_blank" href={platformUrl} rel="noreferrer">
            <span>
              {isAddress(platform) ? toTrimmedAddress(platform) : platform}
            </span>{' '}
            <span>→</span>
          </a>
        </div>
      </div>
    </div>
  )
}

const EntryLink = ({ href, children, className }: any) => {
  if (
    href.startsWith('/') ||
    (typeof window !== 'undefined' && href.startsWith(window.location.origin))
  ) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }

  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a
      href={href}
      target={href.startsWith('#') ? '' : '_blank'}
      rel="noopener"
      className={className}
    >
      {children}
    </a>
  )
}

const OpenGraph = ({ url, children }: any) => {
  const { data, error } = useSWR(`/api/link-preview?url=${url}`, newUrl =>
    axios.get(newUrl).then(res => res.data),
  )
  const isLoading = !data && !error

  if (error) return <EntryLink href={url}>{children}</EntryLink>

  return (
    <figure>
      {isLoading ? (
        <div>
          <svg
            className="w-6 h-6 animate-spin text-black dark:text-white text-opacity-40"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="32"
              cx="12"
              cy="12"
              r="10"
            />
            <circle
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              cx="12"
              cy="12"
              r="10"
              opacity="0.25"
            />
          </svg>
        </div>
      ) : (
        <EntryLink className="block" href={url}>
          <div>
            <div>
              <img src={data.image.url} alt={data.title} />
            </div>
            <div className="py-5 px-5">
              <p>{data.title}</p>
              <p>{data.description}</p>
              <div>
                <span />
                <p>{new URL(data.url).hostname}</p>
              </div>
            </div>
          </div>
        </EntryLink>
      )}
    </figure>
  )
}

const BlockQuote = ({ children }: any) => {
  return <blockquote>{children}</blockquote>
}

const Block = ({ children }: any) => {
  const blockAwareChildren = children.map((child: any) => {
    if (child.props.node) child.props.node.blockSize = children.length

    return child
  })

  return <Text>{blockAwareChildren}</Text>
}

const h1 = ({ children }: any) => {
  return (
    <Heading as="h1" mt={8} mb={4}>
      {children}
    </Heading>
  )
}

const h2 = ({ children }: any) => {
  return (
    <Heading as="h2" mt={8} mb={4}>
      {children}
    </Heading>
  )
}

const h3 = ({ children }: any) => {
  return (
    <Heading as="h3" mt={8} mb={4}>
      {children}
    </Heading>
  )
}

const a = ({ href, children, ...props }: any) => {
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

const LinkOrEmbed = ({ href, children, node: { blockSize } }: any) => {
  const ensDomain = 'justincast.eth'

  if (blockSize !== 1) return <EntryLink href={href}>{children}</EntryLink>

  if (new URL(href).protocol === 'ethereum:') {
    const [contract, tokenId] = href
      .split('ethereum://')[1]
      .substring(2)
      .split('/')

    return <NFT contract={contract} tokenId={tokenId} />
  }

  if (new URL(href).protocol === 'crowdfund:') {
    const [, crowdfundAddress] = href.match(/crowdfund:\/\/(\w*)/m)

    return (
      <EntryLink
        href={`https://${ensDomain}.mirror.xyz/crowdfunds/${crowdfundAddress}`}
      >
        {children}
      </EntryLink>
    )
  }

  if (typeof window !== 'undefined' && shouldEmbed(href)) {
    return <Embed url={href} isDark />
  }

  return <OpenGraph url={href}>{children}</OpenGraph>
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
  image: Image,
  link: LinkOrEmbed,
  blockquote: BlockQuote,
  paragraph: Block,
}
