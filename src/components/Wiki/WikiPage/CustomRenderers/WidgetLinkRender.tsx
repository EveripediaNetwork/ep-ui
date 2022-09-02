import React from 'react'

const WidgetLinkRender = ({ text, href }: { text: string; href: string }) => {
  if (text === 'YOUTUBE@VID') {
    return (
      <div className="wiki-widget-yt-iframe">
        <iframe
          title="youtube video"
          src={`https://www.youtube.com/embed/${href}`}
        />
      </div>
    )
  }
  return null
}

export default WidgetLinkRender
