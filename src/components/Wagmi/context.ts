import { createContext } from '@chakra-ui/react-utils'
import { Dispatch, SetStateAction } from 'react'

export const [WagmiStatusProvider, useWagmiStatus] = createContext<{
  isWagmiWrapped: boolean
  setIsWagmiWrapped: Dispatch<SetStateAction<boolean>>
}>({
  name: 'wagmiContext',
})
