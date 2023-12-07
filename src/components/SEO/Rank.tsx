import React from 'react'
import { NextSeo } from 'next-seo'

const RankHeader = () => (
  <NextSeo
    title="Ranking by Market Capital for NFT and TOKENS"
    description="Live update for nft and tokens marketcap"
    canonical="https://iq.wiki/rank"
    openGraph={{
      title: 'Rank- MarketCap',
      description: 'A list of cryptocurrency wikis ranked by their individual market cap',
      images: [
        {
          url: 'https://iq.wiki/images/defaults/og-image-default.png',
          width: 1200,
          height: 630,
          alt: 'IQ.wiki | Crypto Encyclopedia',
        },
      ],
    }}
    twitter={{
      cardType: 'summary_large_image',
      handle: '@IQWiki',
      site: 'IQWiki',
    }}
  />
)

export default RankHeader
