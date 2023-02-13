import React from 'react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Box,
  AccordionItem,
  Text,
  AccordionButton,
  AccordionPanel,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react'

const IQRules = () => {
  return (
    <AccordionItem
      mb={{ base: 2 }}
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
                    articles must be related to the cryptocurrency or blockchain
                    space.
                  </ListItem>
                  <ListItem>
                    For people to have a wiki, they need to have made
                    contributions to the crypto space or worked in the crypto
                    space.{' '}
                  </ListItem>
                  <ListItem>
                    Editors should follow the minimum content requirements: at
                    least 300 words in the wiki’s main body, using appropriate
                    categories and tags, and uploaded media should be only of
                    high quality.
                  </ListItem>
                  <ListItem>
                    All content has to be cited. This allows the community to
                    check editors’ work and work with editors in an environment
                    that is inherently collaborative.
                  </ListItem>
                  <ListItem>
                    All content has to be neutral. Because IQ.wiki is a
                    knowledge base, editors should think from the perspective of
                    an academic scholar and provide unbiased information.
                  </ListItem>
                  <ListItem>
                    All content should be written in the third person.
                  </ListItem>
                  <ListItem>
                    Spelling and grammar should be carefully checked before an
                    edit submission.
                  </ListItem>
                  <ListItem>
                    Pages that have a completion score lower than 50 are subject
                    to removal.
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
                    Plagiarize content that is not your own and represent it as
                    your work; this typically includes copying/pasting content
                    without citing its original source and giving proper credit
                    to the creator. It also includes violating copyright.
                  </ListItem>
                  <ListItem>
                    Vandalize: deliberately attempt to add, change, or remove
                    content to tarnish the wiki.
                  </ListItem>
                  <ListItem>
                    Spam: reference content that attempts to promote irrelevant
                    or inappropriate products to a page; these edit proposals
                    tend to be in the form of advertisements and violate
                    IQ.wiki’s policy of writing in a neutral tone.
                  </ListItem>
                </UnorderedList>
              </Text>
            </AccordionPanel>
          </>
        )
      }}
    </AccordionItem>
  )
}

export default IQRules
