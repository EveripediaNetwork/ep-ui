import { Author, User } from '@/types/Wiki'
import shortenAccount from './shortenAccount'

export const getUsername = (user?: User | Author, ensDomain?: string) => {
  if (!user) {
    return 'Unknown'
  }
  if (user.profile && user.profile.username) {
    return user.profile.username
  }
  if (ensDomain) {
    return ensDomain
  }
  return user.id ? shortenAccount(user.id) : 'Unknown'
}
