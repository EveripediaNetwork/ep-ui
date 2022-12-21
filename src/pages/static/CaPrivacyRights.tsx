import {
  Box,
  Heading,
  Text,
  Flex,
  Link,
  Container,
  ListItem,
  UnorderedList,
  OrderedList,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import React from 'react'
import RelatedTopics from '@/components/Elements/RelatedTopics/RelatedTopics'
import { TermsHeader } from '@/components/SEO/Static'

const CaPrivacyRights = () => (
  <>
    <TermsHeader />
    <Container
      w="min(90%, 1200px)"
      maxW={{ base: '7xl', xl: '6xl', '2xl': '80%' }}
      my={{ base: '10', lg: '16' }}
    >
      <Heading my={8} as="h1" size="3xl" letterSpacing="wide">
        CA Privacy Rights
      </Heading>
      <Flex gap={10} flexDirection={{ base: 'column', lg: 'row' }}>
        <Flex gap={5} flex="3" flexDirection="column">
          <Heading as="h2" size="md">
            Notice to California Residents
          </Heading>
          <Text>
            We are required by the California Consumer Privacy Act of 2018
            (&quot;CCPA&quot;) to provide to California residents an explanation
            of how we collect, use and share their personal Information, and of
            the rights and choices we offer California residents regarding our
            handling of the personal information.
          </Text>
          <Heading as="h2" size="md">
            Personal Information that We Collect, Use and Share
          </Heading>
          <Text>
            Here is a summary of how we currently collect, use and share
            personal information, and how we have collected used and shared the
            information in the preceding 12 months. While we refer to the term
            &quot;sell&quot; in the right column of this chart, as the CCPA
            requires, please note that CCPA defines &quot;sale&quot; very
            broadly to include most sharing of personal information where the
            recipient may use the information for its own purposes, even when we
            do not get paid for the information.
          </Text>
          <Table>
            <Thead>
              <Tr>
                <Th>Personal information we collect</Th>
                <Th>CCPA-defined categories (click for details)</Th>
                <Th>
                  Sources from which we may collect the personal Information
                </Th>
                <Th>
                  Purposes for which we may collect and use the personal
                  information
                </Th>
                <Th>
                  Categories of third parties to which we disclose the personal
                  information
                </Th>
                <Th>Is the disclosure a &ldquo;sale&rdquo; under the CCPA?</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  Name, Email, <br />
                  Profile / Avatar Photograph
                </Td>
                <Td>Identifiers</Td>
                <Td>Magic, Facebook, Twitter, etc login</Td>
                <Td>
                  Service delivery,
                  <br />
                  Research & development
                </Td>
                <Td>Publicly shown</Td>
                <Td>No</Td>
              </Tr>
              <Tr>
                <Td>Location, Short Biography</Td>
                <Td>Identifiers</Td>
                <Td>Manually entered by user</Td>
                <Td>
                  Service delivery,
                  <br />
                  Research & development
                </Td>
                <Td>Publicly shown</Td>
                <Td>No</Td>
              </Tr>
              <Tr>
                <Td>Social Media Account Names</Td>
                <Td>Online Identifiers</Td>
                <Td>
                  Manually entered by user,
                  <br />
                  Magic, Facebook, Twitter, etc login
                </Td>
                <Td>
                  Service delivery,
                  <br />
                  Research & development
                </Td>
                <Td>Publicly shown</Td>
                <Td>No</Td>
              </Tr>
              <Tr>
                <Td>Cookies, Browsing Behavior on IQ.wiki</Td>
                <Td>Online Identifiers</Td>
                <Td>
                  Browser, <br />
                  Third party scripts like Google Analytics
                </Td>
                <Td>
                  Service delivery,
                  <br />
                  Research & development
                </Td>
                <Td>
                  None (privately analyzed), <br /> Third party scripts may use
                  data differently
                </Td>
                <Td>Yes</Td>
              </Tr>
            </Tbody>
          </Table>
          <Text>
            Please note that we may also disclose all personal information (a)
            comply with federal, state, or local laws; (b) comply with a civil,
            criminal, or regulatory inquiry, investigation, subpoena, or summons
            by federal, state, or local authorities; (c) cooperate with law
            enforcement agencies concerning conduct or activity that we believe
            may violate federal, state, or local law, (d) when we sell, transfer
            or otherwise share some or all of our business or assets, including
            your personal information, in connection with a business transaction
            (or potential business transaction), or (e) to professional
            advisors, such as lawyers, bankers, auditors and insurers, where
            necessary in the course of the professional services that they
            render to us. These disclosures are not &quot;sales&quot; under the
            CCPA.
          </Text>

          <Heading as="h2" size="md">
            California Resident&apos;s Privacy Rights
          </Heading>
          <Text>
            The CCPA grants California residents have the following rights.
            Please note that the CCPA limits these rights by, for example,
            prohibiting us from providing certain sensitive information in
            response to an access request and limiting the circumstances in
            which we must comply with a deletion request. If we deny your
            request, we will communicate our decision to you.
          </Text>
          <Text>
            <UnorderedList>
              <ListItem>
                <b>Information:</b> You can request information about how we
                have collected, used, and shared your Personal Information
                during the past 12 months.
              </ListItem>
              <ListItem>
                <b>Access:</b> You can request a copy of the Personal
                Information that we maintain about you.
              </ListItem>
              <ListItem>
                <b>Deletion:</b> You can ask us to delete the Personal
                Information that we collected or maintain about you.
              </ListItem>
              <ListItem>
                <b>Opt-out of sale of your personal information:</b> If we sell
                your personal information, you can direct us to stop selling
                your information. If you opt-out we will also stop sharing your
                personal information covered by that law with third parties for
                their direct marketing purposes. While we refer to the term
                &quot;sell&quot; as the CCPA requires, please note that CCPA
                defines &quot;sale&quot; very broadly to include most sharing of
                personal information where the recipient may use the information
                for its own purposes, even when we do not get paid for the
                information.
              </ListItem>
            </UnorderedList>
          </Text>
          <Heading as="h2" size="md">
            How to Submit a Request
          </Heading>
          <Text>
            <b>To request access to or deletion of personal information : </b>
            <br /> <br />
            <OrderedList>
              <ListItem>
                Go to our IQ.wiki Content Removal form{' '}
                <Link
                  color="brandLinkColor"
                  href="https://forms.gle/WivCngAngW19kGMn9"
                >
                  here
                </Link>
                .
              </ListItem>
              <ListItem>
                Enter your information and request in the form, and request to
                have your information removed.
              </ListItem>
            </OrderedList>
          </Text>
          <Heading as="h2" size="md">
            Notes
          </Heading>
          <Text>
            <UnorderedList>
              <ListItem>
                <b>Identity verification:</b> CCPA requires us to verify the
                identity of the individual submitting the request before
                providing a substantive response to the request.
              </ListItem>
              <ListItem>
                <b>Authorized agents:</b> California residents can empower an
                &ldquo;authorized agent&rdquo; to submit requests on their
                behalf. We will require the authorized agent to have a written
                authorization confirming that authority.
              </ListItem>
            </UnorderedList>
          </Text>
        </Flex>
        <Box>
          <RelatedTopics
            topics={[
              { name: 'Privacy Policy', url: '/static/privacy' },
              { name: 'Guidelines', url: '/static/guidelines' },
            ]}
          />
        </Box>
      </Flex>
    </Container>
  </>
)

export default CaPrivacyRights
