import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Divider,
  GridItem,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
  Icon,
  MenuOptionGroup,
  MenuItemOption,
  MenuButton,
  Menu,
  HStack,
  MenuList,
  Flex,
} from '@chakra-ui/react'
import { isString } from '@chakra-ui/utils'
import { MenuFooter, Newsletter } from '@/components/Layout/Footer'
import { RiGlobalLine } from 'react-icons/ri'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { languageData } from '@/data/LanguageData'
import { useTranslation } from 'next-i18next'
import { logEvent } from '@/utils/googleAnalytics'
import Link from '@/components/Elements/LinkElements/Link'
import { useRouter } from 'next/router'

const Footer = () => {
  const router = useRouter()
  const { t, i18n } = useTranslation('common')
  const spacing = useBreakpointValue({ base: 8, lg: 24 })
  const [lang, setLang] = useState<string>(languageData[0].value)
  const thisYear = new Date().getFullYear()
  const newsletterOptions = {
    bg: '#fff',
    color: 'gray.800',
    _hover: { bg: '#fff', color: 'gray.800' },
  }

  const handleLangChange = (userLang: string | string[]) => {
    if (isString(userLang)) {
      setLang(userLang)
      i18n.changeLanguage(userLang)
      const { pathname, asPath, query } = router
      router.push({ pathname, query }, asPath, { locale: userLang })
      logEvent({
        action: 'CHANGE_PLATFORM_LANGUAGE',
        category: 'language',
        label: userLang,
        value: 1,
      })
    }
  }

  const storedLang =
    typeof window !== 'undefined' &&
    JSON.stringify(window.localStorage.storeLang)
  useEffect(() => {
    if (storedLang) setLang(storedLang)
  }, [storedLang])

  return (
    <Box bg="brandBackground" color="default" pos="relative" zIndex="2">
      <Container
        as={Stack}
        maxW={{ base: '7xl', xl: '7xl', '2xl': '80%' }}
        py={5}
      >
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={spacing} py={10}>
          <GridItem mr={{ lg: 24 }}>
            <Newsletter
              buttonTitle={t('subscribeFooterBtn')}
              header={t('updatesFooterHeading')}
              body={t('updatesFooterText')}
              url="https://forms.gle/bmMce4r3JJckpSNJ7"
            />
          </GridItem>
          <GridItem>
            <Newsletter
              buttonTitle={t('newsletter.buttonLabel')}
              header="Subscribe to our newsletter"
              body="Never miss any of the most popular and trending articles on IQ.wiki
        when you sign up to our email newsletter."
              url="https://www.getdrip.com/forms/505929689/submissions/new"
              {...newsletterOptions}
            />
          </GridItem>
        </SimpleGrid>
        <Divider orientation="horizontal" />
        <MenuFooter />
        <Divider orientation="horizontal" />
        <SimpleGrid fontSize="sm" columns={{ base: 1, lg: 2 }}>
          <Stack align={{ base: 'center', lg: 'flex-start' }} flex="1">
            <Flex
              alignItems="center"
              direction={{ base: 'column', md: 'initial' }}
            >
              <Text py={3} pr={2}>
                {' '}
                © {thisYear} {`${t('copyRight')}`}
                <Link target="_blank" href="https://braindao.org/">
                  <Text as="span" _hover={{ textDecoration: 'underline' }}>
                    BrainDAO
                  </Text>
                </Link>
                <Text as="span" px="1">
                  &{' '}
                </Text>
                <Link target="_blank" href="https://iq.braindao.org/">
                  <Text as="span" _hover={{ textDecoration: 'underline' }}>
                    IQ{' '}
                  </Text>
                </Link>
              </Text>
            </Flex>
          </Stack>
          <Stack mt={[4, 0]} align={{ base: 'center', lg: 'flex-end' }}>
            <HStack py={3}>
              <Icon
                cursor="pointer"
                fontSize={25}
                fontWeight={600}
                as={RiGlobalLine}
              />
              <Box>
                <Menu>
                  <MenuButton fontSize="sm">
                    {lang.toUpperCase()} <ChevronDownIcon />
                  </MenuButton>
                  <MenuList color="linkColor">
                    <MenuOptionGroup type="radio" onChange={handleLangChange}>
                      {languageData.map((langObj) => (
                        <MenuItemOption
                          key={langObj.id}
                          fontSize="md"
                          value={langObj.value}
                        >
                          {langObj.language}
                        </MenuItemOption>
                      ))}
                    </MenuOptionGroup>
                  </MenuList>
                </Menu>
              </Box>
            </HStack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Footer
