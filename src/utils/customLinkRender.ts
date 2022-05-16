import React, { ComponentPropsWithoutRef } from 'react'
import { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react'
import WikiLinkRender from '@/components/Wiki/WikiPage/CustomRenderers/WikiLinkRender'
import CiteMarksRender from '@/components/Wiki/WikiPage/CustomRenderers/CiteMarksRender'

export const customLinkRenderer = ({
  children,
  ...props
}: React.PropsWithChildren<
  ComponentPropsWithoutRef<'a'> & ReactMarkdownProps
>) => {
  // link is domain + /wiki/ + some slug
  const domain = process.env.NEXT_PUBLIC_DOMAIN || window.location.origin
  const wikiLinkRecognizer = new RegExp(`${domain}/wiki/(.*)`)
  const wikiSlug = props?.href?.match(wikiLinkRecognizer)?.[1]

  // Checks if the link is a wiki link
  const isChildrenPresent =
    children && typeof children[0] === 'string' && children[0].length > 0
  const isWikiSlugPresent = wikiSlug && wikiSlug.length > 0

  // render special hover component if the link is a wiki link
  if (isChildrenPresent && isWikiSlugPresent && props.href) {
    return React.createElement(WikiLinkRender, {
      text: children[0] as string,
      href: props.href,
      slug: wikiSlug,
    })
  }

  // Check if the link is a cite-id
  const isCiteIdPresent = props.href && props.href.match(/#cite-id-(.*)/)
  if (isCiteIdPresent) {
    return React.createElement(CiteMarksRender, {
      text: children[0] as string,
      href: props.href,
    })
  }

  return React.createElement(props.node.tagName, props, children)
}
