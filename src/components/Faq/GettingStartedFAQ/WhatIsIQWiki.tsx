import React from 'react'
import { SingleLink } from '../SingleLink'
import AccordionFAQItem from '../AccordionFAQItem'

const WhatIsIQWiki = () => {
  return (
    <AccordionFAQItem
      title="What is IQ.wiki?"
      content={
        <>
          <SingleLink href="https://iq.wiki/wiki/iqwiki" title="IQ.wiki" />
          formerly Everipedia, is the world’s largest crypto encyclopedia with
          thousands of pages. The new IQ.wiki platform has been built from the
          ground up to be fully Web3 with all edits recorded on-chain through
          Polygon and IPFS. The encyclopedia is governed by IQ token stakers who
          earn rewards for their contributions. For more information on IQ.wiki
          see the{' '}
          <SingleLink href="https://iq.wiki/wiki/iqwiki" title="IQ.wiki page" />
          on IQ.wiki.
        </>
      }
    />
  )
}

export default WhatIsIQWiki
