import React, { ComponentPropsWithoutRef } from 'react'
import { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react'
import CiteMarksRender from '@/components/Wiki/WikiPage/CustomRenderers/LinkRenderers/CiteMarksRender'
import config from '@/config'
import { whiteListedLinkNames } from '@everipedia/iq-utils'
import { isValidUrl } from '@/utils/CreateWikiUtils/createWiki'
import WikiLinkRender from './LinkRenderers/WikiLinkRender'
import WidgetLinkRender from './LinkRenderers/WidgetLinkRender'

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
    return <WikiLinkRender href={linkHref} text={linkText} slug={wikiSlug} />
  }

  const isCiteIdPresent = linkHref && linkHref.match(/#cite-id-(.*)/)
  if (isCiteIdPresent) {
    return (
      <CiteMarksRender
        referencesString={referencesString}
        href={linkHref}
        text={linkText as string}
      />
    )
  }

  const isWidgetLink =
    linkText &&
    linkHref &&
    whiteListedLinkNames.includes(linkText) &&
    !isValidUrl(linkHref)
  if (isWidgetLink) {
    return <WidgetLinkRender text={linkText as string} href={linkHref} />
  }

  return React.createElement(props.node.tagName, props, children)
}
