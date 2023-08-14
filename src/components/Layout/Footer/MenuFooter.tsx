import React from 'react'
import {
  Box,
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Logo, Link } from '@/components/Elements'
import { useTranslation } from 'react-i18next'
import SocialFooter from './SocialFooter'

const MenuFooter = () => {
  const { t } = useTranslation()
  return (
    <SimpleGrid
      columns={{ base: 1, lg: 12 }}
      py={10}
      spacing={12}
      display={{ base: 'initial', md: 'grid' }}
    >
      <GridItem mb={{ base: 6, md: 0 }} colSpan={{ base: 8, lg: 5 }}>
        <Stack align={{ base: 'center', lg: 'flex-start' }} spacing="1">
          <Logo />
          <Text fontSize="xl" fontWeight="bold">
            {`${t('everipedia')}`}
          </Text>
          <Text
            w="80%"
            align={{ base: 'center', lg: 'start' }}
            fontWeight="medium"
            px={{ base: 0, lg: 0 }}
            pb={{ base: '6', md: '0' }}
          >
            IQ.wiki&apos;s vision is to bring blockchain knowledge to the world
            and knowledge onto the blockchain. A part of{' '}
            <Link
              href="https://www.brainfund.com/"
              opacity="0.8"
              _hover={{ opacity: '1', textDecoration: 'underline' }}
              target="_blank"
            >
              Brainfund
            </Link>{' '}
            Group.
          </Text>
          <SocialFooter />
        </Stack>
      </GridItem>
      <GridItem colSpan={7}>
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
                href="https://iq.braindao.org/dashboard/stake"
              >
                {`${t('staking')}`}
              </Link>
              <Link
                textAlign={{ base: 'center', md: 'left' }}
                target="_blank"
                href="https://app.bondprotocol.finance/#/market/1/80"
              >
                {`${t('bonds')}`}
              </Link>
            </Stack>
          </GridItem>
          <GridItem colSpan={1}>
            <Stack align={{ base: 'center', md: 'flex-start' }}>
              <Heading size="sm">Company</Heading>
              <Link
                textAlign={{ base: 'center', md: 'left' }}
                prefetch={false}
                href="/about"
              >{`${t('aboutUs')}`}</Link>
              <Box as="span" display="flex" alignItems="center">
                <Link
                  textAlign={{ base: 'center', md: 'left' }}
                  prefetch={false}
                  href="/careers"
                >
                  {`${t('careers')}`}
                </Link>
                {/* {AllCareers.length !== 0 && (
                  <Tag
                    ml="2"
                    size="sm"
                    variant="solid"
                    bgColor="brandLinkColor"
                    fontSize="10px"
                  >
                    We&apos;re hiring
                  </Tag>
                )} */}
              </Box>
              {/* <Link
                textAlign={{ base: 'center', md: 'left' }}
                prefetch={false}
                href="/us-careers"
              >{`${t('usCareers')}`}</Link> */}
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
              <Link
                textAlign={{ base: 'center', md: 'left' }}
                target="_blank"
                href="https://iqgpt.com"
              >
                IQ GPT
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
                href="/faq"
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
                href="/guidelines"
              >{`${t('guideLines')}`}</Link>
              <Link
                textAlign={{ base: 'center', md: 'left' }}
                prefetch={false}
                href="/privacy"
              >{`${t('privacyPolicy')}`}</Link>
              <Link
                textAlign={{ base: 'center', md: 'left' }}
                prefetch={false}
                href="/terms"
              >{`${t('termsOfService')}`}</Link>
              <Link
                textAlign={{ base: 'center', md: 'left' }}
                prefetch={false}
                href="/CaPrivacyRights"
              >{`${t('privacyRights')}`}</Link>
            </Stack>
          </GridItem>
        </SimpleGrid>
      </GridItem>
    </SimpleGrid>
  )
}

export default MenuFooter
