import React from 'react'
import { GetServerSideProps } from 'next'

interface SearchQueryProps {
  query: string
}

const SearchWikiNotificationsResult = ({ query }: SearchQueryProps) => {
  console.log(query)
}

export const getServerSideProps: GetServerSideProps = async context => {
  const queryParam = context.params?.query
  const query = queryParam as string

  return {
    props: { query },
  }
}

export default SearchWikiNotificationsResult
