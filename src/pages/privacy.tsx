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
          {t('privacyPolicy')}
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
              {t('privacyCollectedAutomatically')}
            </Heading>
            <Text>{t('privacyAutomaticallyCollected')}</Text>
            <Heading as="h2" size="md">
              {t('privacySharingWithOthers')}
            </Heading>
            <Text>{t('privacySharingInfoWithThirdPartiesContent')}</Text>
            <Text>{t('privacyAlsoWith')}</Text>
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
              {t('privacyChoiceRegardingInfo')}
            </Heading>
            <Text>
              {transformTextContent(t('privacyConcerningYourChoice'))}
            </Text>
            <Heading as="h2" size="md">
              {t('privacySecurityInfo')}
            </Heading>
            <Text>{t('privacySecurityOfInfoStorage')}</Text>
            <Heading as="h2" size="md">
              {t('privacyChildren')}
            </Heading>
            <Text>{t('privacyAgeLimit')}</Text>
            <Divider />
            <Heading as="h2" size="md">
              {t('privacyCookies')}
            </Heading>
            <Text>{t('privacyBrowserCookie')}</Text>
            <Heading as="h3" size="sm">
              {t('privacyWeUseCookies')}
            </Heading>
            <Text>{t('privacyReasonForCookies')}</Text>
            <Table>
              <Thead>
                <Tr>
                  <Th>{t('privacyCookieCategory')}</Th>
                  <Th>{t('privacyWhyWeUseCookies')}</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{t('privacyNecessaryCookie')}</Td>
                  <Td>{t('privacyNecessaryCookieUse')}</Td>
                </Tr>
                <Tr>
                  <Td>{t('privacyNecessaryPreferences')}</Td>
                  <Td>{t('privacyNecessaryPreferencesUse')}</Td>
                </Tr>
                <Tr>
                  <Td>{t('privacyPerformance')}</Td>
                  <Td>{t('privacyPerformanceUse')}</Td>
                </Tr>
                <Tr>
                  <Td>{t('privacyNecessarymarketing')}</Td>
                  <Td>{t('privacyNecessarymarketingUse')}</Td>
                </Tr>
              </Tbody>
            </Table>
            <Heading as="h2" size="md">
              {t('privacyAnalytics')}
            </Heading>
            <Heading as="h3" size="sm">
              {t('privacyProvidedByOthers')}
            </Heading>
            {transformTextContent(t('privacyWhatWeMayDoWithCookies'))}
            <Heading as="h3" size="sm">
              {t('privacyProvidedByUs')}
            </Heading>
            <Text>{t('privacyProvidedByUsContent')}</Text>
            <Heading as="h3" size="sm">
              {t('privacyLinkToThirdParty')}
            </Heading>
            <Text>{t('privacyServicesContent')}</Text>
            <Divider />
            <Heading
              as="h2"
              size="md"
              id="california"
              style={{ scrollMarginTop: '100px' }}
            >
              {t('privacyCaliforniaResidentsAct')}
            </Heading>
            <Text>{transformTextContent(t('privacyCaliforniaResidents'))}</Text>
            <Heading as="h2" size="md">
              {t('privacyUpdate')}
            </Heading>
            <Text>{t('privacyUpdatePolicy')}</Text>
          </Flex>
          <Box>
            <RelatedTopics
              topics={[
                { name: t('termsOfService'), url: '/terms' },
                { name: t('guideLines'), url: '/guidelines' },
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
      ...(await serverSideTranslations(locale ?? 'en', ['policy', 'common'])),
    },
  }
}

export default Privacy
