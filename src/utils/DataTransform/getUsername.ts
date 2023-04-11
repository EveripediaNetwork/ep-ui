import { Author, User } from '@everipedia/iq-utils'
import { shortenAccount } from '../textUtils'

export const getUsername = (user?: User | Author, ensDomain?: string) => {
  if (!user) {
    return 'Unknown'
  }
  if (user.profile?.username) {
    return user.profile.username
  }
  if (ensDomain) {
    return ensDomain
  }
  return user.id ? shortenAccount(user.id) : 'Unknown'
}
