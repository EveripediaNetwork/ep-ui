import { BrainPassABI } from '@/abi/BrainPass.abi'
import config from '@/config'
import { useAccount, useContractRead } from 'wagmi'

const brainpassConfig = {
  address: config.brainpassAddress as `0x${string}`,
  abi: BrainPassABI,
}
export const useBrainPass = () => {
  const { address } = useAccount()
  const { data: userPass } = useContractRead({
    ...brainpassConfig,
    functionName: 'addressToNFTPass',
    args: [address],
  })

  console.log('userPass', userPass)

  return {
    userPass,
  }
}

export default useBrainPass
