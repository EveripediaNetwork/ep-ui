import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'
import dynamic from 'next/dynamic'
import { getUserAddressFromCache } from '@/utils/getUserAddressFromCache'

const WagmiProvider = dynamic(() => import('@/components/Wagmi/WagmiProvider'))

const defaultUpdate: Dispatch<SetStateAction<boolean>> = () => true
export const WagmiStatusContext = createContext({
  isWagmiWrapped: false,
  setIsWagmiWrapped: defaultUpdate,
})

export const DynamicWagmiProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) => {
  const [isWagmiWrapped, setIsWagmiWrapped] = useState(
    typeof getUserAddressFromCache() === 'string',
  )

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      typeof getUserAddressFromCache() === 'string'
    ) {
      if (window.gtag) window.gtag('set', 'user_id', getUserAddressFromCache())
    }
  }, [])

  const value = useMemo(
    () => ({
      isWagmiWrapped,
      setIsWagmiWrapped,
    }),
    [isWagmiWrapped],
  )
  const Wrapper = isWagmiWrapped ? WagmiProvider : React.Fragment

  return (
    <>
      <WagmiStatusContext.Provider value={value}>
        <Wrapper>{children}</Wrapper>
      </WagmiStatusContext.Provider>
    </>
  )
}
