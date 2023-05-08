import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateHiIQDetails } from '@/store/slices/user-slice'
import { formatUnits } from 'viem'
import { getIqTokenValue } from '../utils/WalletUtils/getTokenValue'
import { useContractRead } from 'wagmi'

const abi = [
  'function balanceOf(address addr) view returns (uint256)',
  'function locked(address addr) view returns (int128 amount, uint256 end)',
]

const HIIQ_CONTRACT_ADDRESS = '0x1bF5457eCAa14Ff63CC89EFd560E251e814E16Ba'

const contractConfig = {
  addressOrName: HIIQ_CONTRACT_ADDRESS,
  contractInterface: abi,
}
export const useHiIQBalance = (address: string | undefined | null) => {
  const dispatch = useDispatch()

  const { data: balanceOf } = useContractRead({
    ...contractConfig,
    functionName: 'balanceOf',
    args: [address],
  })

  const { data: locked } = useContractRead({
    ...contractConfig,
    functionName: 'locked',
    args: [address],
  })

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getBalance = async () => {
      const hiiqBalance = Number(
        formatUnits(BigInt(balanceOf?.toString() ?? 0), 18),
      )
      const lockInfo = {
        iqLocked: Number(formatUnits(locked?.amount, 18)),
        end: new Date(Number(locked?.end) * 1000),
      }
      const coinGeckoIqPrice = await getIqTokenValue()

      dispatch(
        updateHiIQDetails({
          hiiqBalance,
          iqBalance: lockInfo.iqLocked,
          lockEndDate: lockInfo.end,
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
