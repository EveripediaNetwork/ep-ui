export const getWikiChunks = (content: string) => {
  const regex = /#+\s+.+\n+/gm
  const titles = Array.from(content.match(regex) ?? [])
  let chunks: string[] = []

  for (let i = 0; i < titles.length - 1; i++) {
    const startPos = content.indexOf(titles[i])
    const endPos = content.indexOf(titles[i + 1])

    const chunk = content.substring(startPos, endPos)
    chunks.push(chunk)
  }

  const firstChunk = content.substring(0, content.indexOf(titles[0]))
  if (firstChunk) chunks = [firstChunk, ...chunks]

  const lastChunk = content.substring(
    content.indexOf(titles[titles.length - 1]),
  )
  if (lastChunk) chunks = [...chunks, lastChunk]

  return chunks
}
