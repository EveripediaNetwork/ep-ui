import { Wiki } from '@everipedia/iq-utils'

export interface TrendingData {
  todayTrending: Wiki[]
  weekTrending: Wiki[]
  monthTrending: Wiki[]
}
