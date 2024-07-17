import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Image,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { usePostHog } from 'posthog-js/react'
import { useEffect } from 'react'

/*
 * Adds an event listener for the install event for the PWA
 */
const PWAInstallPrompt = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const posthog = usePostHog()
  const promptLogoSrc = useColorModeValue(
    'prompt-logo-light.svg',
    'prompt-logo-dark.svg',
  )
  // const isBrowser = typeof window !== 'undefined'

  useEffect(() => {
    const isMobileScreen = Boolean(
      window.matchMedia('(max-width: 768px)').matches,
    )

    const isInstallCaptured = Boolean(
      window.localStorage.getItem('appInstalled'),
    )
    const hasShownInstallPrompt = Boolean(
      window.localStorage.getItem('showPrompt'),
    )

    const isApp = Boolean(
      window.matchMedia('(display-mode: standalone)').matches,
    )

    const handleInstallPrompt = (e: any) => {
      e.preventDefault()
    }

    if (isApp && !isInstallCaptured) {
      window.localStorage.setItem('appInstalled', 'true')
      posthog.capture('app_installed', {
        isPWAInstalled: true,
      })
    }

    if (isMobileScreen) {
      window.addEventListener('beforeinstallprompt', handleInstallPrompt)
    }

    if (isMobileScreen && !hasShownInstallPrompt && !isApp) {
      onOpen() // Open the modal
      window.localStorage.setItem('showPrompt', 'true')
    }

    return () => {
      if (isMobileScreen) {
        window.removeEventListener('beforeinstallprompt', handleInstallPrompt)
      }
    }
  }, [])

  return (
    <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent color={'btnBgColor'} rounded={'8px'}>
        <DrawerCloseButton color={'careersTextColor'} />
        <DrawerHeader pb={0}>
          <HStack justify={'flex-start'} align={'center'}>
            <Image
              src={`/images/svg-images/${promptLogoSrc}`}
              width={'56px'}
              height={'56px'}
              alt="prompt-logo"
              flexShrink={0}
            />
            <Text
              fontWeight={'bold'}
              fontSize={'sm'}
              color={'careersTextColor'}
            >
              Install IQ.wiki
            </Text>
          </HStack>
        </DrawerHeader>

        <DrawerBody>
          <Text color={'homeDescriptionColor'} fontSize={'xs'}>
            Add IQ.wiki to your home screen for easy access. Navigate to your
            toolbar and select "Add to Home Screen" or "Install App."
          </Text>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default PWAInstallPrompt
