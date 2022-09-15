import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useWagmiStatus } from '../Wagmi/context'

const WagmiLoadedAuthenticatedRoute = ({
  WrappedComponent,
  ...props
}: {
  WrappedComponent: React.FC
}) => {
  const { address: userAddress } = useAccount()
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
    const { isWagmiWrapped, setIsWagmiWrapped } = useWagmiStatus()

    useEffect(() => {
      setIsWagmiWrapped(true)
    }, [])

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
