import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateHiIQDetails } from '@/store/slices/user-slice'
import { formatEther } from 'viem'
import { getIqTokenValue } from '../utils/WalletUtils/getTokenValue'
import { provider } from '@/utils/WalletUtils/getProvider'
import config from '@/config'

const abi = [
  {
    name: 'balanceOf',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [{ type: 'address', name: 'addr' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

export const useHiIQBalance = (address: string | undefined | null) => {
  const dispatch = useDispatch()
  const getContractDetails = async (functionName: string) => {
    const balance = await provider.readContract({
      address: config.hiIqAddress,
      abi,
      functionName: functionName,
      args: [address],
    })
    return balance
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getBalance = async () => {
      const userBalance = await getContractDetails('balanceOf')
      const fetchedBalance = userBalance ? BigInt(userBalance) : BigInt(0)
      const hiiqBalance = Number(formatEther(fetchedBalance))
      const coinGeckoIqPrice = await getIqTokenValue()
      dispatch(
        updateHiIQDetails({
          hiiqBalance,
          symbol: 'HiIQ',
          iqPrice: coinGeckoIqPrice,
          totalUsdBalance: coinGeckoIqPrice * hiiqBalance,
        }),
      )
    }
    if (address?.length) {
      getBalance()
    }
  }, [address, dispatch])

  return null
}
