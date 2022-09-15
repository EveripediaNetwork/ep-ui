import React, { useEffect } from 'react'
import { useWagmiStatus } from '../Wagmi/context'

export const WagmiNeededComponent = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { isWagmiWrapped, setIsWagmiWrapped } = useWagmiStatus()

  useEffect(() => {
    setIsWagmiWrapped(true)
  }, [])

  return <>{isWagmiWrapped && children}</>
}
