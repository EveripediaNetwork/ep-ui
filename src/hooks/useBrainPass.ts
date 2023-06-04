import { BrainPassABI } from '@/abi/BrainPass.abi'
import config from '@/config'
import { formatUnits } from 'viem'
import { useAccount, useContractRead, useContractWrite } from 'wagmi'
import { waitForTransaction } from 'wagmi/actions'

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

type ErrorResponse = {
  cause: {
    data: {
      errorName: string
      args: string[]
    }
  }
}

export const useBrainPass = () => {
  const { address } = useAccount()

  const { data: userPass } = useContractRead({
    ...brainpassConfig,
    functionName: 'getUserPassDetails',
    args: [address],
  })

  const { writeAsync: mint } = useContractWrite({
    ...brainpassConfig,
    functionName: 'mintNFT',
  })

  const { data: passTypes } = useContractRead({
    ...brainpassConfig,
    functionName: 'getAllPassType',
  })
  const isUserPassActive = () => {
    if (!userPass) return false
    const { endTimestamp } = userPass as UserPass
    const endTime = Number(endTimestamp)
    const todayToTimestamp = new Date().getTime() / 1000
    if (!endTime || endTime < todayToTimestamp) return false
    return true
  }

  const getPassDetails = () => {
    if (!passTypes) return null
    const result = passTypes as PassType[]
    const currentPass = result[1]
    return {
      name: currentPass.name,
      price: Number(formatUnits(currentPass.pricePerDay, 18)),
      passId: Number(currentPass.passId),
      isPaused: currentPass.isPaused,
      supply: Number(formatUnits(currentPass.maxTokens, 18)),
    }
  }
  const refinePassDetails = () => {
    if (!userPass) return null
    const userPassDetails = userPass as UserPass
    const details = {
      tokenId: Number(userPassDetails.tokenId),
      passId: Number(userPassDetails.passId),
      startTimeStamp: Number(userPassDetails.startTimestamp),
      endTimeStamp: Number(userPassDetails.endTimestamp),
    }
    return details
  }

  const mintNftPass = async (
    passId: number,
    startTimestamp: number,
    endTimestamp: number,
  ) => {
    try {
      const { hash } = await mint({
        args: [passId, startTimestamp, endTimestamp],
      })
      const receipt = await waitForTransaction({ hash })
      return { isError: false, msg: 'Brainy minted successfully', receipt }
    } catch (error) {
      const { cause } = error as ErrorResponse
      return { isError: true, msg: cause?.data?.args[0] || "Can't mint brainy" }
    }
  }

  return {
    UserPass: refinePassDetails(),
    isUserPassActive: isUserPassActive(),
    passDetails: getPassDetails(),
    mintNftPass: (
      passId: number,
      startTimestamp: number,
      endTimestamp: number,
    ) => mintNftPass(passId, startTimestamp, endTimestamp),
  }
}

export default useBrainPass
