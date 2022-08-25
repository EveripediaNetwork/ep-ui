import { store } from '@/store/store'
import { postWikiViewCount } from '.'

export const incrementWikiViewCount = async (slug: string) => {
  if (!slug) return

  const visitedWikis: { slug: string; timestamp: number }[] = JSON.parse(
    localStorage.getItem('VISITED_WIKIS') || '[]',
  )
  const visitedWiki = visitedWikis.find(w => w.slug === slug)

  if (
    !visitedWiki ||
    (visitedWiki && Date.now() - visitedWiki.timestamp > 1000 * 60 * 60)
  ) {
    store.dispatch(postWikiViewCount.initiate(slug))
    if (visitedWikis.length > 20) {
      visitedWikis.shift()
    }
    visitedWikis.push({ slug, timestamp: Date.now() })
    localStorage.setItem('VISITED_WIKIS', JSON.stringify(visitedWikis))
  }
}
