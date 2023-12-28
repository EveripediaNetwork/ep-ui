import { SingleLink } from '@/components/Faq/SingleLink'

/**
 * Transforms FAQ content from a string format containing custom link patterns and newline characters
 * into an array of JSX elements. The function identifies and converts custom link patterns into
 * `<SingleLink>` JSX components and handles newline characters by replacing them with appropriate
 * `<br />` JSX elements.
 *
 * The custom link pattern is identified by the presence of `#link href="URL" title="TITLE" ##link`.
 * This pattern is used to create `<SingleLink>` components with the corresponding `href` and `title` props.
 * Newline characters (`\n\n` for double newlines and `\n` for single newlines) in the text are replaced
 * with one or two `<br />` elements, respectively.
 *
 */

export const transformFAQContent = (text: string) => {
  const pattern = /#link\s+href="([^"]+)"\s+title="([^"]+)"\s*##link/g

  // Replace double and single newline characters with <br /> tags
  const updatedText = text
    .replace(/\\n\\n/g, '<br /><br />')
    .replace(/\\n/g, '<br />')

  const parts = updatedText.split(pattern)
  const texts = []

  for (let i = 0; i < parts.length; i++) {
    if (i % 3 === 1) {
      const href = parts[i]
      const title = parts[i + 1]
      texts.push(<SingleLink key={i} href={href} title={title} />)
      i++
    } else {
      // Parts that are not links will be processed here
      // Handle <br /> tags if they are present in the part
      const partWithBreaks = parts[i]
        .split('<br />')
        .map((part, index, array) => {
          return (
            <>
              {part}
              {index < array.length - 1 && <br />}
            </>
          )
        })
      texts.push(...partWithBreaks)
    }
  }

  return texts
}
