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
} from '@chakra-ui/react'
import { RiEdit2Fill } from 'react-icons/ri'

const EditingWikisFAQ = () => {
  return (
    <Flex direction="column" mt={10}>
      <Flex gap={2} align="center" justify="center" w="fit-content">
        <Icon as={RiEdit2Fill} boxSize={{ base: '25px', lg: '30px' }} />
        <Text
          fontWeight="bold"
          mt={5}
          textAlign={{ base: 'center', md: 'left', lg: 'left' }}
          fontSize={{ base: 'md', md: 'md', lg: 'xl' }}
          mb={4}
        >
          Editing Wikis on IQ.wiki
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
                        Getting Started
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
                    Before you can edit an IQ.wiki article you&apos;ll need to
                    log in with your Brainlisted Polygon address using MetaMask
                    or Walletconnect. Editing an article is quite similar to
                    creating an article. The only difference is that you need to
                    start with an existing IQ.wiki article and open the Edit
                    Mode instead of starting with the Create Wiki button.
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
                        Editing Mode
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
                    To open the Editing Mode and start editing an IQ.wiki
                    article click the Edit button. To learn the basics of
                    editing on IQ.wiki, how to add a featured image,
                    information, and citations as well as how to submit your
                    page, first make sure to read the Creating an Article of
                    this FAQ page.
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
                        Headers and Sections
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
                    You can use headers like Overview, Use Cases, and
                    Tokenomics, to create different sections on your wiki and
                    make it easier to read. <br />
                    <br /> To add a header click the H button, choose the
                    appropriate size and type in the title of the section. You
                    can use H1 to H6 to create subsections as part of the
                    original section. Use “paragraph” for the plain text.
                    <br />
                    <br />
                    <iframe
                      title="Headers and Sections"
                      src="https://www.youtube.com/embed/qshwjtDtNss"
                    />
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
                        Quotes
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
                    Quotes are a great way to add the perspectives of the
                    people/companies involved or covered in the wiki. To add a
                    quote select the quoted information and click the blockquote
                    button. <br />
                    <br />
                    <iframe
                      title="Quotes on editing wikis"
                      src="https://www.youtube.com/embed/P1yHumUmO6k"
                    />
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
                        Adding Item to the Media Gallery
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
                    To add an image to the media gallery, navigate to the media
                    gallery on the right side of the article (below the main
                    image) and click new “Add images/video”. You can drag and
                    drop an image or video or click to select it from your PC.
                    You can paste a YouTube or image link as well as the system
                    will automatically fetch the media.
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
                        Embedding Images & Videos
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
                    To add an image or video to the body of an IQ.wiki article,
                    first select where you want to add the media by clicking on
                    the place in the article where you would like to add the
                    media (you can start with adding media to the introduction
                    by placing your cursor before the first word of the
                    article). <br />
                    <br /> To actually add the media click the “Media” button in
                    the editor toolbar, select the photo or video, and press the
                    one you want to add.
                    <br />
                    <br />
                    <iframe
                      title="Quotes on editing wikis"
                      src="https://www.youtube.com/embed/_54xE_e5BiQ"
                    />
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
                        Categories and Tags
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
                    Categories allow users to group wikis together by topic and
                    make it easier for readers to discover related wikis. To add
                    a category click the Edit Categories section and type out
                    the category you want to add. The six initial categories on
                    IQ.wiki are: NFTs, Decentralized Finance, Exchanges,
                    Cryptocurrencies, People in Crypto and DAOs. <br />
                    <br /> Tags allow users to go from one page to another
                    within the specific topic in question. Pressing on some
                    specific tags, for example, Games will lead a user to the
                    list with all the wikis about crypto-based games on IQ.wiki.{' '}
                    <br />
                    <br /> Both of these features are accessible from Edit Wiki
                    Details panel that can be found under the main image.
                    <br />
                    <br />
                    <iframe
                      title="Quotes on editing wikis"
                      src="https://www.youtube.com/embed/XWFeUeEVW0c"
                    />
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
                        Adding Internal Links
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
                    Adding a link to another IQ.wiki article is a great way to
                    refer people to information related to the article you are
                    editing. To add an internal link, click on the place in the
                    article where you would like to add an internal link, press
                    “Insert Wiki Link” and type in the article you would like to
                    include. Then press “Link” to insert it. <br />
                    <br /> *There is an “override text” option, which allows you
                    to make the clickable text of the link different from the
                    title of the IQ.wiki article. By using the override text
                    feature, you can have BAYC appear as the visible text
                    instead of Bored Ape Yacht Club. <br />
                    <br />
                    <iframe
                      title="Quotes on editing wikis"
                      src="https://www.youtube.com/embed/WyLVpULmyP4"
                    />
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
                        Edit History
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
                    To see the past edits that have been made to an IQ.wiki
                    article you can click on the History button which is located
                    below the Edit button. The History feature allows users to
                    examine the different versions of an article and the
                    differences between them on a special timeline. The History
                    page also links to the Polygon transaction and IPFS hash for
                    each edit. <br />
                    <br />{' '}
                    <iframe
                      title="Quotes on editing wikis"
                      src="https://www.youtube.com/embed/gjYErj7O-PQ"
                    />
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

export default EditingWikisFAQ
