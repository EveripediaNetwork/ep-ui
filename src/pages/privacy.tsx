import {
  Box,
  Heading,
  Text,
  Flex,
  Divider,
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
              <b>{t('privacyInformationCollectionInclusion')}</b>
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
                <ListItem>{t('privacyWeMayAlsoShareWithCompanies')}</ListItem>
                <ListItem>
                  {t('privacyWeMayAlsoShareWithThirdVendors')}
                </ListItem>
                <ListItem>
                  {t('privacyWeMayAlsoShareWithBusinessPartners')}
                </ListItem>
                <ListItem>
                  {t('privacyWeMayAlsoShareWithExtraThirdParties')}
                </ListItem>
                <ListItem>
                  {t('privacyWeMayAlsoShareWithThirdPartiesAtYourRequest')}
                </ListItem>
                <ListItem>
                  {t('privacyWeMayAlsoShareWithOtherConnectedParties')}
                </ListItem>
                <ListItem>{t('privacyWeMayAlsoShareWithAsRequired')}</ListItem>
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
            <Text>{t('privacySecurityOfInfoStorage')}</Text>
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
            <Text>{transformTextContent(t('privacyCaliforniaResidents'))}</Text>
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
