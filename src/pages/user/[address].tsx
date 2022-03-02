import React from 'react'
import { useRouter } from 'next/router'
import { skipToken } from '@reduxjs/toolkit/query'
import {
  getRunningOperationPromises,
  getUserWikis,
  useGetUserWikisQuery,
} from '@/services/wikis'
import { store } from '@/store/store'
import { GetServerSideProps } from 'next'

const User = () => {
  const router = useRouter()
  const { address } = router.query
  const result = useGetUserWikisQuery(
    typeof address === 'string' ? address : skipToken,
    {
      skip: router.isFallback,
    },
  )
  const { isLoading, error, data } = result

  return (
    <main>
      {error && <>Oh no, there was an error</>}
      {!error && (router.isFallback || isLoading) && <>Loading...</>}
      <div>{data && data.map(content => <div>{content.title}</div>)}</div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const address = context.params?.address
  if (typeof address === 'string') {
    store.dispatch(getUserWikis.initiate(address))
  }
  await Promise.all(getRunningOperationPromises())
  return {
    props: {},
  }
}

export default User
