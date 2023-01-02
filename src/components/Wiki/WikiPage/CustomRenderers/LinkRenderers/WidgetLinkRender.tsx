import React, { useState } from 'react'

const WidgetLinkRender = ({ text, href }: { text: string; href: string }) => {
  const [iframeLoading, setIframeLoading] = useState(true)

  const iframeLoadHandler = () => {
    setIframeLoading(false)
  }

  const getIframe = (src: string, title: string) => (
    <iframe onLoad={iframeLoadHandler} title={title} src={src} />
  )

  const getCustomWidget = (iframe: JSX.Element, className: string) => (
    <div className={className}>{iframe}</div>
  )

  if (text === 'YOUTUBE@VID') {
    const src = `https://www.youtube.com/embed/${href}`
    const iframe = getIframe(src, 'youtube video')
    const className = iframeLoading
      ? 'embed-widget-iframe'
      : 'embed-widget-iframe embed-widget-iframe__loaded'
    return getCustomWidget(iframe, className)
  }

  if (text === 'DUNE@EMBED') {
    const src = `https://dune.com/embeds/${href}`
    const iframe = getIframe(src, 'Dune Embed')
    const className = iframeLoading
      ? 'embed-widget-iframe'
      : 'embed-widget-iframe embed-widget-iframe__loaded'
    return getCustomWidget(iframe, className)
  }

  return null
}

export default WidgetLinkRender
