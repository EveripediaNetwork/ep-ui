import React from 'react'
import { SingleLink } from '../SingleLink'
import AccordionFAQItem from '../AccordionFAQItem'

const WhereToGetIQTokens = () => {
  return (
    <AccordionFAQItem
      title="Where do I get IQ tokens?"
      content={
        <>
          You can get IQ tokens from a variety of centralized and decentralized
          exchanges including Binance, Crypto.com, Fraxswap, and more. See the{' '}
          <SingleLink
            title="Exchanges"
            href="https://learn.everipedia.org/iq/iq/exchanges"
          />{' '}
          section of our Learn site for the full list.
        </>
      }
    />
  )
}

export default WhereToGetIQTokens
