import React from 'react'
import { SingleLink } from '../SingleLink'
import AccordionFAQItem from '../AccordionFAQItem'

const EditingIQWiki = () => {
  return (
    <AccordionFAQItem
      title="How do I join Brainlist and start editing IQ.wiki?"
      content={
        <>
          While the site is in beta, to get started editing you need to{' '}
          <SingleLink
            title="sign up for the Brainlist using this form"
            href="https://forms.gle/bmMce4r3JJckpSNJ7"
          />{' '}
          .
          <br />
          <br /> As part of the signing up, you’ll need to create a Polygon
          address as well as a{' '}
          <SingleLink title="MetaMask" href="https://metamask.io/" /> or{' '}
          <SingleLink title="WalletConnect" href="https://walletconnect.com/" />{' '}
          wallet. For more information on how to set up a Polygon address with
          your MetaMask wallet check out this{' '}
          <SingleLink
            title="Coindesk
                    guide"
            href="https://www.coindesk.com/learn/how-to-connect-metamask-to-the-polygon-network/"
          />
          . <br />
          <br /> After you submit your Brainlist application you will receive an
          initial confirmation email. And then if you are approved to Brainlist
          you will receive an approval email. <br />
          <br />
          We’ll be approving people for Brainlist on a rolling basis so don’t
          worry if you’ve already applied and have not been approved yet. <br />
          <br />
          After the beta period, IQ.wiki plans on stopping Brainlist and
          introducing HiIQ Brain Pass NFTs which will provide several benefits
          including the ability to edit on IQ.wiki. Users will get the HiIQ
          Brain Pass NFTs by staking IQ with HiIQ or be able to acquire the NFTs
          by purchasing them with IQ tokens.
        </>
      }
    />
  )
}

export default EditingIQWiki
