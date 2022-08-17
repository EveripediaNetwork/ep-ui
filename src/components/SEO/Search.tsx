import { SiteLinksSearchBoxJsonLd } from 'next-seo'
import React from 'react'

const SearchSEO = () => {
  return (
    <SiteLinksSearchBoxJsonLd
      url={process.env.NEXT_PUBLIC_DOMAIN || ''}
      potentialActions={[
        {
          target: `${process.env.NEXT_PUBLIC_DOMAIN}/search/?q`,
          queryInput: 'search_term_string',
        },
      ]}
    />
  )
}

export default SearchSEO
