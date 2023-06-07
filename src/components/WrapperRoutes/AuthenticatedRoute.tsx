import useBrainPass from '@/hooks/useBrainPass'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAccount } from 'wagmi'

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

  return userAddress ? <WrappedComponent {...props} /> : null
}

export const brainPassAuthenticatedRoute = <P extends object>(
  WrappedComponent: () => JSX.Element | null,
) => {
  const AuthenticatedRoute = (props: P) => {
    const { address: userAddress } = useAccount()
    const router = useRouter()
    const { isUserPassActive } = useBrainPass()

    useEffect(() => {
      if (!userAddress) {
        router.push({
          pathname: '/login',
          query: { from: router.asPath },
        })
      }
      if (!isUserPassActive) {
        router.push({
          pathname: '/mint-pass',
          query: { from: router.asPath },
        })
      }
    }, [userAddress, router, isUserPassActive])

    return userAddress && isUserPassActive ? (
      <WrappedComponent {...props} />
    ) : null
  }

  return AuthenticatedRoute
}

export const authenticatedRoute = <P extends object>(
  WrappedComponent: () => JSX.Element | null,
) => {
  const AuthenticatedRoute = (props: P) => (
    <WagmiLoadedAuthenticatedRoute
      WrappedComponent={WrappedComponent}
      {...props}
    />
  )

  return AuthenticatedRoute
}
