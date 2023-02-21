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

      // GET ALL USER MODIFIED WIKIS
      let userModifiedWikis: Activity[] = []
      let newRecommendations: Activity[] = []
      await Promise.all([
        store.dispatch(getUserCreatedWikis.initiate({ id: userId, limit: 10 })),
        store.dispatch(getUserEditedWikis.initiate({ id: userId, limit: 10 })),
      ]).then(res => {
        const [createdWikis, editedWikis] = res
        userModifiedWikis = shuffleArray([
          ...(createdWikis.data || []),
          ...(editedWikis.data || []),
        ])
      })

      // GENERATE RECOMMENDATIONS
      if (!recommendations.length) {
        newRecommendations = userModifiedWikis
          .filter(
            (w, i, self) =>
              i === self.findIndex(t => t.content[0].id === w.content[0].id),
          )
          .filter(w => !wikiSubs?.find(s => s.auxiliaryId === w.content[0].id))
          .slice(0, 3)
      } else {
        const getNewRecommendation: () => Activity | null = () => {
          let randomWiki: Activity | null = null
          userModifiedWikis.every(w => {
            const isWikiAlreadyRecommended = recommendations.find(
              r => r.content[0].id === w.content[0].id,
            )
            const isWikiAlreadySubscribed = wikiSubs?.find(
              s => s.auxiliaryId === w.content[0].id,
            )
            if (!isWikiAlreadyRecommended && !isWikiAlreadySubscribed) {
              randomWiki = w
              return false
            }
            return true
          })
          return randomWiki
        }

        // GET NEW RECOMMENDATION
        const newWiki = getNewRecommendation()

        // REPLACE OLD SUBSCRIBED RECOMMENDATION
        newRecommendations = recommendations
          .map(r => {
            const isWikiAlreadySubscribed = wikiSubs?.find(
              s => s.auxiliaryId === r.content[0].id,
            )
            if (isWikiAlreadySubscribed) {
              return newWiki || null
            }
            return r
          })
          .filter(Boolean) as Activity[]

        while (
          userModifiedWikis.length - (wikiSubs?.length || 0) >
            newRecommendations.length &&
          newRecommendations.length < 3
        ) {
          const otherNewWiki = getNewRecommendation()
          if (otherNewWiki) {
            newRecommendations.push(otherNewWiki)
          }
        }
      }

      // SET RECOMMENDATIONS STATE
      setRecommendations(newRecommendations)
      setLoading(false)
    }
    getRecommendations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, wikiSubs])

  return { recommendations, loading }
}
