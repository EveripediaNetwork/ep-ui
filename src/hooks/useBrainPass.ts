import { BrainPassABI } from '@/abi/BrainPass.abi'
import config from '@/config'
import { formatUnits } from 'viem'
import { useAccount, useContractRead } from 'wagmi'

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

  const userPassDetails = userPass as {
    tokenId: bigint
    startTimestamp: bigint
    endTimestamp: bigint
    passId: bigint
  }
  const isUserPassActive = () => {
    if (!userPass) return false
    const { endTimestamp } = userPassDetails
    const endTime = Number(formatUnits(endTimestamp, 18))
    const todayToTimestamp = new Date().getTime() / 1000
    if (!endTime || endTime < todayToTimestamp) return false
    return true
  }

  const getCurrentPassName = () => {
    if (!passTypes) return null
    const result = passTypes as { name: string }[]
    const name = result[1].name
    return name
  }

  const getPassEndDate = () => {
    if (!userPass) return null
    const { endTimestamp } = userPassDetails
    const endTime = Number(formatUnits(endTimestamp, 18))
    if (!endTime) return null
    return endTime * 1000
  }

  const refinePassDetails = () => {
    if (!userPass) return null

    const details = {
      tokenId: Number(userPassDetails?.tokenId),
      passId: Number(userPassDetails?.passId),
      startTimeStamp: Number(userPassDetails?.startTimestamp),
      endTimeStamp: Number(userPassDetails?.endTimestamp),
    }
    return details
  }

  return {
    UserPass: refinePassDetails(),
    passEndDate: getPassEndDate(),
    isUserPassActive: isUserPassActive(),
    getCurrentPassName: getCurrentPassName(),
  }
}

export default useBrainPass
