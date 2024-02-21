import { useState, useEffect } from 'react'
import { EditorABI } from '@/abi/EditorAbi'
import config from '@/config'
import { provider } from '@/utils/WalletUtils/getProvider'

const useWhiteListValidator = (address: string | null) => {
  const [userCanEdit, setUserCanEdit] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await provider.readContract({
          address: config.editorAddress as `0x${string}`,
          abi: EditorABI,
          functionName: 'isEditorWhitelisted',
          args: [address],
        })
        setUserCanEdit(config.isProduction === 'true' ? data : true)
      } catch (error) {
        console.error('Error fetching whitelist data:', error)
      }
    }

    if (address !== null) {
      fetchData()
    } else {
      setUserCanEdit(false)
    }
  }, [address])

  return {
    userCanEdit,
  }
}

export default useWhiteListValidator
