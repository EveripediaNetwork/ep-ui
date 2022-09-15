import React, { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { getUserAddressFromCache } from '@/utils/getUserAddressFromCache'
import { WagmiStatusProvider } from '@/components/Wagmi/context'

const WagmiProvider = dynamic(() => import('@/components/Wagmi/WagmiProvider'))

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
  return (
    <>
      <WagmiStatusProvider value={value}>
        <WagmiProvider>{children}</WagmiProvider>
      </WagmiStatusProvider>
    </>
  )
}
