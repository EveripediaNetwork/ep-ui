import { TokenDetailsType } from '@/types/WalletBalanceType'

export const getTokenValue = (
  arrayOfTokenDetails: TokenDetailsType[],
  name: string | undefined,
) => {
  if (arrayOfTokenDetails) {
    const res = arrayOfTokenDetails.find(details => details?.token === name)
    if (res) {
      return res.price
    }
  }
  return 0
}
