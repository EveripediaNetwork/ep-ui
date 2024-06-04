import { useCallback, useEffect, useState } from 'react'
import { WalletBalanceType } from '@/types/WalletBalanceType'
import { updateWalletDetails } from '@/store/slices/user-slice'
import { useDispatch } from 'react-redux'
import { useAccount, useBalance, useReadContract } from 'wagmi'
import config from '@/config'
import IQABI from '@/abi/erc20Abi'

export const useFetchWalletBalance = () => {
  const [userBalance, setUserBalance] = useState<WalletBalanceType[]>([])
  const dispatch = useDispatch()
  const { address } = useAccount()
  const { data, isLoading: isBalanceLoading } = useBalance({
    address,
  })

  const { data: iqData } = config.isProduction
    ? useReadContract({
        address: config.iqAddress as `0x${string}`,
        abi: IQABI,
        functionName: 'balanceOf',
        args: [address as `0x${string}`],
      })
    : { data: null }

  const [isLoading, setIsLoading] = useState(false)

  const refreshBalance = useCallback(async () => {
    if (!address) {
      return
    }

    setIsLoading(true)

    try {
      const nativeBalance = data?.formatted ?? 0
      const iqBalance = iqData ?? 0
      const balances: WalletBalanceType[] = [
        {
          data: {
            formatted: String(nativeBalance),
            symbol: config.isProduction ? 'MATIC' : 'IQ',
          },
        },
      ]
      config.isProduction &&
        balances.push({
          data: {
            formatted: String(iqBalance),
            symbol: 'IQ',
          },
        })

      setUserBalance(balances)
      dispatch(updateWalletDetails(balances))
    } catch (error) {
      console.error('Error fetching balances:', error)
    } finally {
      setIsLoading(false)
    }
  }, [address, dispatch, data])

  useEffect(() => {
    refreshBalance()
  }, [address, dispatch, refreshBalance])

  return {
    userBalance,
    refreshBalance,
    isLoading: isLoading || isBalanceLoading,
  }
}
