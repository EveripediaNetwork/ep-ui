import { useEffect, useCallback } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { EditorABI } from '@/abi/EditorAbi'
import config from '@/config'

type UseIsWhitelistedEditorRes = {
  userCanEdit: boolean
  isLoading: boolean
  error: Error | null
}
const useIsWhitelistedEditor = (): UseIsWhitelistedEditorRes => {
  const { address } = useAccount()

  const {
    data: isWhitelisted,
    error,
    isLoading,
  } = useReadContract({
    address: config.editorAddress as `0x${string}`,
    abi: EditorABI,
    functionName: 'isEditorWhitelisted',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address,
    },
  })

  const handleContractRead = useCallback(() => {
    if (error) {
      console.error(
        'Error fetching whitelist status:',
        error.shortMessage || error.message,
      )
    }
  }, [error])

  useEffect(() => {
    handleContractRead()
  }, [handleContractRead])

  return {
    userCanEdit: isWhitelisted ?? false,
    isLoading,
    error: error || null,
  }
}

export default useIsWhitelistedEditor
