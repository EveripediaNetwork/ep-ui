import React, { useState } from 'react'

const WidgetLinkRender = ({ text, href }: { text: string; href: string }) => {
  const [iframeLoading, setIframeLoading] = useState(true)

  const iframeLoadHandler = () => {
    setIframeLoading(false)
  }

  const renderWidget = (src: string, title: string) => {
    return (
      <div
        className={
          iframeLoading
            ? 'embed-widget-iframe'
            : 'embed-widget-iframe embed-widget-iframe__loaded'
        }
      >
        <iframe onLoad={iframeLoadHandler} title={title} src={src} />
      </div>
    )
  }

  switch (text) {
    case 'YOUTUBE@VID':
      return renderWidget(
        `https://www.youtube.com/embed/${href}`,
        'youtube video',
      )

    case 'DUNE@EMBED':
      return renderWidget(`https://dune.com/embeds/${href}`, 'Dune Embed')

    default:
      return null
  }
}

export default WidgetLinkRender
