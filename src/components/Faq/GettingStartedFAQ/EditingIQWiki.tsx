import React from 'react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@chakra-ui/react'
import { SingleLink } from '../SingleLink'

const EditingIQWiki = () => {
  return (
    <AccordionItem
      borderRadius="5"
      py={{ base: 5 }}
      mb={{ base: 2 }}
      border="none"
      _light={{ boxShadow: '0px 0px 20px 11px #80808012', bg: '#ffffff' }}
      _dark={{ bg: '#2D3748' }}
    >
      {({ isExpanded }) => {
        return (
          <>
            <Text
              fontWeight="bold"
              fontSize={{ base: 'sm', md: 'md', lg: 'xl' }}
            >
              <AccordionButton
                _hover={{ bg: 'none' }}
                _focus={{ outline: 'none' }}
              >
                <Box flex="1" textAlign="left">
                  <Text
                    fontWeight="bold"
                    fontSize={{ base: 'sm', md: 'md', lg: 'md' }}
                  >
                    How do I join Brainlist and start editing IQ.wiki?
                  </Text>
                </Box>
                {isExpanded ? (
                  <MinusIcon fontSize="12px" />
                ) : (
                  <AddIcon fontSize="12px" />
                )}
              </AccordionButton>
            </Text>
            <AccordionPanel pb={4}>
              <Text
                fontSize={{ base: 'sm', md: 'sm', lg: 'sm' }}
                lineHeight={2}
              >
                While the site is in beta, to get started editing you need to{' '}
                <SingleLink
                  title="sign up for the Brainlist using this form"
                  href="https://forms.gle/bmMce4r3JJckpSNJ7"
                />{' '}
                .
                <br />
                <br /> As part of the signing up, you’ll need to create a
                Polygon address as well as a{' '}
                <SingleLink
                  title="MetaMask"
                  href="https://metamask.io/"
                /> or{' '}
                <SingleLink
                  title="WalletConnect"
                  href="https://walletconnect.com/"
                />{' '}
                wallet. For more information on how to set up a Polygon address
                with your MetaMask wallet check out this{' '}
                <SingleLink
                  title="Coindesk
                    guide"
                  href="https://www.coindesk.com/learn/how-to-connect-metamask-to-the-polygon-network/"
                />
                . <br />
                <br /> After you submit your Brainlist application you will
                receive an initial confirmation email. And then if you are
                approved to Brainlist you will receive an approval email. <br />
                <br />
                We’ll be approving people for Brainlist on a rolling basis so
                don’t worry if you’ve already applied and have not been approved
                yet. <br />
                <br />
                After the beta period, IQ.wiki plans on stopping Brainlist and
                introducing HiIQ Brain Pass NFTs which will provide several
                benefits including the ability to edit on IQ.wiki. Users will
                get the HiIQ Brain Pass NFTs by staking IQ with HiIQ or be able
                to acquire the NFTs by purchasing them with IQ tokens.
              </Text>
            </AccordionPanel>
          </>
        )
      }}
    </AccordionItem>
  )
}

export default EditingIQWiki
