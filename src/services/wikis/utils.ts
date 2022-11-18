import { store } from '@/store/store'
import { Activity } from '@/types/ActivityDataType'
import { useEffect, useState } from 'react'
import { getUserCreatedWikis, getUserEditedWikis, postWikiViewCount } from '.'
import { useGetAllWikiSubscriptionQuery } from '../notification'

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

function shuffleArray(a: Activity[]) {
  const array = [...a]
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const useWikiSubRecommendations = (userId?: string) => {
  const [recommendations, setRecommendations] = useState<Activity[]>([])
  const { data: wikiSubs } = useGetAllWikiSubscriptionQuery(userId || '')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getRecommendations = async () => {
      if (!userId) return
      setLoading(true)
      await Promise.all([
        store.dispatch(getUserCreatedWikis.initiate({ id: userId, limit: 10 })),
        store.dispatch(getUserEditedWikis.initiate({ id: userId, limit: 10 })),
      ]).then(res => {
        const [createdWikis, editedWikis] = res
        setRecommendations(
          shuffleArray([
            ...(createdWikis.data || []),
            ...(editedWikis.data || []),
          ])
            .filter(w => !wikiSubs?.find(s => s.auxiliaryId === w.wikiId))
            .slice(0, 3),
        )
        setLoading(false)
      })
    }
    getRecommendations()
  }, [userId, wikiSubs])

  return { recommendations, loading }
}
