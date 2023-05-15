import { EditorABI } from '@/abi/EditorAbi'
import config from '@/config'
import { useContractRead } from 'wagmi'

export const useWhiteListValidator = (address: string | undefined | null) => {
  const { data: isEditorWhiteListed } = useContractRead({
    address: config.editorAddress as `0x${string}`,
    abi: EditorABI,
    functionName: 'isEditorWhitelisted',
    args: [address],
  })


  return {
    userCanEdit: config.isProduction === 'true' ? isEditorWhiteListed : true,
  }
}

export default useWhiteListValidator
