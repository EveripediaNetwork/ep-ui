import React, { useEffect } from 'react'
import { useWagmiStatus } from '../Wagmi/context'

export const wagmiNeededRoute = <P extends object>(
  WrappedComponent: () => JSX.Element | null,
) => {
  const WagmiNeededRoute = (props: P) => {
    const { isWagmiWrapped, setIsWagmiWrapped } = useWagmiStatus()

    useEffect(() => {
      setIsWagmiWrapped(true)
    }, [])

    return <>{isWagmiWrapped && <WrappedComponent {...props} />}</>
  }
  return WagmiNeededRoute
}
