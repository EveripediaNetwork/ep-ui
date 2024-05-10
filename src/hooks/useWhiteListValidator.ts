import { useState, useEffect } from 'react'
import { EditorABI } from '@/abi/EditorAbi'
import config from '@/config'
import { polygon } from 'viem/chains'
import { createPublicClient, http } from 'viem'
import { useAddress } from './useAddress'

export const publicClient: any = createPublicClient({
  chain: polygon,
  transport: http(),
})

const useWhiteListValidator = () => {
  const [userCanEdit, setUserCanEdit] = useState(false)
  const { address } = useAddress()

  useEffect(() => {
    if (!address) {
      setUserCanEdit(false)
      return
    }

    const fetchData = async () => {
      try {
        let data
        if (config.isProduction) {
          data = await publicClient.readContract({
            address: config.editorAddress as `0x${string}`,
            abi: EditorABI,
            functionName: 'isEditorWhitelisted',
            args: [address],
          })
        } else {
          data = true
        }
        setUserCanEdit(data)
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
