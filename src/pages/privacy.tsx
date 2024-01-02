import {
  Box,
  Heading,
  Text,
  Flex,
  Divider,
  Link,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  UnorderedList,
  ListItem,
  Container,
} from '@chakra-ui/react'
import React from 'react'
import RelatedTopics from '@/components/Elements/RelatedTopics/RelatedTopics'
import { PrivacyPolicySEO } from '@/components/SEO/Static'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { transformTextContent } from '@/utils/transformTextContent'

const Privacy = () => {
  const { t } = useTranslation('policy')

  return (
    <>
      <PrivacyPolicySEO />
      <Container
        w="min(90%, 1200px)"
        maxW={{ base: '7xl', xl: '6xl', '2xl': '80%' }}
        my={{ base: '10', lg: '16' }}
      >
        <Heading my={8} as="h1" size="3xl" letterSpacing="wide">
          Privacy Policy
        </Heading>
        <Flex gap={10} flexDirection={{ base: 'column', lg: 'row' }}>
          <Flex gap={5} flex="3" flexDirection="column">
            <Text>{t('privacyIntro')}</Text>
            <Heading as="h2" size="md">
              {t('privacyInformationCollect')}
            </Heading>
            <Text>
              <b>The categories of information we collect can include:</b>
            </Text>
            <Text>
              <UnorderedList>
                <ListItem>
                  {transformTextContent(t('privacyRegistration'))}
                </ListItem>
                <ListItem>
                  {transformTextContent(t('privacyProfileInformation'))}
                </ListItem>
                <ListItem>
                  {transformTextContent(t('privacyInformationReceived'))}
                </ListItem>
              </UnorderedList>
            </Text>
            <Text>{t('privacyReasonForInfo')}</Text>
            <Heading as="h2" size="md">
              Information Automatically Collected.
            </Heading>
            <Text>{t('privacyAutomaticallyCollected')}</Text>
            <Heading as="h2" size="md">
              SHARING PERSONAL INFORMATION WITH THIRD PARTIES
            </Heading>
            <Text>{t('privacySharingInfoWithThirdPartiesContent')}</Text>
            <Text>We may also share your personal information with:</Text>
            <Text>
              <UnorderedList>
                <ListItem>
                  Other companies owned by or under common ownership as IQ.wiki
                  , Inc., which also includes our subsidiaries (i.e., any
                  organization we own or control) or our ultimate holding
                  company (i.e., any organization that owns or controls us) and
                  any subsidiaries it owns. These companies will use your
                  personal information in the same way as we can under this
                  Policy;
                </ListItem>
                <ListItem>
                  Third party vendors, consultants and other service providers
                  that perform services on our behalf, in order to carry out
                  their work for us, which may include providing cloud storage
                  or hosting services, marketing assistance, email delivery,
                  content or service fulfillment, or providing analytics
                  services. We share personal information with these third
                  parties as needed to perform services for us and under
                  reasonable confidentiality terms;
                </ListItem>
                <ListItem>
                  Our business partners who offer a service to you jointly with
                  us, for example, when running a co-sponsored contest or
                  promotion;
                </ListItem>
                <ListItem>
                  Third parties who we think may offer you products or services
                  you may enjoy. We reserve the right to share your personal
                  information, such as email address and user name, with third
                  parties for their marketing purposes in the future if we
                  determine that there may be additional products or services
                  which may be of interest to you. See &quot;Your Choices&quot;
                  below for details on how to opt-out of this sharing;
                </ListItem>
                <ListItem>
                  Third parties at your request. For example, you may have the
                  option to share your activities on our Services with your
                  friends through social media;
                </ListItem>
                <ListItem>
                  Other parties in connection with any company transaction, such
                  as a merger, sale of company assets or shares, reorganization,
                  financing, change of control or acquisition of all or a
                  portion of our business by another company or third party or
                  in the event of bankruptcy or related or similar proceedings;
                  and
                </ListItem>
                <ListItem>
                  Third parties as required to (i) satisfy any applicable law,
                  regulation, subpoena/court order, legal process or other
                  government request, (ii) enforce our Terms of Use Agreement,
                  including the investigation of potential violations thereof,
                  (iii) investigate and defend ourselves against any third party
                  claims or allegations, (iv) protect against harm to the
                  rights, property or safety of IQ.wiki , its users or the
                  public as required or permitted by law and (v) detect, prevent
                  or otherwise address criminal (including fraud or stalking),
                  security or technical issues. We may also share information
                  with others in an aggregated and anonymous form that does not
                  reasonably identify you directly as an individual.
                </ListItem>
              </UnorderedList>
            </Text>
            <Heading as="h2" size="md">
              YOUR CHOICES REGARDING YOUR INFORMATION
            </Heading>
            <Text>
              {transformTextContent(t('privacyConcerningYourChoice'))}
            </Text>
            <Heading as="h2" size="md">
              SECURITY AND STORAGE OF INFORMATION
            </Heading>
            <Text>
              IQ.wiki cares about the security of your information and uses
              commercially reasonable physical, administrative, and
              technological safeguards to preserve the integrity and security of
              all information we collect and that we share with our service
              providers. Because of the nature of our website, WE DO NOT
              CURRENTLY ENCRYPT ANY TRANSMISSIONS TO OR FROM THE WEBSITE IN ANY
              MANNER. IF YOU ARE UNCOMFORTABLE WITH THE UNENCRYPTED TRANSMISSION
              OF THE PERSONAL INFORMATION DESCRIBED HEREIN, PLEASE DO NOT SUBMIT
              INFORMATION TO US THROUGH THE WEBSITE. While we take reasonable
              precautions against possible security breaches, no website or
              internet transmission is completely secure and we cannot guarantee
              that unauthorized access, hacking, data loss or other breach will
              never occur. In the event that any information under our control
              is compromised as a result of a breach of security, we will take
              reasonable steps to investigate the situation and where
              appropriate, notify those individuals whose information may have
              been compromised and take other steps, in accordance with any
              applicable laws and regulations.
            </Text>
            <Heading as="h2" size="md">
              CHILDREN'S PRIVACY
            </Heading>
            <Text>
              This Website is not intended for children under the age of 13 and
              we do not knowingly collect any personal information from children
              under 13. In the event that we learn that we have inadvertently
              collected personal information from children under 13, we will
              delete or anonymize such information. Please contact us at
              webmaster@everipedia.com if you have any questions about
              children's privacy.
            </Text>
            <Divider />
            <Heading as="h2" size="md">
              COOKIES
            </Heading>
            <Text>
              A browser cookie is a small piece of data that is stored on your
              device to help websites and mobile apps remember things about you.
              Other technologies, including Web storage and identifiers
              associated with your device, may be used for similar purposes. In
              this policy, we say “cookies” to refer to all of these
              technologies.
            </Text>
            <Heading as="h3" size="sm">
              How We Use Cookies
            </Heading>
            <Text>
              Like most providers of online services, our site uses cookies,
              including third-party cookies, for a number of reasons, like
              protecting your data and account, helping us see which features
              are most popular, counting visitors to a page, improving our
              users’ experience, keeping our services secure, providing relevant
              advertising, and just generally providing you with a better, more
              intuitive, and satisfying experience. The cookies we use generally
              fall into one of the following categories.
            </Text>
            <Table>
              <Thead>
                <Tr>
                  <Th>Category of cookies</Th>
                  <Th>Why we use these cookies</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Necessary</Td>
                  <Td>
                    We use these cookies to run our site, and to identify and
                    prevent security risks. For example, we may use these
                    cookies to store your session information to prevent others
                    from changing your password without your username and
                    password.
                  </Td>
                </Tr>
                <Tr>
                  <Td>Preferences</Td>
                  <Td>
                    We use these cookies to remember your settings and
                    preferences, and to improve your experience on our site. For
                    example, we may use these cookies to remember your language
                    preferences.
                  </Td>
                </Tr>
                <Tr>
                  <Td>Performance</Td>
                  <Td>
                    We use these cookies to collect information about how you
                    use our site, monitor site performance, and improve our site
                    performance, our services, and your experience. For example,
                    we can use these cookies to learn more about which features
                    are the most popular with our users and which ones might
                    need some tweaks.
                  </Td>
                </Tr>
                <Tr>
                  <Td>Marketing</Td>
                  <Td>
                    We use these cookies to deliver advertisements, to make them
                    more relevant and meaningful to consumers, and to track the
                    efficiency of our advertising campaigns, both on our
                    services and on other sites or mobile apps.may use these
                    cookies to build a profile of your interests and deliver
                    relevant advertising on other sites.
                  </Td>
                </Tr>
              </Tbody>
            </Table>
            <Heading as="h2" size="md">
              Analytics and Advertising Services
            </Heading>
            <Heading as="h3" size="sm">
              Provided by Others
            </Heading>
            <Text>
              We may let other companies use cookies on our services. These
              companies may collect information about how you use our services
              over time and combine it with similar information from other
              services and companies. This information may be used to, among
              other things, analyze and track data, determine the popularity of
              certain content, and better understand your online activity.
            </Text>
            <Text>
              Additionally, some companies, including our affiliates, may use
              information collected on our services to prevent fraud or other
              unauthorized or illegal activity and to measure and optimize the
              performance of ads and deliver more relevant ads on behalf of us
              or other companies, including on third-party websites and apps.
            </Text>
            <Heading as="h3" size="sm">
              Provided by Us
            </Heading>
            <Text>
              We may collect information about your activity on third-party
              services that use cookies provided by us. We use this information
              to improve our advertising services, including measuring the
              performance of ads and showing you more relevant ads.{' '}
            </Text>
            <Heading as="h3" size="sm">
              LINKS TO THIRD PARTY WEBSITES
            </Heading>
            <Text>
              The Services may, from time to time, contain links to and from
              third party websites of our partner networks, advertisers, partner
              merchants, retailers and affiliates. If you follow a link to any
              of these websites, please note that these websites have their own
              privacy policies and that we do not accept any responsibility or
              liability for their policies. Please check the individual policies
              before you submit any information to those websites.
            </Text>
            <Divider />
            <Heading
              as="h2"
              size="md"
              id="california"
              style={{ scrollMarginTop: '100px' }}
            >
              CALIFORNIA RESIDENTS (California Consumer Privacy Act of 2018)
            </Heading>
            <Text>
              The California Constitution grants a right of privacy. Existing
              law provides for the confidentiality of personal information in
              various contexts and requires a business or person that suffers a
              breach of security of computerized data that includes personal
              information, as defined, to disclose that breach, as specified.
              California Consumer Privacy Act of 2018. Beginning January 1,
              2020, the act will grant a consumer a right to request a business
              to disclose the categories and specific pieces of personal
              information that it collects about the consumer, the categories of
              sources from which that information is collected, the business
              purposes for collecting or selling the information, and the
              categories of 3rd parties with which the information is shared.
              The act will require a business to make disclosures about the
              information and the purposes for which it is used. The act will
              grant a consumer the right to request deletion of personal
              information and would require the business to delete upon receipt
              of a verified request, as specified. The act will grant a consumer
              a right to request that a business that sells the consumer&rsquo;s
              personal information, or discloses it for a business purpose,
              disclose the categories of information that it collects and
              categories of information and the identity of 3rd parties to which
              the information was sold or disclosed. The act will require a
              business to provide this information in response to a verifiable
              consumer request. The act will authorize a consumer to opt out of
              the sale of personal information by a business and would prohibit
              the business from discriminating against the consumer for
              exercising this right, including by charging the consumer who opts
              out a different price or providing the consumer a different
              quality of goods or services, except if the difference is
              reasonably related to value provided by the consumer&rsquo;s data.
              The act will authorize businesses to offer financial incentives
              for collection of personal information. The act will prohibit a
              business from selling the personal information of a consumer under
              16 years of age, unless affirmatively authorized, as specified, to
              be referred to as the right to opt in. The act will prescribe
              requirements for receiving, processing, and satisfying these
              requests from consumers. The act will prescribe various
              definitions for its purposes and would define &ldquo;personal
              information&rdquo; with reference to a broad list of
              characteristics and behaviors, personal and commercial, as well as
              inferences drawn from this information. The act will prohibit the
              provisions described above from restricting the ability of the
              business to comply with federal, state, or local laws, among other
              things.
              <br /> Bill text:{' '}
              <Link
                color="brandLinkColor"
                href="https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=201720180AB375"
              >
                https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=201720180AB375
              </Link>
              <br />
              More info:{' '}
              <Link color="brandLinkColor" href="https://www.caprivacy.org/">
                https://www.caprivacy.org/
              </Link>
            </Text>
            <Heading as="h2" size="md">
              UPDATES TO THIS POLICY
            </Heading>
            <Text>
              We reserve the right to modify this Policy from time to time. If
              we make any changes to this Policy, we will change the &quot;Last
              Revision&quot; date below and will post the updated Policy on this
              page.
            </Text>
          </Flex>
          <Box>
            <RelatedTopics
              topics={[
                { name: 'Terms of Service', url: '/terms' },
                { name: 'Guidelines', url: '/guidelines' },
              ]}
            />
          </Box>
        </Flex>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'policy',
        'common',
        'footer',
      ])),
    },
  }
}

export default Privacy
