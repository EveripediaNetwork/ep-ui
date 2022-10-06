import { EditorABI } from '@/abi/EditorAbi'
import config from '@/config'
import { ContractInterface } from 'ethers'
import { useContractRead } from 'wagmi'

const readContract = {
  addressOrName: config.editorAddress,
  contractInterface: EditorABI as ContractInterface,
}

export const useWhiteListValidator = (address: string | undefined | null) => {
  const { data: isEditorWhiteListed } = useContractRead({
    ...readContract,
    functionName: 'isEditorWhiteListed()',
    args: [address],
  })
  return {
    userCanEdit: config.environment === 'false' ? true : isEditorWhiteListed,
  }
}

export default useWhiteListValidator
