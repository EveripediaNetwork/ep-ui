import { User } from '@/types/Wiki'
import shortenAccount from './shortenAccount'

export const getUsername = (user?: User, ensDomain?: string) => {
  if (!user) {
    return 'Unknown'
  }
  if (user.profile && user.profile.username) {
    return user.profile.username
  }
  if (ensDomain) {
    return ensDomain
  }
  return shortenAccount(user.id)
}
