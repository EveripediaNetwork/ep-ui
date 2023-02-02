import React from 'react'
import { GridItem, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { Logo, Link } from '@/components/Elements'
import { useTranslation } from 'react-i18next'

const MenuFooter = () => {
  const { t } = useTranslation()
  return (
    <SimpleGrid
      columns={{ base: 1, lg: 12 }}
      py={10}
      spacing={12}
      display={{ base: 'initial', md: 'grid' }}
    >
      <GridItem colSpan={{ base: 8, lg: 4 }}>
        <Stack align={{ base: 'center', lg: 'flex-start' }} spacing="1">
          <Logo />
          <Text fontSize="xl" fontWeight="bold">
            {`${t('everipedia')}`}
          </Text>
          <Text
            w="100%"
            align={{ base: 'center', lg: 'start' }}
            fontWeight="medium"
            px={{ base: 0, lg: 0 }}
            pb={{ base: '6', md: '0' }}
          >
            {`${t('visionFooterText')}`}
          </Text>
        </Stack>
      </GridItem>
      <GridItem colSpan={8}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={12}>
          <GridItem colSpan={1}>
            <Stack align={{ base: 'center', md: 'flex-start' }}>
              <Heading size="sm">{`${t('iq')}`}</Heading>
              <Link
                textAlign={{ base: 'center', md: 'left' }}
                target="_blank"
                href="https://iq.wiki/wiki/iq"
              >
                {`${t('whatIQ')}`}
              </Link>
              <Stack direction="row" align="center" spacing={2}>
                <Link
                  textAlign={{ base: 'center', md: 'left' }}
                  target="_blank"
                  href="https://learn.everipedia.org/iq/iq/bridges"
                >
                  {`${t('bridges')}`}
                </Link>
              </Stack>
              <Link
                textAlign={{ base: 'center', md: 'left' }}
                target="_blank"
                href="https://learn.everipedia.org/iq/iq/locking-hiiq"
              >
                {`${t('staking')}`}
              </Link>
              <Link
                textAlign={{ base: 'center', md: 'left' }}
                target="_blank"
                href="https://learn.everipedia.org/iq/iq/iq-bonds-guide-ethereum"
              >
                {`${t('bonds')}`}
              </Link>
            </Stack>
          </GridItem>
          <GridItem colSpan={1}>
            <Stack align={{ base: 'center', md: 'flex-start' }}>
              <Heading size="sm">IQ.wiki</Heading>
              <Link
                textAlign={{ base: 'center', md: 'left' }}
                prefetch={false}
                href="/static/about"
              >{`${t('aboutUs')}`}</Link>
              <Link
                textAlign={{ base: 'center', md: 'left' }}
                prefetch={false}
                href="/static/careers"
              >{`${t('careers')}`}</Link>
              <Link
                textAlign={{ base: 'center', md: 'left' }}
                prefetch={false}
                href="/branding"
              >{`${t('Branding')}`}</Link>
              <Link
                textAlign={{ base: 'center', md: 'left' }}
                target="_blank"
                href="https://iq.braindao.org"
              >
                IQ Dashboard
              </Link>
            </Stack>
          </GridItem>
          <GridItem colSpan={1}>
            <Stack align={{ base: 'center', md: 'flex-start' }}>
              <Heading size="sm">{`${t('resources')}`}</Heading>
              <Link
                textAlign={{ base: 'center', md: 'left' }}
                target="_blank"
                href="https://learn.everipedia.org/iq/"
              >
                {`${t('help')}`}
              </Link>
              <Link
                textAlign={{ base: 'center', md: 'left' }}
                prefetch={false}
                href="/blog"
              >{`${t('blog')}`}</Link>
              <Link
                textAlign={{ base: 'center', md: 'left' }}
                prefetch={false}
                href="/static/faq"
              >{`${t('faq')}`}</Link>
              <Link
                textAlign={{ base: 'center', md: 'left' }}
                prefetch={false}
                href="/glossary"
              >{`${t('glossary')}`}</Link>
            </Stack>
          </GridItem>
          <GridItem colSpan={1}>
            <Stack align={{ base: 'center', md: 'flex-start' }}>
              <Heading size="sm">{`${t('policies')}`}</Heading>
              <Link
                textAlign={{ base: 'center', md: 'left' }}
                prefetch={false}
                href="/static/guidelines"
              >{`${t('guideLines')}`}</Link>
              <Link
                textAlign={{ base: 'center', md: 'left' }}
                prefetch={false}
                href="/static/privacy"
              >{`${t('privacyPolicy')}`}</Link>
              <Link
                textAlign={{ base: 'center', md: 'left' }}
                prefetch={false}
                href="/static/terms"
              >{`${t('termsOfService')}`}</Link>
              <Link
                textAlign={{ base: 'center', md: 'left' }}
                prefetch={false}
                href="/static/CaPrivacyRights"
              >{`${t('privacyRights')}`}</Link>
            </Stack>
          </GridItem>
        </SimpleGrid>
      </GridItem>
    </SimpleGrid>
  )
}

export default MenuFooter
