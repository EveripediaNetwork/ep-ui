import removeMd from 'remove-markdown'

const HEADING_REGEX = /^#+ .*$/
const WIDGET_REGEX = /^\$\$widget\d(.*?\))\$\$$/
const MARKDOWN_LINK_REGEX = /^\[(.*)\]\(.*\)$/
const MARKDOWN_IMAGE_REGEX = /^!\[.*\]\(.*\)$/
const CITATION_REGEX = /\[\\\[\d+\\\]\]\(#cite-id-[a-z0-9]+\)/gm

const MAX_PARA_COUNT = 3

export const sanitizeContent = (content: string) => {
  const contentParagraphs = content.split('\n  \n')

  const filteredParagraphs = contentParagraphs.filter(paragraph => {
    const para = paragraph.trim()
    const isValidParagraph =
      para.length !== 0 &&
      !para.match(MARKDOWN_IMAGE_REGEX) &&
      !para.match(MARKDOWN_LINK_REGEX) &&
      !para.match(WIDGET_REGEX)

    return isValidParagraph
  })

  const sanitizedParagraphs: string[] = []
  let count = 0

  filteredParagraphs.every(paragraph => {
    if (count >= MAX_PARA_COUNT) return false

    const trimmedParagraph = paragraph.trim()
    const plainTextParagraph = removeMd(trimmedParagraph)
    const sanitizedParagraph = plainTextParagraph.replace(CITATION_REGEX, '')
    const isHeading = HEADING_REGEX.test(trimmedParagraph)

    if (!isHeading) {
      sanitizedParagraphs.push(sanitizedParagraph)
      count += 1
    } else sanitizedParagraphs.push(trimmedParagraph)

    return true
  })

  return sanitizedParagraphs.join('\n\n')
}
