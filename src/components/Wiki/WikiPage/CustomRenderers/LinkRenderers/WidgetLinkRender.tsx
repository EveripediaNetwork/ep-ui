import React, { useEffect, useState } from 'react'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

const WidgetLinkRender = ({ text, href }: { text: string; href: string }) => {
  const [iframeLoading, setIframeLoading] = useState(true)
  const [isInView, setIsInView] = useState(false)
  const widgetRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true)
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    )
    observer.observe(widgetRef.current as Element)

    return () => observer.disconnect()
  }, [])

  const iframeLoadHandler = () => {
    setIframeLoading(false)
  }

  const renderWidget = (src: string, title: string, type: string) => {
    if (type === 'youtube') {
      return (
        <div
          ref={widgetRef}
          className="embed-widget-iframe embed-widget-iframe__loaded"
        >
          {isInView ? <LiteYouTubeEmbed id={src} title="" /> : <article />}
        </div>
      )
    }
    return (
      <div
        ref={widgetRef}
        className={
          iframeLoading
            ? 'embed-widget-iframe'
            : 'embed-widget-iframe embed-widget-iframe__loaded'
        }
      >
        {isInView ? (
          <iframe
            className={type === 'dune' ? 'embed-widget-iframe-dune-bg' : ''}
            onLoad={iframeLoadHandler}
            loading="lazy"
            title={title}
            src={src}
          />
        ) : (
          <article />
        )}
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
