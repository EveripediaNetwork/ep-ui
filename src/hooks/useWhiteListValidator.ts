import { EditorABI } from '@/abi/EditorAbi'
import config from '@/config'
import { ContractInterface } from 'ethers'
import { useContractRead, useProvider } from 'wagmi'

const readContract = {
  addressOrName: config.editorAddress,
  contractInterface: EditorABI as ContractInterface,
}

export const useWhiteListValidator = (address: string | undefined | null) => {
  const { data: isEditorWhiteListed } = useContractRead({
    ...readContract,
    functionName: 'isEditorWhitelisted', 
    args: address,
  })
  
  return {
    userCanEdit: config.isProduction === 'true' ? isEditorWhiteListed : true,
  }
}

export default useWhiteListValidator
