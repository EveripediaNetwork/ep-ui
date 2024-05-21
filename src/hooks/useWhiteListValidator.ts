import { useEffect } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { EditorABI } from '@/abi/EditorAbi'
import config from '@/config'

const useWhiteListValidator = () => {
  const { address } = useAccount()
  const { data, isError, isLoading } = useReadContract({
    address: config.editorAddress as `0x${string}`,
    abi: EditorABI,
    functionName: 'isEditorWhitelisted',
    args: [address as `0x${string}`],
  })
  useEffect(() => {
    if (isError) {
      console.error('Error fetching whitelist data')
    }
  }, [isError])
  return {
    userCanEdit: data ?? false,
    isLoading,
    isError,
  }
}

export default useWhiteListValidator
