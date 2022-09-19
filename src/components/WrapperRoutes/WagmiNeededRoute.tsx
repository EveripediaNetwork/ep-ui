import React, { useContext, useEffect } from 'react'
import { WagmiStatusContext } from '../Wagmi/DynamicWagmiProvider'

export const wagmiNeededRoute = <P extends object>(
  WrappedComponent: () => JSX.Element | null,
) => {
  const WagmiNeededRoute = (props: P) => {
    const { isWagmiWrapped, setIsWagmiWrapped } = useContext(WagmiStatusContext)

    useEffect(() => {
      setIsWagmiWrapped(true)
    }, [setIsWagmiWrapped])

    return <>{isWagmiWrapped && <WrappedComponent {...props} />}</>
  }
  return WagmiNeededRoute
}
