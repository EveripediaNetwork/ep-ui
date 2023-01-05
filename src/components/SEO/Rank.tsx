import React from 'react'
import { NextSeo } from 'next-seo'

const RankHeader = () => (
  <NextSeo
    title="Ranking by Market Capital for NFT and TOKENS"
    description="Live update for nft and tokens marketcap"
    canonical="https://iq.wiki/rank"
    openGraph={{
      title: 'Rank- MarketCap',
      description: 'Live update for nft and tokens marketcap',
    }}
    twitter={{
      cardType: 'summary_large_image',
      handle: '@Everipedia',
      site: 'Everipedia',
    }}
  />
)

export default RankHeader
