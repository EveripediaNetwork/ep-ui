import React from 'react'
import { MinusIcon, AddIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionItem,
  Text,
  AccordionButton,
  Box,
  AccordionPanel,
  Flex,
  Icon,
  Link,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react'
import { RiFlagFill } from 'react-icons/ri'

const SingleLink = ({ href, title }: { href: string; title: string }) => {
  return (
    <Link href={href} target="_blank" textDecoration="underline" color="blue">
      {title}{' '}
    </Link>
  )
}

const GettingStartedAccordion = () => {
  return (
    <Flex direction="column" mt={10}>
      <Flex gap={2} align="center" justify="center" w="fit-content">
        <Icon as={RiFlagFill} boxSize={{ base: '25px', lg: '30px' }} />
        <Text
          fontWeight="bold"
          mt={5}
          textAlign={{ base: 'center', md: 'left', lg: 'left' }}
          fontSize={{ base: 'md', md: 'md', lg: 'xl' }}
          mb={4}
        >
          Getting Started
        </Text>
      </Flex>
      <Accordion defaultIndex={[1]} allowMultiple my={{ base: 1 }}>
        <AccordionItem
          borderRadius="5"
          py={{ base: 5 }}
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
                        What is IQ.wiki?
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
                    <SingleLink
                      href="https://iq.wiki/wiki/iqwiki"
                      title="IQ.wiki"
                    />
                    formerly Everipedia, is the world’s largest crypto
                    encyclopedia with thousands of pages. The new IQ.wiki
                    platform has been built from the ground up to be fully Web3
                    with all edits recorded on-chain through Polygon and IPFS.
                    The encyclopedia is governed by IQ token stakers who earn
                    rewards for their contributions. For more information on
                    IQ.wiki see the{' '}
                    <SingleLink
                      href="https://iq.wiki/wiki/iqwiki"
                      title="IQ.wiki page"
                    />
                    on IQ.wiki.
                  </Text>
                </AccordionPanel>
              </>
            )
          }}
        </AccordionItem>
      </Accordion>

      <Accordion defaultIndex={[1]} allowMultiple my={{ base: 1 }}>
        <AccordionItem
          borderRadius="5"
          py={{ base: 5 }}
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
                    While the site is in beta, to get started editing you need
                    to{' '}
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
                    />{' '}
                    or{' '}
                    <SingleLink
                      title="WalletConnect"
                      href="https://walletconnect.com/"
                    />{' '}
                    wallet. For more information on how to set up a Polygon
                    address with your MetaMask wallet check out this{' '}
                    <SingleLink
                      title="Coindesk
                    guide"
                      href="https://www.coindesk.com/learn/how-to-connect-metamask-to-the-polygon-network/"
                    />
                    . <br />
                    <br /> After you submit your Brainlist application you will
                    receive an initial confirmation email. And then if you are
                    approved to Brainlist you will receive an approval email.{' '}
                    <br />
                    <br />
                    We’ll be approving people for Brainlist on a rolling basis
                    so don’t worry if you’ve already applied and have not been
                    approved yet. <br />
                    <br />
                    After the beta period, IQ.wiki plans on stopping Brainlist
                    and introducing HiIQ Brain Pass NFTs which will provide
                    several benefits including the ability to edit on IQ.wiki.
                    Users will get the HiIQ Brain Pass NFTs by staking IQ with
                    HiIQ or be able to acquire the NFTs by purchasing them with
                    IQ tokens.
                  </Text>
                </AccordionPanel>
              </>
            )
          }}
        </AccordionItem>
      </Accordion>

      <Accordion defaultIndex={[1]} allowMultiple my={{ base: 1 }}>
        <AccordionItem
          borderRadius="5"
          py={{ base: 5 }}
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
                        What is the IQ token?
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
                    The{' '}
                    <SingleLink
                      title="IQ token"
                      href="https://iq.wiki/wiki/iqwiki"
                    />{' '}
                    is a cryptocurrency dedicated to the future of knowledge.
                    The IQ token powers IQ.wiki, the world&apos;s largest
                    cryptocurrency encyclopedia. IQ is both a governance and
                    DeFi token with IQ stakers governing the platform and
                    earning rewards. The token is managed by BrainDAO and backed
                    by BrainDAO&apos;s treasury of IQ tokens, stablecoins, blue
                    chip NFTs, and other digital assets. <br />
                    <br /> For more information about the IQ token see the{' '}
                    <SingleLink
                      title="IQ
                    token page"
                      href="https://iq.wiki/wiki/iqwiki"
                    />{' '}
                    on IQ.wiki.
                  </Text>
                </AccordionPanel>
              </>
            )
          }}
        </AccordionItem>
      </Accordion>

      <Accordion defaultIndex={[1]} allowMultiple my={{ base: 1 }}>
        <AccordionItem
          borderRadius="5"
          py={{ base: 5 }}
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
                        Where do I get IQ tokens?
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
                    You can get IQ tokens from a variety of centralized and
                    decentralized exchanges including Binance, Crypto.com,
                    Fraxswap, and more. See the{' '}
                    <SingleLink
                      title="Exchanges"
                      href="https://learn.everipedia.org/iq/iq/exchanges"
                    />{' '}
                    section of our Learn site for the full list.
                  </Text>
                </AccordionPanel>
              </>
            )
          }}
        </AccordionItem>
      </Accordion>

      <Accordion defaultIndex={[1]} allowMultiple my={{ base: 1 }}>
        <AccordionItem
          borderRadius="5"
          py={{ base: 5 }}
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
                        How do I stake IQ to earn token rewards and get involved
                        in governance?
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
                    For more information on how to start earning IQ token
                    rewards and get involved in the governance of the IQ token,
                    check out the{' '}
                    <SingleLink
                      title="HiIQ page on our Learn site"
                      href="https://learn.everipedia.org/iq/iq/locking-hiiq"
                    />{' '}
                    which explains how staking works and includes tutorials on
                    how to stake.
                  </Text>
                </AccordionPanel>
              </>
            )
          }}
        </AccordionItem>
      </Accordion>

      <Accordion defaultIndex={[1]} allowMultiple my={{ base: 1 }}>
        <AccordionItem
          borderRadius="5"
          py={{ base: 5 }}
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
                        IQ.wiki Rules
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
                    <b>Standards:</b>
                    <br />
                    <UnorderedList>
                      <ListItem>
                        IQ.wiki is a cryptocurrency encyclopedia so all IQ.wiki
                        articles must be related to the cryptocurrency or
                        blockchain space.
                      </ListItem>
                      <ListItem>
                        For people to have a wiki, they need to have made
                        contributions to the crypto space or worked in the
                        crypto space.{' '}
                      </ListItem>
                      <ListItem>
                        Editors should follow the minimum content requirements:
                        at least 300 words in the wiki’s main body, using
                        appropriate categories and tags, and uploaded media
                        should be only of high quality.
                      </ListItem>
                      <ListItem>
                        All content has to be cited. This allows the community
                        to check editors’ work and work with editors in an
                        environment that is inherently collaborative.
                      </ListItem>
                      <ListItem>
                        All content has to be neutral. Because IQ.wiki is a
                        knowledge base, editors should think from the
                        perspective of an academic scholar and provide unbiased
                        information.
                      </ListItem>
                      <ListItem>
                        All content should be written in the third person.
                      </ListItem>
                      <ListItem>
                        Spelling and grammar should be carefully checked before
                        an edit submission.
                      </ListItem>
                      <ListItem>
                        Pages that have a completion score lower than 50 are
                        subject to removal.
                      </ListItem>
                      <ListItem>
                        To maintain the quality of the encyclopedia low quality
                        wikis will be removed.
                      </ListItem>
                    </UnorderedList>
                    <br />

                    <b>Do Not:</b>
                    <br />
                    <UnorderedList>
                      <ListItem>
                        Plagiarize content that is not your own and represent it
                        as your work; this typically includes copying/pasting
                        content without citing its original source and giving
                        proper credit to the creator. It also includes violating
                        copyright.
                      </ListItem>
                      <ListItem>
                        Vandalize: deliberately attempt to add, change, or
                        remove content to tarnish the wiki.
                      </ListItem>
                      <ListItem>
                        Spam: reference content that attempts to promote
                        irrelevant or inappropriate products to a page; these
                        edit proposals tend to be in the form of advertisements
                        and violate IQ.wiki’s policy of writing in a neutral
                        tone.
                      </ListItem>
                    </UnorderedList>
                  </Text>
                </AccordionPanel>
              </>
            )
          }}
        </AccordionItem>
      </Accordion>
    </Flex>
  )
}

export default GettingStartedAccordion
