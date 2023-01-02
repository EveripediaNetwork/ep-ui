import React from 'react'

const WidgetLinkRender = ({ text, href }: { text: string; href: string }) => {
  if (text === 'YOUTUBE@VID') {
    return (
      <div className="embed-widget-iframe">
        <iframe
          title="youtube video"
          src={`https://www.youtube.com/embed/${href}`}
        />
      </div>
    )
  }

  if (text === 'DUNE@EMBED') {
    return (
      <div className="embed-widget-iframe">
        <iframe title="Dune Embed" src={`https://dune.com/embeds/${href}`} />
      </div>
    )
  }
  return null
}

export default WidgetLinkRender
