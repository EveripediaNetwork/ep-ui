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

import {
  MenuFooter,
  Newsletter,
  SocialFooter,
} from '@/components/Layout/Footer'

import { RiGlobalLine } from 'react-icons/ri'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { languageData } from '@/data/LanguageData'
import { useTranslation } from 'react-i18next'
import { logEvent } from '@/utils/googleAnalytics'
import Link from 'next/link'

const Footer = () => {
  const { t, i18n } = useTranslation()
  const spacing = useBreakpointValue({ base: 8, lg: 24 })
  const [lang, setLang] = useState<string>(languageData[0].value)
  const thisYear = new Date().getFullYear()

  const handleLangChange = (userLang: string | string[]) => {
    if (isString(userLang)) {
      setLang(userLang)
      i18n.changeLanguage(userLang)
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
    <Box bg="brandBackground" color="default">
      <Container
        as={Stack}
        maxW={{ base: '7xl', xl: '7xl', '2xl': '80%' }}
        py={5}
      >
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={spacing} py={10}>
          <GridItem mr={{ lg: 24 }}>
            <Newsletter />
          </GridItem>
          <GridItem>
            <SocialFooter />
          </GridItem>
        </SimpleGrid>
        <Divider orientation="horizontal" />
        <MenuFooter />
        <Divider orientation="horizontal" />
        <SimpleGrid fontSize="sm" columns={{ base: 1, lg: 2 }}>
          <Stack align={{ base: 'center', lg: 'flex-start' }} flex="1">
            <Flex alignItems="center">
              <Text py={3} pr={2}>
                {' '}
                © {thisYear} {`${t('copyRight')}`}
              </Text>
              <Link target="_blank" href="https://braindao.org/">
                <Text _hover={{ textDecoration: 'underline' }}>BrainDAO</Text>
              </Link>
              <Text px="1">& </Text>
              <Link target="_blank" href="https://iq.braindao.org/">
                <Text _hover={{ textDecoration: 'underline' }}>IQ </Text>
              </Link>
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
                      {languageData.map(langObj => (
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
