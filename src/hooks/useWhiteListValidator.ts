import { EditorABI } from '@/abi/EditorAbi'
import config from '@/config'
import { useContractRead } from 'wagmi'

export const useWhiteListValidator = (address: string | null) => {
  if (config.isProduction !== 'true') {
    return {
      userCanEdit: true,
    }
  }

  const { data: isEditorWhiteListed } = useContractRead({
    address: config.editorAddress as `0x${string}`,
    abi: EditorABI,
    functionName: 'isEditorWhitelisted',
    args: [address],
  })

  return {
    userCanEdit: !!isEditorWhiteListed,
  }
}

export default useWhiteListValidator
