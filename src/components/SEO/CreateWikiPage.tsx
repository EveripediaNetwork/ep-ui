import { NextSeo } from 'next-seo'
import React from 'react'

const CreateWikiPageHeader = () => (
  <NextSeo
    title={`Create wiki page `}
    description="Create a new wiki"
    canonical="https://iq.wiki/create-wiki"
    openGraph={{
      title: 'Create wiki page',
      description: 'Create a new wiki',
    }}
    twitter={{
      cardType: 'summary_large_image',
      handle: '@Everipedia',
      site: 'Everipedia',
    }}
  />
)

export default CreateWikiPageHeader
