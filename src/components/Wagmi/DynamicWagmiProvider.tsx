import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from 'react'
import dynamic from 'next/dynamic'
import { getUserAddressFromCache } from '@/utils/getUserAddressFromCache'

const DeferredWagmiProvider = dynamic(
  () => import('@/components/Wagmi/DeferredWagmiProvider'),
  {
    ssr: false,
  },
)

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
  const Wrapper = isWagmiWrapped ? DeferredWagmiProvider : React.Fragment
  return (
    <>
      <WagmiStatusContext.Provider value={value}>
        <Wrapper>{children}</Wrapper>
      </WagmiStatusContext.Provider>
    </>
  )
}
