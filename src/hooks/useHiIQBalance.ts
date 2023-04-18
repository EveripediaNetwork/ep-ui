import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateHiIQDetails } from '@/store/slices/user-slice'
import { provider } from '@/utils/WalletUtils/getProvider'
import { parseAbi, fromHex } from 'viem'
import { getIqTokenValue } from '../utils/WalletUtils/getTokenValue'

const abi = parseAbi([
  'function balanceOf(address addr) view returns (uint256)',
  'function locked(address addr) view returns (int128 amount, uint256 end)',
])

const HIIQ_CONTRACT_ADDRESS = '0x1bF5457eCAa14Ff63CC89EFd560E251e814E16Ba'

export const useHiIQBalance = (address: string | undefined | null) => {
  const dispatch = useDispatch()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getBalance = async () => {
      const balance = await provider.readContract({
        address: HIIQ_CONTRACT_ADDRESS,
        abi,
        functionName: 'balanceOf',
        args: [address as `0x${string}`],
      })

      const result = await provider.readContract({
        address: HIIQ_CONTRACT_ADDRESS,
        abi,
        functionName: 'balanceOf',
        args: ["0xFF1D1d9E1E3a88A1176870244b5a456FC42e5E90" as `0x${string}`],
      })
      console.log(result)
      console.log(result)
      console.log(result)
      console.log(result)
      const lock = await provider.readContract({
        address: HIIQ_CONTRACT_ADDRESS,
        abi,
        functionName: 'locked',
        args: [address as `0x${string}`],
      })
      const hiiqBalance = fromHex(balance as unknown as `0x${string}`, 'number')
      const [amount, end] = lock as unknown as `0x${string}`[]
      const iqBalance = fromHex(amount, 'number')
      const endDate = fromHex(end, 'number')
      const coinGeckoIqPrice = await getIqTokenValue()

      dispatch(
        updateHiIQDetails({
          hiiqBalance,
          iqBalance,
          lockEndDate: new Date(endDate * 1000),
          symbol: 'HiIQ',
          iqPrice: coinGeckoIqPrice,
          totalUsdBalance: coinGeckoIqPrice * 0,
        }),
      )
    }
    if (address?.length) {
      getBalance()
    }
  }, [address, dispatch])

  return null
}
