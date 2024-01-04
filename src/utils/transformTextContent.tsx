// import { SingleLink } from '@/components/Faq/SingleLink'
import React from 'react'
import { SingleLink } from '@/components/Faq/SingleLink'

/**
 * Transforms text content from a string format containing custom bold patterns, link patterns,
 * iframe embed patterns, and newline characters into an array of JSX elements. The function identifies
 * and converts custom bold patterns into <b> tags, custom link patterns into <SingleLink> JSX components,
 * and iframe embed patterns into <iframe> JSX components, while handling newline characters by
 * replacing them with appropriate <br /> JSX elements.
 *
 * The custom bold pattern is identified by the presence of `**text **bold`.
 * This pattern is used to create <b> tags for the bold text.
 *
 * The custom link pattern is identified by `#link href="URL" title="TITLE" ##link`.
 * This pattern is used to create <SingleLink> components with the corresponding `href` and `title` props.
 *
 * The iframe embed pattern is recognized as `<iframe title="TITLE" src="SRC" />`.
 * This pattern is used to create <iframe> components with the corresponding `title` and `src` attributes.
 *
 * Newline characters (`\\n\\n` for double newlines and `\\n` for single newlines) in the text
 * are replaced with one or two <br /> elements, respectively. This allows for proper formatting
 * of the content as an array of JSX elements, suitable for rendering in a React application.
 */

export const transformTextContent = (text: string) => {
  const boldPattern = /\*\*(.*?)\s+\*\*bold/g
  const linkPattern = /#link\s+href="([^"]+)"\s+title="([^"]+)"\s*##link/g
  const iframePattern = /<iframe\s+title="([^"]+)"\s+src="([^"]+)"\s*\/>/g

  const updatedText = text.replace(/\\n\\n/g, '\n\n').replace(/\\n/g, '\n')

  const lines = updatedText.split('\n')
  const elements: JSX.Element[] = []

  lines.forEach((line, index) => {
    const parts: JSX.Element[] = []
    let lastIndex = 0

    // Search for bold text
    boldPattern.lastIndex = 0
    let match = boldPattern.exec(line)
    while (match) {
      const [matchedText, boldText] = match
      if (match.index > lastIndex) {
        parts.push(
          <React.Fragment key={`${index}-${lastIndex}`}>
            {line.substring(lastIndex, match.index)}
          </React.Fragment>,
        )
      }
      parts.push(<b key={`${index}-${match.index}`}>{boldText}</b>)
      lastIndex = match.index + matchedText.length
      match = boldPattern.exec(line)
    }

    // Search for links
    linkPattern.lastIndex = 0
    match = linkPattern.exec(line)
    while (match) {
      const [matchedText, href, title] = match
      if (match.index > lastIndex) {
        parts.push(
          <React.Fragment key={`${index}-${lastIndex}`}>
            {line.substring(lastIndex, match.index)}
          </React.Fragment>,
        )
      }
      parts.push(
        <SingleLink
          key={`${index}-${match.index}`}
          href={href}
          title={title}
        />,
      )
      lastIndex = match.index + matchedText.length
      match = linkPattern.exec(line)
    }

    // Search for iframes
    iframePattern.lastIndex = 0
    match = iframePattern.exec(line)
    while (match) {
      const [matchedText, title, src] = match
      if (match.index > lastIndex) {
        parts.push(
          <React.Fragment key={`${index}-${lastIndex}`}>
            {line.substring(lastIndex, match.index)}
          </React.Fragment>,
        )
      }
      parts.push(
        <iframe
          key={`${index}-${match.index}`}
          title={title}
          src={src}
          style={{ width: '100%', height: '300px', border: 'none' }}
        />,
      )
      lastIndex = match.index + matchedText.length
      match = iframePattern.exec(line)
    }

    // Add remaining text
    if (lastIndex < line.length) {
      parts.push(
        <React.Fragment key={`${index}-${lastIndex}`}>
          {line.substring(lastIndex)}
        </React.Fragment>,
      )
    }

    // Combine into a single element
    elements.push(<React.Fragment key={index}>{parts}</React.Fragment>)

    // Add line breaks except for the last line
    if (index < lines.length - 1) {
      elements.push(<br key={`br-${index}`} />)
    }
  })

  return elements
}
