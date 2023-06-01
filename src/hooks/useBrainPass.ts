import { BrainPassABI } from '@/abi/BrainPass.abi'
import config from '@/config'
import { formatUnits } from 'viem'
import { useAccount, useContractRead } from 'wagmi'

interface PassType {
  name: string
  pricePerDay: bigint
  passId: bigint
  maxTokens: bigint
  discount: bigint
  isPaused: boolean
}

interface UserPass {
  passId: bigint
  startTimestamp: bigint
  endTimestamp: bigint
  tokenId: bigint
}

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

  const { data: passTypes } = useContractRead({
    ...brainpassConfig,
    functionName: 'getAllPassType',
  })

  const isUserPassActive = () => {
    if (!userPass) return false
    const { endTimestamp } = userPass as UserPass
    const endTime = Number(formatUnits(endTimestamp, 18))
    const todayToTimestamp = new Date().getTime() / 1000
    if (!endTime || endTime < todayToTimestamp) return false
    return true
  }

  const getCurrentPassName = () => {
    if (!passTypes) return null
    const result = passTypes as PassType[]
    const name = result[1].name
    return name
  }

  const getPassEndDate = () => {
    if (!userPass) return null
    const { endTimestamp } = userPass as UserPass
    const endTime = Number(formatUnits(endTimestamp, 18))
    if (!endTime) return null
    return endTime * 1000
  }

  return {
    passEndDate: getPassEndDate(),
    isUserPassActive: isUserPassActive(),
    getCurrentPassName: getCurrentPassName(),
  }
}

export default useBrainPass
