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
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const GuideLinesText = ({ text }: { text: string }) => {
  const parts = text.split(/(<bold.*?\/bold>)/)

  return (
    <Text
      fontSize={{ base: '14px', md: '16px' }}
      whiteSpace="pre-line"
      fontWeight={500}
    >
      {parts.map((part, index) =>
        part.startsWith('<bold') ? (
          <b>{part?.match(/>(.*?)</)?.[1]}</b>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        ),
      )}
    </Text>
  )
}

const Privacy = () => {
  const { t } = useTranslation('guidelines')

  return (
    <>
      <GuidelinesHeader />
      <Container
        w="min(90%, 1200px)"
        maxW={{ base: '7xl', xl: '6xl', '2xl': '80%' }}
        my={{ base: '10', lg: '16' }}
      >
        <Heading my={8} as="h1" size="3xl" letterSpacing="wide">
          {t('guidelinesTitle')}
        </Heading>
        <Flex gap={10} flexDirection={{ base: 'column', lg: 'row' }}>
          <Flex gap={5} flex="3" flexDirection="column">
            <Text>{t('guidelinesIntro')}</Text>
            <Heading as="h2" size="md">
              {t('guidelinesByIQ')}
            </Heading>
            <Text>
              <b>{t('guidelinesDo')}</b>
            </Text>
            <Text ml="6">
              <UnorderedList>
                <ListItem>
                  <GuideLinesText text={t('guidelines1')} />
                </ListItem>
                <ListItem>
                  <GuideLinesText text={t('guidelines2')} />
                </ListItem>
                <ListItem>
                  <GuideLinesText text={t('guidelines3')} />
                </ListItem>
              </UnorderedList>
            </Text>
            <Text>
              <b>{t('guidelinesDonts')}</b>
            </Text>
            <Text ml="6">
              <UnorderedList>
                <ListItem>
                  <GuideLinesText text={t('guidelines4')} />
                </ListItem>
                <ListItem>
                  <GuideLinesText text={t('guidelines5')} />
                </ListItem>
                <ListItem>
                  <GuideLinesText text={t('guidelines6')} />
                </ListItem>
                <ListItem>
                  <GuideLinesText text={t('guidelines7')} />
                </ListItem>
                <ListItem>
                  <GuideLinesText text={t('guidelines8')} />
                </ListItem>
                <ListItem>
                  <GuideLinesText text={t('guidelines9')} />
                </ListItem>
              </UnorderedList>
            </Text>

            <Heading as="h2" size="md">
              {t('guidelinesSocialMedia')}
            </Heading>
            <Text>{t('guidelinesSocialMediaIntro')}</Text>
            <Text ml="6">
              <UnorderedList>
                <ListItem>
                  <GuideLinesText text={t('guidelinesSocialMedia1')} />
                </ListItem>
                <ListItem>
                  <GuideLinesText text={t('guidelinesSocialMedia2')} />
                </ListItem>
                <ListItem>
                  <GuideLinesText text={t('guidelinesSocialMedia3')} />
                </ListItem>
              </UnorderedList>
            </Text>
            <Heading as="h2" size="md">
              {t('guidelinesOthers')}
            </Heading>
            <Text ml="6">
              <UnorderedList>
                <ListItem>
                  <GuideLinesText text={t('guidelinesOthers1')} />
                </ListItem>
                <ListItem>
                  <GuideLinesText text={t('guidelinesOthers2')} />
                </ListItem>
                <ListItem>
                  <GuideLinesText text={t('guidelinesOthers3')} />
                </ListItem>
                <ListItem>
                  <GuideLinesText text={t('guidelinesOthers4')} />
                </ListItem>
                <ListItem>
                  <GuideLinesText text={t('guidelinesOthers5')} />
                </ListItem>
                <ListItem>
                  <GuideLinesText text={t('guidelinesOthers6')} />
                </ListItem>
                <ListItem>
                  <GuideLinesText text={t('guidelinesOthers7')} />
                </ListItem>
              </UnorderedList>
            </Text>
            <Heading as="h2" size="md">
              {t('guidelinesConversationHeading')}
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
                { name: 'Terms of Service', url: '/terms' },
                { name: 'Privacy Policy', url: '/privacy' },
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
        'guidelines',
        'common',
      ])),
    },
  }
}

export default Privacy
