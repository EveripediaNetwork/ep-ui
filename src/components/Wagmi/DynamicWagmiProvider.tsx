import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from 'react'
import dynamic from 'next/dynamic'
import { getUserAddressFromCache } from '@/utils/DataFetching/blockchainRelated/getUserAddressFromCache'

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
