import Logo from '@/components/Elements/Logo/Logo'
import NavSearch from '@/components/Layout/Navbar/NavSearch'
import { languageData } from '@/data/LanguageData'
import { useAddress } from '@/hooks/useAddress'
import useLanguageChange from '@/hooks/useLanguageChange'
import useWhiteListValidator from '@/hooks/useWhiteListValidator'
import { setDrawerOpen } from '@/store/slices/app-slice'
import { RootState, store } from '@/store/store'
import {
  Button,
  chakra,
  Collapse,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { AlignJustify, ChevronDownIcon, X } from 'lucide-react'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'
import SuggestWikiModal from './SuggestWiki'
const WalletNavMenu = dynamic(() => import('./WalletNavMenu'))
const WalletDrawer = dynamic(() => import('../WalletDrawer/WalletDrawer'))

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
  const { userCanEdit } = useWhiteListValidator()
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
    <div
      className="shadow-sm fixed top-0 left-0 right-0 z-40 w-full bg-white dark:bg-gray800 border-b dark:border-alpha-200 border-gray-200 h-full"
      style={{
        height: drawerOperations.isOpen ? '100%' : 'unset',
      }}
    >
      <div className="flex gap-8 lg:gap-40 xl:gap-8 h-16 items-center justify-between px-4 lg:px-8">
        <Link prefetch={false} href="/">
          <div className="flex flex-row gap-2 items-center">
            <Logo />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              IQ.wiki
            </h1>
          </div>
        </Link>
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
              rightIcon={<ChevronDownIcon className="text-alpha-700 w-5 h-5" />}
              iconSpacing={1}
              defaultValue={locale}
            >
              <chakra.span textTransform={'uppercase'}>{locale}</chakra.span>
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
          {/* <WalletNavMenu
            drawerOperations={drawerOperations}
            setHamburger={setIsHamburgerOpen}
          /> */}
          <IconButton
            onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
            icon={
              isHamburgerOpen ? (
                <X className="w-6 lg:w-7 h-6 lg:h-7" />
              ) : (
                <AlignJustify className="w-6 lg:w-7 h-6 lg:h-7" />
              )
            }
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </HStack>
      </div>
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
    </div>
  )
}

export default Navbar
