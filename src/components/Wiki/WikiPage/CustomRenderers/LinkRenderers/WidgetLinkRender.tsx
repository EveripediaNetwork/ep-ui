import React, { useState } from 'react'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

const WidgetLinkRender = ({ text, href }: { text: string; href: string }) => {
  const [iframeLoading, setIframeLoading] = useState(true)

  const iframeLoadHandler = () => {
    setIframeLoading(false)
  }

  const renderWidget = (src: string, title: string, type: string) => {
    if (type === 'youtube') {
      return (
        <div className="embed-widget-iframe embed-widget-iframe__loaded">
          <LiteYouTubeEmbed id={src} title="" />
        </div>
      )
    }
    return (
      <div
        className={
          iframeLoading
            ? 'embed-widget-iframe'
            : 'embed-widget-iframe embed-widget-iframe__loaded'
        }
      >
        <iframe
          className={type === 'dune' ? 'embed-widget-iframe-dune-bg' : ''}
          onLoad={iframeLoadHandler}
          loading="lazy"
          title={title}
          src={src}
        />
      </div>
    )
  }

  switch (text) {
    case 'YOUTUBE@VID':
      return renderWidget(href, 'youtube video', 'youtube')

    case 'DUNE@EMBED':
      return renderWidget(
        `https://dune.com/embeds/${href}`,
        'Dune Embed',
        'dune',
      )

    default:
      return null
  }
}

export default WidgetLinkRender
