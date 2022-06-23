import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAccount } from 'wagmi'

export const authenticatedRoute = <P extends object>(
  WrappedComponent: () => JSX.Element | null,
) => {
  const AuthenticatedRoute = (props: P) => {
    const router = useRouter()
    const { data } = useAccount()

    useEffect(() => {
      if (!data?.address) {
        router.push({
          pathname: '/login',
          query: { from: router.asPath },
        })
      }
    }, [data?.address, router])

    if (data?.address) {
      return <WrappedComponent {...props} />
    }
    return null
  }
  return AuthenticatedRoute
}
