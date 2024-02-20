import { useEffect, useState } from 'react'
import { WalletBalanceType } from '@/types/WalletBalanceType'
import { maticProvider } from '@/utils/WalletUtils/getProvider'
import axios from 'axios'
import { env } from '@/env.mjs'
import { updateWalletDetails } from '@/store/slices/user-slice'
import { useDispatch } from 'react-redux'

export const getUserIQBalance = async (userAddress: string) => {
  try {
    const response = await axios.post<{ result: string }>(
      `https://eth-${
        env.NEXT_PUBLIC_IS_PRODUCTION === 'production' ? 'mainnet' : 'goerli'
      }.alchemyapi.io/v2/${env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
      {
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_call',
        params: [
          {
            from: '0x0000000000000000000000000000000000000000',
            to: env.NEXT_PUBLIC_IQ_ADDRESS,
            data: `0x70a08231000000000000000000000000${userAddress.replace(
              '0x',
              '',
            )}`,
          },
          'latest',
        ],
      },
    )

    let hexString = response.data.result
    if (hexString === '0x' || !hexString) {
      hexString = '0x0'
    }
    let IQBalance = parseInt(hexString, 16)
    IQBalance = Math.floor(IQBalance)
    return IQBalance
  } catch (error) {
    console.log(error)
    throw new Error('Error getting user IQ balance')
  }
}

export const useFetchWalletBalance = (address: string | null) => {
  const [userBalance, setUserBalance] = useState<WalletBalanceType[]>([])
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const refreshBalance = async () => {
    if (!address) {
      return
    }

    setIsLoading(true)

    try {
      const maticBalanceBigNumber = await maticProvider.getBalance({ address })
      const maticBalance = parseInt(maticBalanceBigNumber, 16) / 10e17

      const IQBalance = await getUserIQBalance(address)

      const balances: WalletBalanceType[] = [
        {
          data: {
            formatted: IQBalance.toString(),
            symbol: 'IQ',
          },
        },
        {
          data: {
            formatted: maticBalance.toString(),
            symbol: 'MATIC',
          },
        },
      ]

      setUserBalance(balances)
      dispatch(updateWalletDetails(balances))
    } catch (error) {
      console.error('Error fetching balances:', error)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    refreshBalance()
  }, [])

  return { userBalance, refreshBalance, isLoading }
}
