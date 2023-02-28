import React from 'react'
import { SingleLink } from '../SingleLink'
import AccordionFAQItem from '../AccordionFAQItem'

const WhatIsIQToken = () => {
  return (
    <AccordionFAQItem
      title="What is the IQ token?"
      content={
        <>
          The IQ token is a{' '}
          <SingleLink
            href="https://iq.wiki/wiki/cryptocurrency"
            title="cryptocurrency"
          />{' '}
          dedicated to building a more intelligent future through artificial
          intelligence and{' '}
          <SingleLink
            href="https://iq.wiki/wiki/blockchain"
            title="blockchain"
          />{' '}
          technology. The IQ token powers a knowledge ecosystem including
          applications such as{' '}
          <SingleLink href="https://iq.wiki/wiki/iqwiki" title="IQ.wiki" />, the
          world&apos;s largest cryptocurrency and blockchain encyclopedia.
          IQ.wiki integrates AI for tasks including summarizing wiki articles.
          The IQ token is a DeFi and governance token with IQ stakers governing
          the platform. The token is managed by{' '}
          <SingleLink href="https://iq.wiki/wiki/braindao" title="BrainDAO" />{' '}
          which holds a treasury of IQ tokens,{' '}
          <SingleLink
            href="https://iq.wiki/wiki/stablecoin"
            title="stablecoins"
          />{' '}
          , blue chip{' '}
          <SingleLink
            href="https://iq.wiki/wiki/non-fungible-token-nft"
            title="NFTs"
          />{' '}
          , and other digital assets.
        </>
      }
    />
  )
}

export default WhatIsIQToken
