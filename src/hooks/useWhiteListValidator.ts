import { useEffect } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { EditorABI } from '@/abi/EditorAbi'
import config from '@/config'

const useWhiteListValidator = () => {
  const { address } = useAccount()

  const { data, isError, isLoading } = useReadContract({
    account: config.editorAddress as `0x${string}`,
    abi: EditorABI,
    functionName: 'isEditorWhitelisted',
    args: [address],
  })

  useEffect(() => {
    if (isError) {
      console.error('Error fetching whitelist data')
    }
  }, [isError])

  return {
    userCanEdit: data,
    isLoading,
    isError,
  }
}

export default useWhiteListValidator
