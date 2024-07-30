import Logo from '@/components/Elements/Logo/Logo'
import NavSearch from '@/components/Layout/Navbar/NavSearch'
import { languageData } from '@/data/LanguageData'
import { useAddress } from '@/hooks/useAddress'
import useLanguageChange from '@/hooks/useLanguageChange'
import useWhiteListValidator from '@/hooks/useWhiteListValidator'
import { setDrawerOpen } from '@/store/slices/app-slice'
import { RootState, store } from '@/store/store'
import { Collapse, IconButton, useDisclosure } from '@chakra-ui/react'
import { AlignJustify, X } from 'lucide-react'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DesktopNav from './DesktopNav'
import { LocaleSelect } from './LocaleSelect'
import MobileNav from './MobileNav'
import SuggestWikiModal from './SuggestWiki'
import { Button } from '@/components/ui/button'
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
  // const loginButtonRef = useRef<HTMLButtonElement>(null)
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
      className="shadow-sm fixed top-0 left-0 right-0 z-40 w-full bg-white dark:bg-gray800 border-b dark:border-alpha-200 border-gray-200"
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
        <DesktopNav />
        <Suspense>
          <NavSearch setHamburger={setIsHamburgerOpen} />
        </Suspense>
        <div className="hidden lg:flex flex-row gap-2 items-center">
          <LocaleSelect
            languageData={languageData}
            locale={locale}
            handleLangChange={handleLangChange}
          />
          <Button
            variant="outline"
            className="hover:no-underline hover:bg-gray-200 bg-white dark:bg-gray800"
            onClick={userCanEdit && address ? () => {} : onSuggestWikiOpen}
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
          {address ? (
            <WalletDrawer />
          ) : (
            <Button
              size="sm"
              className="hidden md:block bg-brand-500 dark:bg-brand-800 text-white hover:bg-brand-600 dark:hover:bg-brand-700 font-semibold text-sm px-6"
              onClick={() => router.push('/login')}
            >
              {t('signIn')}
            </Button>
          )}
        </div>
        <div className="lg:hidden flex flex-row gap-2 items-center">
          <WalletDrawer />
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
        </div>
      </div>
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
