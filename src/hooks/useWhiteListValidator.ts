import { EditorABI } from '@/abi/EditorAbi'
import config from '@/config'
import { useContractRead } from 'wagmi'

const readContract = {
  addressOrName: config.editorAddress,
  contractInterface: EditorABI,
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
