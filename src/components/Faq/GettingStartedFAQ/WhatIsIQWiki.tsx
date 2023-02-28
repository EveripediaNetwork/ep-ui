import React from 'react'
import { SingleLink } from '../SingleLink'
import AccordionFAQItem from '../AccordionFAQItem'

const WhatIsIQWiki = () => {
  return (
    <AccordionFAQItem
      title="What is IQ.wiki?"
      content={
        <>
          IQ.wiki formerly Everipedia is the largest{' '}
          <SingleLink
            href="https://iq.wiki/wiki/blockchain"
            title="blockchain"
          />
          and{' '}
          <SingleLink
            href="https://iq.wiki/wiki/cryptocurrency"
            title="cryptocurrency"
          />{' '}
          encyclopedia in the world with thousands of pages. IQ.wiki integrates
          artificial intelligence for use cases including summarizing wiki
          articles for search engines. The{' '}
          <SingleLink href="https://iq.wiki/wiki/iq" title="IQ token" /> powers
          IQ.wiki and all edits on the platform are recorded on-chain through{' '}
          <SingleLink href="https://iq.wiki/wiki/polygon" title="Polygon" />
          and the InterPlanetary File System (IPFS). The encyclopedia is
          governed by IQ token stakers.
        </>
      }
    />
  )
}

export default WhatIsIQWiki
