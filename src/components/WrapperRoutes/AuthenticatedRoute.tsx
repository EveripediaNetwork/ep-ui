import { useAddress } from '@/hooks/useAddress'
import { RootState } from '@/store/store'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const WagmiLoadedAuthenticatedRoute = ({
  WrappedComponent,
  ...props
}: {
  WrappedComponent: React.FC
}) => {
  const { address: userAddress } = useAddress()
  const token = useSelector((state: RootState) => state.user.token)
  const router = useRouter()

  useEffect(() => {
    if (!userAddress || !token) {
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
    return (
      <>
        <WagmiLoadedAuthenticatedRoute
          WrappedComponent={WrappedComponent}
          {...props}
        />
      </>
    )
  }
  return AuthenticatedRoute
}
