import { MarkdownRender } from '@/components/Wiki/WikiPage/WikiMainContent'
import { Wiki } from '@everipedia/iq-utils'
import React from 'react'

const EventDetailsContent = ({ event }: { event: Wiki }) => {
  let content = event?.content.replace(/<br( )*\/?>/g, '\n') || ''

  const matchRegex = /\$\$widget\d(.*?\))\$\$/
  content.match(new RegExp(matchRegex, 'g'))?.forEach((match) => {
    const widgetContent = match.match(matchRegex)?.[1]
    if (widgetContent) {
      content = content.replaceAll(match, widgetContent)
    }
  })

  const modifiedEventContent = { ...event, content }

  return (
    <div className="">
      <MarkdownRender wiki={modifiedEventContent} />
    </div>
  )
}

export default React.memo(EventDetailsContent)
