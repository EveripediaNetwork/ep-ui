import { getTokenStats } from '@/services/token-stats'
import { store } from '@/store/store'

export const fetchTokenStats = async () => {
  const { data } = await store.dispatch(getTokenStats.initiate('everipedia'))

  return data
}
