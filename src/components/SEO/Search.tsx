import { env } from '@/env.mjs'
import { SiteLinksSearchBoxJsonLd } from 'next-seo'
import React from 'react'

const SearchSEO = () => {
  return (
    <SiteLinksSearchBoxJsonLd
      url={env.NEXT_PUBLIC_DOMAIN || ''}
      potentialActions={[
        {
          target: `${env.NEXT_PUBLIC_DOMAIN}/search/?q`,
          queryInput: 'search_term_string',
        },
      ]}
    />
  )
}

export default SearchSEO
