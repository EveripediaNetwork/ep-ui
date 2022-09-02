import { useEffect, useState } from 'react'
import { useBalance } from 'wagmi'
import { WalletBalanceType } from '@/types/WalletBalanceType'
import config from '@/config'

export const useFetchWalletBalance = (addressOrName: string | undefined) => {
  const [userBalance, setUserBalance] = useState<WalletBalanceType[]>()
  const { data: iqData, refetch: refetchIqData } = useBalance({
    addressOrName,
    token: config.iqAddress,
  })
  const { data: maticData, refetch: refetchMaticData } = useBalance({
    addressOrName,
  })

  const refreshBalance = async () => {
    const newIqData = refetchIqData()
    const newMaticData = refetchMaticData()
    const response = await Promise.all([newIqData, newMaticData])
    const convertedResult: WalletBalanceType[] = response.map(res => ({
      data: {
        formatted: res.data?.formatted,
        symbol: res.data?.symbol,
      },
    }))
    return convertedResult
  }

  useEffect(() => {
    if (iqData && maticData) {
      const convertedIqData = {
        data: {
          formatted: iqData?.formatted,
          symbol: iqData?.symbol,
        },
      }
      const convertedMaticData = {
        data: {
          formatted: maticData?.formatted,
          symbol: maticData?.symbol,
        },
      }
      const result = [convertedIqData, convertedMaticData]
      setUserBalance(result)
    }
  }, [iqData, maticData])

  return { userBalance, refreshBalance } as const
}
