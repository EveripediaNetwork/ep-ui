import React from 'react'
import { GridItem, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { Logo, Link } from '@/components/Elements'
import { useTranslation } from 'react-i18next'

const MenuFooter = () => {
  const { t } = useTranslation()
  return (
    <SimpleGrid columns={{ base: 1, lg: 12 }} py={10} spacing={12}>
      <GridItem colSpan={{ base: 8, lg: 4 }}>
        <Stack align={{ base: 'center', lg: 'flex-start' }} spacing="1">
          <Logo />
          <Text fontSize="xl" fontWeight="bold">
            {`${t('everipedia')}`}
          </Text>
          <Text
            align={{ base: 'center', lg: 'start' }}
            fontWeight="medium"
            px={{ base: 3, lg: 0 }}
          >
            {`${t('visionFooterText')}`}
          </Text>
        </Stack>
      </GridItem>
      <GridItem colSpan={8}>
        <SimpleGrid columns={{ base: 2, sm: 2, md: 4 }} spacing={12}>
          <GridItem colSpan={1}>
            <Stack align={{ base: 'center', md: 'flex-start' }}>
              <Heading size="sm">{`${t('iq')}`}</Heading>
              <Link target="_blank" href="https://learn.everipedia.org/iq/">
                {`${t('whatIQ')}`}
              </Link>
              <Stack direction="row" align="center" spacing={2}>
                <Link
                  target="_blank"
                  href="https://learn.everipedia.org/iq/iq/bridges"
                >
                  {`${t('bridges')}`}
                </Link>
              </Stack>
              <Link
                target="_blank"
                href="https://learn.everipedia.org/iq/iq/hiiq-staking-via-tokenpocket"
              >
                {`${t('staking')}`}
              </Link>
              <Link
                target="_blank"
                href="https://learn.everipedia.org/iq/iq/iq-bonds-guide-polygon"
              >
                {`${t('bonds')}`}
              </Link>
            </Stack>
          </GridItem>
          <GridItem colSpan={1}>
            <Stack align={{ base: 'center', md: 'flex-start' }}>
              <Heading size="sm">{`${t('Everipedia')}`}</Heading>
              <Link href="/static/about">{`${t('aboutUs')}`}</Link>
              <Link href="/static/careers">{`${t('careers')}`}</Link>
              <Link href="/">{`${t('brainies')}`}</Link>
            </Stack>
          </GridItem>
          <GridItem colSpan={1}>
            <Stack align={{ base: 'center', md: 'flex-start' }}>
              <Heading size="sm">{`${t('resources')}`}</Heading>
              <Link target="_blank" href="https://learn.everipedia.org/iq/">
                {`${t('help')}`}
              </Link>
              <Link target="_blank" href="https://everipedia.org/blog">
                {`${t('blog')}`}
              </Link>
              <Link href="/static/faq">{`${t('faq')}`}</Link>
            </Stack>
          </GridItem>
          <GridItem colSpan={1}>
            <Stack align={{ base: 'center', md: 'flex-start' }}>
              <Heading size="sm">{`${t('policies')}`}</Heading>
              <Link href="/static/guidelines">{`${t('guideLines')}`}</Link>
              <Link href="/static/privacy">{`${t('privacyPolicy')}`}</Link>
              <Link href="/static/terms">{`${t('termsOfService')}`}</Link>
            </Stack>
          </GridItem>
        </SimpleGrid>
      </GridItem>
    </SimpleGrid>
  )
}

export default MenuFooter
