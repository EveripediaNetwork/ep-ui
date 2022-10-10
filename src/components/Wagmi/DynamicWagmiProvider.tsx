import React, { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { getUserAddressFromCache } from '@/utils/getUserAddressFromCache'
import { WagmiStatusContext } from './WagmiStatusContext'

const DeferredWagmiProvider = dynamic(
  () => import('@/components/Wagmi/DeferredWagmiProvider'),
  {
    ssr: false,
  },
)

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
  const Wrapper = isWagmiWrapped ? DeferredWagmiProvider : React.Fragment
  return (
    <>
      <WagmiStatusContext.Provider value={value}>
        <Wrapper>{children}</Wrapper>
      </WagmiStatusContext.Provider>
    </>
  )
}
