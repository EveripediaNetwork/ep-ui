import { useEffect, useCallback } from 'react'
import { useAccount, useContractRead } from 'wagmi'
import config from '@/config'

const useIsWhitelistedEditor = () => {
  const { address } = useAccount()
  const {
    data: isWhitelisted,
    error,
    isLoading,
  } = useContractRead({
    address: config.editorAddress as `0x${string}`,
    abi: config.whitelistAbi,
    functionName: 'isEditorWhitelisted',
    args: address ? [address] : undefined,
    enabled: !!address,
  })

  const getContractReadError = useCallback(() => {
    if (error) {
      console.error('Error fetching whitelist status:', error.message || error)
    }
  }, [error])

  useEffect(() => {
    getContractReadError()
  }, [getContractReadError])

  return {
    userCanEdit: isWhitelisted ?? false,
    isLoading,
    error: error || null,
  }
}

export default useIsWhitelistedEditor
