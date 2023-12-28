import { SingleLink } from '@/components/Faq/SingleLink'

export const transformFAQContent = (text: string) => {
  const pattern = /#link\s+href="([^"]+)"\s+title="([^"]+)"\s*##link/g
  const parts = text.split(pattern)
  const texts = []

  for (let i = 0; i < parts.length; i++) {
    if (i % 3 === 1) {
      const href = parts[i]
      const title = parts[i + 1]
      texts.push(<SingleLink key={i} href={href} title={title} />)
      i++
    } else {
      texts.push(parts[i])
    }
  }

  return texts
}
