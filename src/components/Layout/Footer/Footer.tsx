import React, { useState } from 'react'
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
} from '@chakra-ui/react'

import {
  MenuFooter,
  Newsletter,
  SocialFooter,
} from '@/components/Layout/Footer'

import { RiGlobalLine } from 'react-icons/ri'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { languageData } from '@/data/LanguageData'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { i18n } = useTranslation()
  const spacing = useBreakpointValue({ base: 8, lg: 24 })
  const [lang, setLang] = useState<string | any>(languageData[0].value)
  const hanleLangChange = (userLang: any) => {
    setLang(userLang)
    i18n.changeLanguage(userLang)
  }
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
        <SimpleGrid fontSize="xs" columns={{ base: 1, lg: 2 }}>
          <Stack align={{ base: 'center', lg: 'flex-start' }} flex="1">
            <Text fontSize="sm" py={3}>
              © 2022 Everipedia. All rights reserved
            </Text>
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
                    <MenuOptionGroup type="radio" onChange={hanleLangChange}>
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
