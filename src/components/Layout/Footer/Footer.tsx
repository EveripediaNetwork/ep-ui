import React from 'react'
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
import Image from 'next/image'
import { MenuFooter, Newsletter } from '@/components/Layout/Footer'
import { RiGlobalLine } from 'react-icons/ri'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { languageData } from '@/data/LanguageData'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/store'
import { setLanguage } from '@/store/slices/app-slice'
import { useDispatch } from 'react-redux'
import useLanguageChange from '@/hooks/useLanguageChange'

const Footer = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const locale = router.locale
  const { t } = useTranslation('common')
  const spacing = useBreakpointValue({ base: 8, lg: 24 })
  const userSelectedLanguage = getCookie('NEXT_LOCALE') as string
  const langState = useSelector((state: RootState) => state.app.language)
  const lang = userSelectedLanguage ?? langState
  const { handleLangChange } = useLanguageChange()
  const thisYear = new Date().getFullYear()
  const newsletterOptions = {
    bg: '#fff',
    color: 'gray.800',
    _hover: { bg: '#fff', color: 'gray.800' },
  }

  React.useEffect(() => {
    if (locale) dispatch(setLanguage(lang))
  }, [locale, dispatch, lang])

  return (
    <Box bg="brandBackground" color="default" pos="relative">
      <Container
        as={Stack}
        maxW={{ base: '7xl', xl: '7xl', '2xl': '80%' }}
        py={5}
      >
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={spacing} py={10}>
          <GridItem mr={{ lg: 16, xl: 24 }}>
            <Newsletter
              buttonTitle={t('subscribeFooterBtn')}
              header={t('updatesFooterHeading')}
              body={t('updatesFooterText')}
              url="https://forms.gle/bmMce4r3JJckpSNJ7"
            />
          </GridItem>
          <GridItem mr={{ lg: 16, xl: 24 }}>
            <Newsletter
              buttonTitle={t('newsletterbuttonLabel')}
              header={t('newsletterSubscribeTitle')}
              body={t('newsletterSubscribeBody')}
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
                  <MenuButton fontSize="sm" textTransform={'uppercase'}>
                    {lang} <ChevronDownIcon />
                  </MenuButton>
                  <MenuList color="linkColor">
                    <MenuOptionGroup type="radio" onChange={handleLangChange}>
                      {languageData.map((langObj) => (
                        <MenuItemOption
                          key={langObj.locale}
                          fontSize="md"
                          value={langObj.locale}
                          isChecked={langObj.locale === lang}
                        >
                          <Flex gap="0.5rem">
                            <Image
                              src={langObj.icon}
                              alt={langObj.name}
                              width={24}
                              height={24}
                            />
                            {langObj.name}
                          </Flex>
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
