import { RootState } from '@/store/store'
import { getState } from '@/utils/browserStorage'
import { getUrlQueries, GetUrlQueriesType } from '@/utils/reworkUrlQueries'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const authenticatedRoute = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const AuthenticatedRoute = (props: P) => {
    const router = useRouter()
    const user =
      useSelector((state: RootState) => state.user.user) || getState()

    useEffect(() => {
      if (!user) {
        const previousPageQuery = router.query as GetUrlQueriesType
        const queryAfterLogin = getUrlQueries(previousPageQuery) || ''
        router.push({
          pathname: '/login',
          query: { from: `${router.pathname}${queryAfterLogin}` },
        })
      }
    }, [user, router])

    if (user) {
      return <WrappedComponent {...props} />
    }
    return null
  }
  return AuthenticatedRoute
}
