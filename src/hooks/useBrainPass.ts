import { BrainPassABI } from '@/abi/BrainPass.abi'
import config from '@/config'
import { formatUnits } from 'viem'
import { useAccount, useContractRead } from 'wagmi'

const DEFAULT_VALUE: bigint = BigInt(0)

const brainpassConfig = {
  address: config.brainpassAddress as `0x${string}`,
  abi: BrainPassABI,
}
export const useBrainPass = () => {
  const { address } = useAccount()

  const { data: userPass } = useContractRead({
    ...brainpassConfig,
    functionName: 'getUserPassDetails',
    args: [address],
  })

  const { endTimestamp } = (userPass as { endTimestamp: bigint }) || {
    endTimestamp: DEFAULT_VALUE,
  }

  const isUserPassActive = () => {
    const endTime = Number(formatUnits(endTimestamp, 18))
    const todayToTimestamp = new Date().getTime() / 1000
    if (!endTime || endTime < todayToTimestamp) return false
    return true
  }

  const getPassEndDate = () => {
    const endTime = Number(formatUnits(endTimestamp, 18))
    if (!endTime) return null
    return endTime * 1000
  }

  return {
    passEndDate: getPassEndDate(),
    isUserPassActive: isUserPassActive(),
  }
}

export default useBrainPass
