import shortenAccount from './shortenAccount'

export const getAccount = (account: any, shorten = false): string => {
  if (account?.ens?.name) return account.ens?.name
  return shorten ? shortenAccount(account?.address) : account?.address
}
