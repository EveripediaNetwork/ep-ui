import React from 'react'
import { useRouter } from 'next/router'
import { skipToken } from '@reduxjs/toolkit/query'
import {
  getRunningOperationPromises,
  getWiki,
  useGetWikiQuery,
} from '@/services/wikis'
import { store } from '@/store/store'
import { GetServerSideProps } from 'next'
import WikiPage from '@/components/Wiki/WikiPage/WikiPage'

const Wiki = () => {
  const router = useRouter()

  const { slug } = router.query
  const result = useGetWikiQuery(typeof slug === 'string' ? slug : skipToken, {
    skip: router.isFallback,
  })
  const { isLoading, error, data } = result

  return (
    <main>
      {error && <>Oh no, there was an error</>}
      {!error && (router.isFallback || isLoading) && <>Loading...</>}
      <WikiPage wiki={data} />
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const slug = context.params?.slug
  if (typeof slug === 'string') {
    store.dispatch(getWiki.initiate(slug))
  }
  await Promise.all(getRunningOperationPromises())
  return {
    props: {},
  }
}

export default Wiki
