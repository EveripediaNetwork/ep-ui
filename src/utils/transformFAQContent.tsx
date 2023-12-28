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

  // Replace double and single newline characters with <br /> tags
  const updatedText = text
    .replace(/\\n\\n/g, '<br /><br />')
    .replace(/\\n/g, '<br />')

  const parts = updatedText.split(linkPattern)
  const texts = []

  for (let i = 0; i < parts.length; i++) {
    // Handle links
    if (parts[i].match(iframePattern)) {
      const iframeParts = parts[i].split(iframePattern)
      for (let j = 0; j < iframeParts.length; j++) {
        if (j % 3 === 1) {
          const title = iframeParts[j]
          const src = iframeParts[j + 1]
          texts.push(
            <iframe key={`iframe-${i}-${j}`} title={title} src={src} />,
          )
          j++
        } else {
          texts.push(iframeParts[j])
        }
      }
    } else if (i % 3 === 1) {
      const href = parts[i]
      const title = parts[i + 1]
      texts.push(<SingleLink key={`link-${i}`} href={href} title={title} />)
      i++
    } else {
      // Parts that are not links or iframes will be processed here
      const partWithBreaks = parts[i]
        .split('<br />')
        .map((part, index, array) => (
          <>
            {part}
            {index < array.length - 1 && <br />}
          </>
        ))
      texts.push(...partWithBreaks)
    }
  }

  return texts
}
