import React, { ComponentPropsWithoutRef } from 'react'
import { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react'
import WikiLinkRender from '@/components/Wiki/WikiPage/CustomRenderers/WikiLinkRender'
import CiteMarksRender from '@/components/Wiki/WikiPage/CustomRenderers/CiteMarksRender'
import config from '@/config'
import { whiteListedLinkNames } from '@/types/Wiki'
import WidgetLinkRender from '@/components/Wiki/WikiPage/CustomRenderers/WidgetLinkRender'
import { isValidUrl } from './create-wiki'

export const customLinkRenderer = ({
  children,
  referencesString,
  ...props
}: React.PropsWithChildren<
  ComponentPropsWithoutRef<'a'> &
    ReactMarkdownProps & { referencesString?: string }
>) => {
  const linkHref = props.href
  const linkText = typeof children[0] === 'string' ? children[0] : ''

  const wikiSlug = linkHref?.match(
    new RegExp(`${config.publicDomain}/wiki/(.*)`),
  )?.[1]

  const isWikiLink = linkText.length > 0 && wikiSlug
  if (isWikiLink) {
    return React.createElement(WikiLinkRender, {
      text: linkText,
      href: linkHref,
      slug: wikiSlug,
    })
  }

  const isCiteIdPresent = linkHref && linkHref.match(/#cite-id-(.*)/)
  if (isCiteIdPresent) {
    return React.createElement(CiteMarksRender, {
      referencesString,
      text: linkText as string,
      href: linkHref,
    })
  }

  const isWidgetLink =
    linkText &&
    linkHref &&
    whiteListedLinkNames.includes(linkText) &&
    !isValidUrl(linkHref)
  if (isWidgetLink) {
    return React.createElement(WidgetLinkRender, {
      text: linkText as string,
      href: linkHref,
    })
  }

  return React.createElement(props.node.tagName, props, children)
}
