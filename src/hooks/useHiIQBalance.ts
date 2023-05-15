import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateHiIQDetails } from '@/store/slices/user-slice'
import { formatEther } from 'viem'
import { getIqTokenValue } from '../utils/WalletUtils/getTokenValue'
import { provider } from '@/utils/WalletUtils/getProvider'

const abi = [
  {
    name: 'balanceOf',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [{ type: 'address', name: 'addr' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

const HIIQ_CONTRACT_ADDRESS = '0x1bF5457eCAa14Ff63CC89EFd560E251e814E16Ba'

export const useHiIQBalance = (address: string | undefined | null) => {
  const dispatch = useDispatch()
  const getContractDetails = async (functionName: string) => {
    const balance = await provider.readContract({
      address: HIIQ_CONTRACT_ADDRESS,
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
