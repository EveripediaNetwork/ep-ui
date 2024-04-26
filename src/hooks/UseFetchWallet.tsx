import { useEffect, useState } from 'react'
import { WalletBalanceType } from '@/types/WalletBalanceType'
import axios from 'axios'
import { env } from '@/env.mjs'
import { updateWalletDetails } from '@/store/slices/user-slice'
import { useDispatch } from 'react-redux'
import config from '@/config'
import { useBalance } from 'wagmi'

export const getUserIQBalance = async (userAddress: string) => {
  try {
    const response = await axios.post<{ result: string }>(
      `https://eth-mainnet.alchemyapi.io/v2/${env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
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
  const { data } = useBalance({
    address: address as `0x${string}`,
  })

  const refreshBalance = async () => {
    if (!address) {
      console.log('Address is undefined')
      return
    }

    setIsLoading(true)

    try {
      const IQBalance = JSON.parse(config.isProduction)
        ? await getUserIQBalance(address)
        : data?.formatted

      const balances: WalletBalanceType[] = [
        {
          data: {
            formatted: String(IQBalance),
            symbol: 'IQ',
          },
        },
      ]

      setUserBalance(balances)
      dispatch(updateWalletDetails(balances))
    } catch (error) {
      console.error('Error fetching balances:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshBalance()
  }, [address])

  return { userBalance, refreshBalance, isLoading }
}
