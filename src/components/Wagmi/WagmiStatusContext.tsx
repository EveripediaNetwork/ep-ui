import { createContext, Dispatch, SetStateAction } from 'react'

const defaultUpdate: Dispatch<SetStateAction<boolean>> = () => true

export const WagmiStatusContext = createContext({
  isWagmiWrapped: false,
  setIsWagmiWrapped: defaultUpdate,
})
