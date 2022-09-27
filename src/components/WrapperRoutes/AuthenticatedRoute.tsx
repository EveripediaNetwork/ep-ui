import { getUserAddressFromCache } from '@/utils/getUserAddressFromCache'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { WagmiStatusContext } from '../Wagmi/DynamicWagmiProvider'

const WagmiLoadedAuthenticatedRoute = ({
  WrappedComponent,
  ...props
}: {
  WrappedComponent: React.FC
}) => {
  const userAddress = getUserAddressFromCache()
  const router = useRouter()

  useEffect(() => {
    if (!userAddress) {
      router.push({
        pathname: '/login',
        query: { from: router.asPath },
      })
    }
  }, [userAddress, router])

  if (userAddress) {
    return <WrappedComponent {...props} />
  }
  return null
}

export const authenticatedRoute = <P extends object>(
  WrappedComponent: () => JSX.Element | null,
) => {
  const AuthenticatedRoute = (props: P) => {
    const { isWagmiWrapped, setIsWagmiWrapped } = useContext(WagmiStatusContext)

    useEffect(() => {
      setIsWagmiWrapped(true)
    }, [setIsWagmiWrapped])

    return (
      <>
        {isWagmiWrapped && (
          <WagmiLoadedAuthenticatedRoute
            WrappedComponent={WrappedComponent}
            {...props}
          />
        )}
      </>
    )
  }
  return AuthenticatedRoute
}
