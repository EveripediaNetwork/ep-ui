import { SingleLink } from '@/components/Faq/SingleLink'

/**
 * Transforms FAQ content from a string format containing custom link patterns, iframe embed patterns,
 * and newline characters into an array of JSX elements. The function identifies and converts custom
 * link patterns into `<SingleLink>` JSX components and iframe embed patterns into `<iframe>` JSX components,
 * while handling newline characters by replacing them with appropriate `<br />` JSX elements.
 *
 * The custom link pattern is identified by the presence of `#link href="URL" title="TITLE" ##link`.
 * This pattern is used to create `<SingleLink>` components with the corresponding `href` and `title` props.
 *
 * The iframe embed pattern is recognized as `<iframe title="TITLE" src="SRC" />`.
 * This pattern is used to create `<iframe>` components with the corresponding `title` and `src` attributes.
 *
 * Newline characters (`\\n\\n` for double newlines and `\\n` for single newlines) in the text are replaced
 * with one or two `<br />` elements, respectively. This allows for proper formatting of the content
 * as an array of JSX elements, suitable for rendering in a React application.
 */

export const transformFAQContent = (text: string) => {
  const linkPattern = /#link\s+href="([^"]+)"\s+title="([^"]+)"\s*##link/g
  const iframePattern = /<iframe\s+title="([^"]+)"\s+src="([^"]+)"\s*\/>/g

  const updatedText = text
    .replace(/\\n\\n/g, '<br /><br />')
    .replace(/\\n/g, '<br />')

  const parts = updatedText.split(/(<br \/>)/g) // Splitting by <br /> tags
  const texts: any[] = []

  parts.forEach((part, index) => {
    if (part.match(linkPattern)) {
      // Handle links
      const linkParts = part.split(linkPattern)
      linkParts.forEach((linkPart, linkIndex) => {
        if (linkIndex % 3 === 1) {
          const href = linkParts[linkIndex]
          const title = linkParts[linkIndex + 1]
          texts.push(
            <SingleLink
              key={`link-${index}-${linkIndex}`}
              href={href}
              title={title}
            />,
          )
        } else {
          texts.push(linkPart)
        }
      })
    } else if (part.match(iframePattern)) {
      // Handle iframes
      const iframeParts = part.split(iframePattern)
      iframeParts.forEach((iframePart, iframeIndex) => {
        if (iframeIndex % 3 === 1) {
          const title = iframeParts[iframeIndex]
          const src = iframeParts[iframeIndex + 1]
          texts.push(
            <iframe
              key={`iframe-${index}-${iframeIndex}`}
              title={title}
              src={src}
            />,
          )
        } else {
          texts.push(iframePart)
        }
      })
    } else if (part === '<br />') {
      texts.push(<br key={`br-${index}`} />)
    } else {
      texts.push(part)
    }
  })

  return texts
}
