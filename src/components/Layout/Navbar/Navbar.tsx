import React, { Suspense, useEffect, useRef, useState } from 'react'
import {
  Box,
  Collapse,
  Flex,
  IconButton,
  useDisclosure,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Button,
  chakra,
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { languageData } from '@/data/LanguageData'
import dynamic from 'next/dynamic'
import { setDrawerOpen } from '@/store/slices/app-slice'
import Link from 'next/link'
import DesktopNav from './DesktopNav'
const WalletNavMenu = dynamic(() => import('./WalletNavMenu'))
import Logo from '@/components/Elements/Logo/Logo'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, store } from '@/store/store'
import useLanguageChange from '@/hooks/useLanguageChange'
import NavSearch from '@/components/Layout/Navbar/NavSearch'
import MobileNav from './MobileNav'
const WalletDrawer = dynamic(() => import('../WalletDrawer/WalletDrawer'))
import SuggestWikiModal from './SuggestWiki'
import Image from 'next/image'
import { useAddress } from '@/hooks/useAddress'
import useWhiteListValidator from '@/hooks/useWhiteListValidator'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const Navbar = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('common')
  const drawerOperations = useDisclosure({
    defaultIsOpen: store.getState().app.isDrawerOpen,
    onOpen: () => {
      dispatch(setDrawerOpen(true))
    },
    onClose: () => {
      dispatch(setDrawerOpen(false))
    },
  })
  const loginButtonRef = useRef<HTMLButtonElement>(null)
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false)
  const router = useRouter()
  const { isOpen, onToggle } = drawerOperations
  const lang = useSelector((state: RootState) => state.app.language)
  const { handleLangChange } = useLanguageChange()
  const locale = router.locale
  const { address } = useAddress()
  const { userCanEdit } = useWhiteListValidator(address)
  const {
    isOpen: isSuggestWikiOpen,
    onOpen: onSuggestWikiOpen,
    onClose: onSuggestWikiClose,
  } = useDisclosure()

  useEffect(() => {
    if (locale && lang !== locale) handleLangChange(locale)
  }, [router.locale])

  useEffect(() => {
    const handleRouteChange = () => isOpen && onToggle()
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events, isOpen, onToggle])

  return (
    <Box
      boxShadow="sm"
      position="fixed"
      zIndex="banner"
      w="full"
      h={{ base: drawerOperations.isOpen ? '100%' : 'unset', md: 'unset' }}
      bg="subMenuBg"
      borderBottomWidth={1}
      borderBottomColor="rankingListBorder"
    >
      <Flex
        gap={{ base: 8, lg: 40, xl: 8 }}
        h="70px"
        alignItems="center"
        justifyContent="space-between"
        px={{ base: 4, md: 8 }}
      >
        <Box
          cursor="pointer"
          mr={{ base: 0, xl: '0.1vw' }}
          _hover={{ textDecoration: 'none' }}
        >
          <Link prefetch={false} href="/">
            <HStack width="150px">
              <Logo />
              <Text
                fontWeight="bold"
                fontSize="xl"
                color="gray.900"
                _dark={{ color: 'white' }}
              >
                IQ.wiki
              </Text>
            </HStack>
          </Link>
        </Box>
        <HStack
          spacing={4}
          display={{
            base: 'none',
            xl: 'flex',
          }}
        >
          <DesktopNav />
        </HStack>
        <Suspense>
          <NavSearch setHamburger={setIsHamburgerOpen} />
        </Suspense>
        <HStack
          ml={2}
          spacing={3}
          display={{
            base: 'none',
            xl: 'flex',
          }}
        >
          <Menu placement={'bottom-end'}>
            <MenuButton
              as={Button}
              fontSize="sm"
              paddingX={0}
              bg="transparent"
              sx={{
                marginRight: 0,
                fontWeight: 600,
                fontSize: 'sm',
                color: 'linkColor',
                _active: {
                  bg: 'transparent',
                },
                _hover: {
                  bg: 'transparent',
                },
              }}
              rightIcon={<ChevronDownIcon color="linkColor" />}
              iconSpacing={1}
              defaultValue={locale}
            >
              <chakra.span textTransform={'uppercase'}>{locale}</chakra.span>
            </MenuButton>
            <MenuList color="linkColor">
              <MenuOptionGroup type="radio" onChange={handleLangChange}>
                {languageData.map(langObj => (
                  <MenuItemOption
                    key={langObj.locale}
                    fontSize="md"
                    value={langObj.locale}
                    isChecked={langObj.locale === lang}
                  >
                    <HStack>
                      <Image
                        src={langObj.icon}
                        alt={langObj.name}
                        width={24}
                        height={24}
                      />
                      <Text>{langObj.name}</Text>
                    </HStack>
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Button
            variant="outline"
            paddingInline={4}
            size={'sm'}
            borderRadius={'6px'}
            fontSize="14px"
            fontWeight={600}
            color="linkColor"
            onClick={userCanEdit && address ? () => {} : onSuggestWikiOpen}
            _hover={{
              textDecoration: 'none',
              bgColor: 'gray.200',
            }}
            whiteSpace="nowrap"
            borderColor={'gray.200'}
            _dark={{
              borderColor: 'whiteAlpha.300',
              _hover: {
                bgColor: 'whiteAlpha.300',
              },
            }}
          >
            {userCanEdit && address ? (
              <Link href="/create-wiki">{t('Create Wiki')}</Link>
            ) : (
              t('Suggest Wiki')
            )}
          </Button>
          <SuggestWikiModal
            isOpen={isSuggestWikiOpen}
            onClose={onSuggestWikiClose}
          />
          <WalletNavMenu
            drawerOperations={drawerOperations}
            setHamburger={setIsHamburgerOpen}
          />
        </HStack>
        <HStack
          display={{
            base: 'flex',
            xl: 'none',
          }}
        >
          <WalletNavMenu
            drawerOperations={drawerOperations}
            setHamburger={setIsHamburgerOpen}
          />
          <IconButton
            onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
            icon={
              isHamburgerOpen ? (
                <CloseIcon w={4} h={4} />
              ) : (
                <HamburgerIcon boxSize={{ base: 6, lg: 7 }} />
              )
            }
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </HStack>
      </Flex>
      {drawerOperations.isOpen && (
        <WalletDrawer
          finalFocusRef={loginButtonRef}
          setHamburger={setIsHamburgerOpen}
          toggleOperations={drawerOperations}
        />
      )}
      <Collapse
        in={isHamburgerOpen}
        animateOpacity
        style={{ margin: '0 -15px' }}
      >
        <MobileNav
          setHamburger={setIsHamburgerOpen}
          drawerOperations={drawerOperations}
        />
      </Collapse>
    </Box>
  )
}

export default Navbar
