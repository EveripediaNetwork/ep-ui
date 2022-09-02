import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAccount } from 'wagmi'

export const authenticatedRoute = <P extends object>(
  WrappedComponent: () => JSX.Element | null,
) => {
  const AuthenticatedRoute = (props: P) => {
    const router = useRouter()
    const { address: userAddress } = useAccount()

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
  return AuthenticatedRoute
}
