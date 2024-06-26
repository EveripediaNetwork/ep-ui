import { TokenDetailsType } from '@/types/WalletBalanceType'

export const getTokenValue = (
  arrayOfTokenDetails: TokenDetailsType[],
  name: string | undefined,
) => {
  if (arrayOfTokenDetails) {
    const res = arrayOfTokenDetails.find((details) => details?.token === name)
    if (res) {
      return res.price
    }
  }
  return 0
}

export const getIqTokenValue = async () =>
  fetch('/api/token-rate?vs_currencies=usd&ids=everipedia')
    .then((response) => response.json())
    .then((data) => {
      return +data.everipedia.usd
    })
