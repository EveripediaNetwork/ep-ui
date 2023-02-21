import React from 'react'
import { SingleLink } from '../SingleLink'
import AccordionFAQItem from '../AccordionFAQItem'

const StakeIQToEarnRewards = () => {
  return (
    <AccordionFAQItem
      title="How do I stake IQ to earn token rewards and get involved in
    governance?"
      content={
        <>
          For more information on how to start earning IQ token rewards and get
          involved in the governance of the IQ token, check out the{' '}
          <SingleLink
            title="HiIQ page on our Learn site"
            href="https://learn.everipedia.org/iq/iq/locking-hiiq"
          />{' '}
          which explains how staking works and includes tutorials on how to
          stake.
        </>
      }
    />
  )
}

export default StakeIQToEarnRewards

