import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Image,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { usePostHog } from 'posthog-js/react'
import { useEffect } from 'react'

/*
 * Adds an event listener for the install event for the PWA
 */
const PWAInstallPrompt = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const posthog = usePostHog()
  // const isBrowser = typeof window !== 'undefined'

  useEffect(() => {
    const isMobileScreen = Boolean(
      window.matchMedia('(max-width: 768px)').matches,
    )

    const isInstalled = Boolean(window.localStorage.getItem('appInstalled'))

    const isApp = Boolean(
      window.matchMedia('(display-mode: standalone)').matches,
    )

    const handleInstallPrompt = (e: any) => {
      e.preventDefault()
    }

    if (isApp && !isInstalled) {
      window.localStorage.setItem('appInstalled', 'true')
      alert('You just installed the app')
      posthog.capture('app_installed', {
        isPWAInstalled: true,
      })
    }

    if (isMobileScreen) {
      window.addEventListener('beforeinstallprompt', handleInstallPrompt)
    }

    if (isMobileScreen && !isInstalled) {
      const hasPrompted = window.localStorage.getItem('hasPromptedInstall')

      if (!hasPrompted) {
        onOpen() // Open the modal
        localStorage.setItem('hasPromptedInstall', 'true')
      }
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
          <VStack justify={'flex-start'} align={'start'}>
            <Image
              src="/images/svg-images/prompt-logo-dark.svg"
              width={'30px'}
              height={'30px'}
              alt="prompt-logo"
            />
            <Text
              fontWeight={'bold'}
              fontSize={'sm'}
              color={'careersTextColor'}
            >
              Install IQ.wiki
            </Text>
          </VStack>
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
