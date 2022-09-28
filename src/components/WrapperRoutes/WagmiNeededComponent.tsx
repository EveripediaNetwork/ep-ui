import React, { useContext, useEffect } from 'react'
import { WagmiStatusContext } from '../Wagmi/WagmiStatusContext'

export const WagmiNeededComponent = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { isWagmiWrapped, setIsWagmiWrapped } = useContext(WagmiStatusContext)

  useEffect(() => {
    setIsWagmiWrapped(true)
  }, [setIsWagmiWrapped])

  return <>{isWagmiWrapped && children}</>
}
