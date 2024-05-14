import { useEffect, useState } from 'react'
import { WalletBalanceType } from '@/types/WalletBalanceType'
import { updateWalletDetails } from '@/store/slices/user-slice'
import { useDispatch } from 'react-redux'
import { useAccount, useBalance } from 'wagmi'

export const useFetchWalletBalance = () => {
  const [userBalance, setUserBalance] = useState<WalletBalanceType[]>([])
  const dispatch = useDispatch()
  const { address } = useAccount()
  const { data, isLoading: isBalanceLoading } = useBalance({
    address,
  })
  const [isLoading, setIsLoading] = useState(false)

  const refreshBalance = async () => {
    if (!address) {
      console.log('Address is undefined')
      return
    }

    setIsLoading(true)

    try {
      const IQBalance = data?.formatted ?? 0

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

  return {
    userBalance,
    refreshBalance,
    isLoading: isLoading || isBalanceLoading,
  }
}
