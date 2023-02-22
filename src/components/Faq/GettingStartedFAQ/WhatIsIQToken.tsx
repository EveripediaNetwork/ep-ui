import React from 'react'
import { SingleLink } from '../SingleLink'
import AccordionFAQItem from '../AccordionFAQItem'

const WhatIsIQToken = () => {
  return (
    <AccordionFAQItem
      title="What is the IQ token?"
      content={
        <>
          The <SingleLink title="IQ token" href="https://iq.wiki/wiki/iqwiki" />{' '}
          is a cryptocurrency dedicated to the future of knowledge. The IQ token
          powers IQ.wiki, the world&apos;s largest cryptocurrency encyclopedia.
          IQ is both a governance and DeFi token with IQ stakers governing the
          platform and earning rewards. The token is managed by BrainDAO and
          backed by BrainDAO&apos;s treasury of IQ tokens, stablecoins, blue
          chip NFTs, and other digital assets. <br />
          <br /> For more information about the IQ token see the{' '}
          <SingleLink
            title="IQ
                    token page"
            href="https://iq.wiki/wiki/iqwiki"
          />{' '}
          on IQ.wiki.
        </>
      }
    />
  )
}

export default WhatIsIQToken
