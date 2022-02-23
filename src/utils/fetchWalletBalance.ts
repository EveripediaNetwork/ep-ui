import { tokenDetails } from '@/data/WalletData'
import {
  BalanceType,
  ParamsType,
  ErrorType,
  TokenDetailsType,
} from '@/types/WalletBalanceType'

export const fetchWalletBalance = async (
  getBalance: (config?: ParamsType) => Promise<BalanceType | ErrorType>,
  arrayOfAddresses: ParamsType[],
) => {
  const results: Promise<BalanceType | ErrorType>[] = []
  arrayOfAddresses.forEach(addr => {
    results.push(getBalance(addr))
  })

  return Promise.all(results)
}

const fetchRate = async (tokenName: string) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${tokenName}&vs_currencies=usd`,
  )
  return (await res.json())[tokenName].usd
}

export const fetchRateAndCalculateTotalBalance = async (
  walletDetails: (BalanceType | ErrorType)[],
) => {
  const prices = walletDetails.map(async wallet => {
    try {
      const tokenName: string | undefined =
        wallet.data?.symbol && tokenDetails[wallet.data?.symbol].name
      if (tokenName) {
        const rate = await fetchRate(tokenName)
        return {
          price: rate * Number(wallet.data?.formatted),
          token: wallet.data?.symbol,
        }
      }
    } catch (err) {
      // eslint-disable-next-line
      console.error(err)
    }
    return null
  })
  return Promise.all(prices)
}

export const calculateTotalBalance = (
  arrayOfTokenDetails: TokenDetailsType[],
) => {
  let total = 0
  arrayOfTokenDetails.forEach(details => {
    if (details) {
      total += details.price
    }
  })
  return total
}
