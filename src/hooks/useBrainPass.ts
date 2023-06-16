import { BrainPassABI } from '@/abi/BrainPass.abi'
import { IQAbi } from '@/abi/IQAbi.abi'
import config from '@/config'
import { formatUnits, parseUnits } from 'viem'
import { useAccount, useContractRead, useContractWrite } from 'wagmi'
import { waitForTransaction } from 'wagmi/actions'

interface PassType {
  name: string
  pricePerDay: bigint
  passId: bigint
  maxTokens: bigint
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

const erc20ContractConfig = {
  address: config.iqAddress as `0x${string}`,
  abi: IQAbi,
}

type ErrorResponse = {
  cause: {
    data: {
      errorName: string
      args: string[]
    }
  }
  details: string
}

export const calculateGasBuffer = (gasFee: number) => {
  return gasFee + gasFee * 0.1
}

export const useBrainPass = () => {
  const { address } = useAccount()

  const { writeAsync: approve } = useContractWrite({
    ...erc20ContractConfig,
    functionName: 'approve',
  })

  const { data: allowance } = useContractRead({
    ...erc20ContractConfig,
    functionName: 'allowance',
    args: [address, config.brainpassAddress],
  })

  const { data: userPass, refetch: refetchUserPass } = useContractRead({
    ...brainpassConfig,
    functionName: 'getUserPassDetails',
    args: [address],
  })

  const { writeAsync: mint } = useContractWrite({
    ...brainpassConfig,
    functionName: 'mintNFT',
  })

  const { writeAsync: increaseEndTime } = useContractWrite({
    ...brainpassConfig,
    functionName: 'increaseEndTime',
  })

  const { data: passTypes } = useContractRead({
    ...brainpassConfig,
    functionName: 'getAllPassType',
  })

  const needsApproval = async (amount: bigint) => {
    if ((allowance as bigint) < amount) {
      const { hash } = await approve({
        args: [config.brainpassAddress, amount],
      })
      const receipt = await waitForTransaction({ hash })
      if (receipt.status === 'success') {
        return true
      }
      return false
    }
    return true
  }

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
    const currentPass = result[0]
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
    amount: number,
  ) => {
    try {
      const convertedAmount = parseUnits(`${amount}`, 18)
      const hasApproval = await needsApproval(convertedAmount)
      if (hasApproval) {
        const { hash } = await mint({
          args: [passId, startTimestamp, endTimestamp],
        })
        const receipt = await waitForTransaction({ hash })
        if (receipt) {
          refetchUserPass()
          return { isError: false, msg: 'BrainPass successfully minted' }
        }
      }
      return { isError: true, msg: 'Allowance Error' }
    } catch (error) {
      const { cause, details } = error as ErrorResponse
      return {
        isError: true,
        msg: cause?.data?.args[0] || details || 'BrainPass could not be minted',
      }
    }
  }

  const extendEndTime = async (
    tokenId: number,
    endTimestamp: number,
    amount: number,
  ) => {
    try {
      const convertedAmount = parseUnits(`${amount}`, 18)
      await needsApproval(convertedAmount)
      if ((allowance as bigint) >= convertedAmount) {
        const { hash } = await increaseEndTime({
          args: [tokenId, endTimestamp],
        })
        const receipt = await waitForTransaction({ hash })
        if (receipt) {
          refetchUserPass()
          return { isError: false, msg: 'BrainPass subscription renewed!' }
        }
      }
      return { isError: true, msg: 'Allowance Error' }
    } catch (error) {
      const { cause, details } = error as ErrorResponse
      return {
        isError: true,
        msg:
          cause?.data?.args[0] ||
          details ||
          'BrainPass subscription could not be renewed!',
      }
    }
  }

  return {
    userPass: refinePassDetails(),
    isUserPassActive: isUserPassActive(),
    passDetails: getPassDetails(),
    mintNftPass: (
      passId: number,
      startTimestamp: number,
      endTimestamp: number,
      amount: number,
    ) => mintNftPass(passId, startTimestamp, endTimestamp, amount),
    extendEndTime: (tokenId: number, endTimestamp: number, amount: number) =>
      extendEndTime(tokenId, endTimestamp, amount),
  }
}

export default useBrainPass
