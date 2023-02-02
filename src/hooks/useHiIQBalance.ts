import { useEffect } from 'react'
import { Contract } from '@ethersproject/contracts'
import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits } from '@ethersproject/units'
import { useDispatch } from 'react-redux'
import { updateHiIQDetails } from '@/store/slices/user-slice'
import { provider } from '@/utils/DataFetching/blockchainRelated/getProvider'
import { getIqTokenValue } from '../utils/DataFetching/blockchainRelated/getTokenValue'

const abi = [
  'function balanceOf(address addr) view returns (uint256)',
  'function locked(address addr) view returns (int128 amount, uint256 end)',
]

const HIIQ_CONTRACT_ADDRESS = '0x1bF5457eCAa14Ff63CC89EFd560E251e814E16Ba'
const hiiqContract = new Contract(HIIQ_CONTRACT_ADDRESS, abi, provider)

export const useHiIQBalance = (address: string | undefined | null) => {
  const dispatch = useDispatch()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const getBalance = async () => {
      const hiiqBalance = await hiiqContract
        .balanceOf(address)
        .then((r: BigNumber) => Number(formatUnits(r, 18)))
      const lockInfo = await hiiqContract
        .locked(address)
        .then(([amount, end]: [BigNumber, BigNumber]) => ({
          iqLocked: Number(formatUnits(amount, 18)),
          end: new Date(end.toNumber() * 1000),
        }))

      const coinGeckoIqPrice = await getIqTokenValue()

      dispatch(
        updateHiIQDetails({
          hiiqBalance,
          iqBalance: lockInfo.iqLocked,
          lockEndDate: lockInfo.end,
          symbol: 'HiIQ',
          iqPrice: coinGeckoIqPrice,
          totalUsdBalance: coinGeckoIqPrice * lockInfo.iqLocked,
        }),
      )
    }
    if (address?.length) {
      getBalance()
    }
  }, [address, dispatch])

  return null
}
