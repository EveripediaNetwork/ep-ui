import React from 'react'
import { Text, Flex, Icon } from '@chakra-ui/react'
import { RiSettings3Fill } from 'react-icons/ri'
import AccordionFAQItem from './AccordionFAQItem'

const CreateWikisFAQ = () => {
  return (
    <Flex direction="column" mt={10}>
      <Flex gap={2} align="center" justify="center" w="fit-content">
        <Icon as={RiSettings3Fill} boxSize={{ base: '25px', lg: '30px' }} />
        <Text
          fontWeight="bold"
          mt={5}
          textAlign={{ base: 'center', md: 'left', lg: 'left' }}
          fontSize={{ base: 'md', md: 'md', lg: 'xl' }}
          mb={4}
        >
          Creating Wikis on IQ.wiki
        </Text>
      </Flex>

      <AccordionFAQItem
        title="Getting Started"
        content={
          <>
            Before you can create or edit an IQ.wiki article you&apos;ll need to
            click the wallet icon and log in with your Brainlisted Polygon
            address using MetaMask or WalletConnect. <br />
            <br /> Prior to creating the new wiki, check if it does not exist
            yet. Go to the Search Bar and insert the title. The site will search
            our existing database to see if an article about the same topic
            already exists. If it does, edit the existing article. If there are
            no suggestions from the system, you can feel free to create a new
            article. <br />
            <br /> Click the Create Wiki button in the header navigation. Add
            your desired article title. Make sure that it is short and
            comprehensive - the system will generate the unique URL from the
            title.{' '}
            <iframe
              title="Getting Started with creating wikis on IQ.wiki"
              src="https://www.youtube.com/embed/Y4gWJUFchrc"
            />{' '}
          </>
        }
      />

      <AccordionFAQItem
        title="Adding a featured image"
        content={
          <>
            To add or update a featured image, click on the placeholder image.
            You can easily add a photo by dragging and dropping it or clicking
            to select an image from your PC. You can also click on Image URL and
            paste in a link to the image and the system will fetch it
            automatically.{' '}
            <iframe
              title="Adding a featured image"
              src="https://www.youtube.com/embed/3DFzzleCCNo"
            />
          </>
        }
      />
      <AccordionFAQItem
        title="Filling in the article"
        content={
          <>
            This is your chance to start writing and explaining the topic of
            your article. The intro should answer the basics and provide the
            most important info while headers can be used to create sections
            that provide additional details.
          </>
        }
      />
      <AccordionFAQItem
        title="Adding a citation"
        content={
          <>
            To add a reference or citation to the body of an article, first
            select where you want to add the citation by clicking on the place
            in the article where you would like to add the citation (you can
            start with adding a citation at the end of the first paragraph).{' '}
            <br />
            <br /> To actually add the citation click the “Cite” button, enter
            the URL, and a short description of the link you’re choosing to add
            (for example, you can enter the title of the article, the author,
            and/or the publishing date in the description). To actually insert
            the reference, click the pink “Cite” button. <br />
            <br />
            <iframe
              title="Adding a citation"
              src="https://www.youtube.com/embed/NrAUvtOpY0E"
            />
          </>
        }
      />
      <AccordionFAQItem
        title=" Submitting a wiki"
        content={
          <>
            When you&apos;re finished editing your IQ.wiki article, fill in the
            Wiki Summary section above the main image to give the readers the
            overall idea of the article. You are also required to select a
            category, tags and add social media links in the Edit Wiki Details
            section. When all these steps are done, you can hit the Publish
            button to save your page. You will have the option to add a comment
            while publishing. <br />
            <br />
            Comments give editors the opportunity to provide additional context
            or rationale for their edits. This creates more transparency within
            the community. <br />
            <br /> After pushing the Publish button, the system will initiate a
            gasless transaction, which you should sign with your wallet. Press
            Sign in the wallet pop-up window. In several moments your page
            should be recorded on the blockchain. Once your changes have been
            authorized by your wallet, you can see your wiki in the Reading
            Mode. After submission, you will also be able to view the
            transaction on block explorer and IPFS. If the changes are not
            visible make sure to hard refresh the page. Most edits go through in
            under a minute but it could take a few minutes if the Polygon
            network is congested. <br />
            <br />
            <iframe
              title="Submitting a wiki"
              src="https://www.youtube.com/embed/8ml3S6KUX3U"
            />
            <br />
            <br /> If you&apos;re looking for ways to improve your editing
            skills and make your pages stand out with Twitter feeds, headers,
            links to other IQ.wiki pages, quotes, categories, and infoboxes
            check out our Editing Guide below.
          </>
        }
      />
    </Flex>
  )
}

export default CreateWikisFAQ
