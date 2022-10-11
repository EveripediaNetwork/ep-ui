import {
  Box,
  Heading,
  Text,
  Flex,
  UnorderedList,
  ListItem,
  Container,
} from '@chakra-ui/react'
import React from 'react'
import RelatedTopics from '@/components/Elements/RelatedTopics/RelatedTopics'
import { GuidelinesHeader } from '@/components/SEO/Static'

const Privacy = () => (
  <>
    <GuidelinesHeader />
    <Container
      w="min(90%, 1200px)"
      maxW={{ base: '7xl', xl: '6xl', '2xl': '80%' }}
      my={{ base: '10', lg: '16' }}
    >
      <Heading my={8} as="h1" size="3xl" letterSpacing="wide">
        Guidelines
      </Heading>
      <Flex gap={10} flexDirection={{ base: 'column', lg: 'row' }}>
        <Flex gap={5} flex="3" flexDirection="column">
          <Text>
            IQ.wiki takes pride in being an inclusive platform for the
            cryptocurrency community. That said, there are a few
            editorial-related policies / do&apos;s and don&apos;t&apos;s we
            believe everyone should follow.
          </Text>
          <Heading as="h2" size="md">
            Guidelines on IQ.wiki
          </Heading>
          <Text>
            <b>Do:</b>
          </Text>
          <Text ml="6">
            <UnorderedList>
              <ListItem>
                <b>Write about cryptocurrency-related topics:</b> IQ.wiki is a
                cryptocurrency encyclopedia so feel free to create quality wikis
                about any topic that&apos;s related to crypto. To maintain the
                quality of the encyclopedia all pages must be cited and at least
                300 words. Each page should have some significance and relevance
                to the crypto community.
              </ListItem>
              <ListItem>
                <b>Write in a third-person, objective tone:</b> Because IQ.wiki
                is a knowledge base, one of the precedents we have set is to
                think from the perspective of an academic scholar. When editing
                an IQ.wiki article, ask yourself, &quot;Would this be considered
                an objective resource if someone else read this?&quot;
              </ListItem>
              <ListItem>
                <b>Cite your sources where needed:</b> It is important for
                IQ.wiki&apos;s platform to present accurate information. To make
                it easier for contributors and readers alike to see where
                editors get their information from (and the validity of those
                resources), it is important to cite their sources. This allows
                the community to checks editor&apos;s work and work with editors
                in an environment that is inherently collaborative.
              </ListItem>
            </UnorderedList>
          </Text>
          <Text>
            <b>Do Not:</b>
          </Text>
          <Text ml="6">
            <UnorderedList>
              <ListItem>
                <b>Write on topics unrelated to cryptocurrency:</b> IQ.wiki is
                first and foremost a cryptocurrency wiki. All articles on the
                site should have relevance and significance to the crypto
                community. Articles that are not related to cryptocurrency or
                are only tangentially related should be removed.
              </ListItem>
              <ListItem>
                <b>Plagiarize:</b>Publish content that is not your own and
                representing them as your work; this typically includes
                copying/pasting content without citing its original source and
                giving proper credit of the creator. It also includes violating
                copyright.
              </ListItem>
              <ListItem>
                <b>Vandalise:</b> Deliberately attempt to add, change, or remove
                content to tarnish the page.
              </ListItem>
              <ListItem>
                <b>Spam:</b> Reference content that attempts to promote
                irrelevant or inappropriate products to a page; these edit
                proposals tend to be in the form of advertisements and violate
                IQ.wiki &apos;s policy of writing in an objective tone.
              </ListItem>
              <ListItem>
                <b>Dox:</b> Broadcast private and/or sensitive information
                (particularly for non-public figures)
              </ListItem>
              <ListItem>
                Write opinions/blog posts (refer to the &apos;do&apos; section)
              </ListItem>
            </UnorderedList>
          </Text>

          <Heading as="h2" size="md">
            Social Channels:
          </Heading>
          <Text>
            Participation in IQ.wiki &apos;s social channels (particularly on
            Telegram, Discord) requires adherence to the below tenets. Failure
            to adhere to the guidelines may lead to expulsion.
          </Text>
          <Text ml="6">
            <UnorderedList>
              <ListItem>
                <b>Be Kind and Curteous:</b> We&apos;re all in this together to
                create a welcoming environment. Let&apos;s treat everyone with
                respect. Debates are more than welcome, but kindness is
                required.
              </ListItem>
              <ListItem>
                <b>No Bullying:</b> We want to make sure everyone feels safe
                here. Bullying of any kind isn&apos;t permitted, and degrading
                comments that intentionally offend or belittle other community
                members will not be tolerated and may result in a
                suspension/ban.
              </ListItem>
              <ListItem>
                <b>No Spamming:</b> Give more than you take to this group.
                Self-promotion is permitted, as long as the link is relevant to
                the EOS/IQ.wiki community.
              </ListItem>
            </UnorderedList>
          </Text>
          <Heading as="h2" size="md">
            Other (self-explanatory) rules:
          </Heading>
          <Text ml="6">
            <UnorderedList>
              <ListItem>
                <b>No nudity/sexual content</b>
              </ListItem>
              <ListItem>
                <b>No harmful/dangerous content</b>(encouraging others to do
                something where they could get badly hurt)
              </ListItem>
              <ListItem>
                <b>No content that incites hatred based on protected groups</b>
                (race/ethnic origin, sexual orientation/gender identity,
                disability, religion, nationality, age, gender, etc.)
              </ListItem>
              <ListItem>
                <b>No violence/graphic content</b>
              </ListItem>
              <ListItem>
                <b>No malicious attacks</b>(if someone is mildly annoying/petty,
                this should be ignored)
              </ListItem>
              <ListItem>
                <b>No threats/predatory harassment</b>
              </ListItem>
              <ListItem>
                <b>Respect everyone’s privacy</b>
              </ListItem>
            </UnorderedList>
          </Text>
          <Heading as="h2" size="md">
            Ideal Discussion in Community-Oriented Groups:
          </Heading>
          <Text ml="6">
            <UnorderedList>
              <ListItem>
                Questions about IQ.wiki : e.g. tokenomics, backstory, etc.
              </ListItem>
              <ListItem>
                Updates (for transparency purposes): new tech developments,
                projects that our community is working on, etc.
              </ListItem>
              <ListItem>
                Customer service: how IQ.wiki works, guidance for editing, how
                to find more information about other dapps, etc.
              </ListItem>
              <ListItem>
                A place where people can give us feedback on our progress, how
                to improve, etc.
              </ListItem>
              <ListItem>
                Sharing IQ.wiki pages for insights, conversation, and support.
              </ListItem>
            </UnorderedList>
          </Text>
        </Flex>
        <Box>
          <RelatedTopics
            topics={[
              { name: 'Terms of Service', url: '/static/terms' },
              { name: 'Privacy Policy', url: '/static/privacy' },
            ]}
          />
        </Box>
      </Flex>
    </Container>
  </>
)

export default Privacy
