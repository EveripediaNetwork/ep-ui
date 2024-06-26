import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateHiIQDetails } from '@/store/slices/user-slice'
import { formatEther } from 'viem'
import { getIqTokenValue } from '../utils/WalletUtils/getTokenValue'
import { provider } from '@/utils/WalletUtils/getProvider'
import config from '@/config'

const abi = [
  {
    name: 'locked',
    outputs: [
      { type: 'int128', name: 'amount' },
      { type: 'uint256', name: 'end' },
    ],
    inputs: [{ type: 'address', name: 'arg0' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

export const useHiIQBalance = (address: string | undefined | null) => {
  const dispatch = useDispatch()
  const getContractDetails = async () => {
    const balance = await provider.readContract({
      address: config.hiIqAddress as `0x${string}`,
      abi,
      functionName: 'locked',
      args: [address as `0x${string}`],
    })
    return balance
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getBalance = async () => {
    const userBalance = await getContractDetails()
    const fetchedBalance = userBalance ? BigInt(userBalance[0]) : BigInt(0)
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

  useEffect(() => {
    if (address?.length) {
      getBalance()
    }
  }, [address, dispatch, getBalance])

  return null
}
