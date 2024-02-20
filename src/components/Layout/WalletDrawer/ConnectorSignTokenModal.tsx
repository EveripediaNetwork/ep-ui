import { useWeb3Token } from '@/hooks/useWeb3Token'
import { logEvent } from '@/utils/googleAnalytics'
import {
  Box,
  CloseButton,
  Flex,
  Heading,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  Button as ChakraButton,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiWallet3Line,
} from 'react-icons/ri'

export const ConnectorSignTokenModal = ({
  isOpen,
  onClose,
  openWalletDrawer,
  handleRedirect,
}: {
  isOpen: boolean
  onClose: () => void
  openWalletDrawer?: () => void
  handleRedirect: () => void
}) => {
  const router = useRouter()
  const { generateNewToken, fetchStoredToken } = useWeb3Token()

  const handleWalletSign = async () => {
    const storedToken = await fetchStoredToken()
    if (storedToken) {
      handleRedirect()
      if (openWalletDrawer) {
        openWalletDrawer()
      }
      return
    }

    const token = await generateNewToken()
    window.postMessage({ type: 'iqwiki-token-pass', token }, '*')
    logEvent({
      action: 'SIGN_ATTEMPT',
      label: 'SIGN_TOKEN',
      value: 1,
      category: 'login',
    })
    router.push(router.asPath).then(openWalletDrawer)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ md: 'md', base: 'xs' }}>
      <ModalOverlay />
      <ModalContent p={{ md: 3, base: 2 }}>
        <Flex justifyContent="space-between">
          <Flex pl={{ md: '3', base: 2 }} py="3" gap="2" alignItems="center">
            <Flex
              w={8}
              h={8}
              justifyContent="center"
              alignItems="center"
              rounded="full"
              bgColor="blackAlpha.200"
              _dark={{ bgColor: '#4A5568' }}
            >
              <Icon
                width={6}
                height={6}
                as={RiErrorWarningFill}
                color="gray.800"
                _dark={{ color: '#ffffffea' }}
              />
            </Flex>
            <Heading
              color="gray.800"
              _dark={{ color: '#ffffffea' }}
              fontSize={{ md: 'xl', base: 'lg' }}
            >
              Sign Token
            </Heading>
          </Flex>
          <CloseButton onClick={onClose} />
        </Flex>
        <Box mt={{ md: '4', base: 2.5 }}>
          <Flex
            mx="auto"
            rounded="full"
            w={{ md: '120px', base: '90px' }}
            h={{ md: '120px', base: '90px' }}
            justifyContent="center"
            alignItems="center"
            bgColor="aboutIqgptInfoBg"
            pos="relative"
          >
            <Icon
              as={RiWallet3Line}
              w={{ md: '16', base: '12' }}
              h={{ md: '16', base: '12' }}
              color="brandAssetDownloadBttnColor"
            />
            <Icon
              as={RiCheckboxCircleFill}
              w={{ md: '6', base: 5 }}
              h={{ md: '6', base: 5 }}
              pos="absolute"
              right={{ md: '20px', base: '15px' }}
              bottom={{ md: '25px', base: '15px' }}
              color="brandAssetDownloadBttnColor"
            />
          </Flex>
          <Text
            mt="3"
            textAlign="center"
            maxW="90%"
            mx="auto"
            fontSize={{ md: 'md', base: 'sm' }}
          >
            To login to IQ.wiki, you need to sign a token that will authenticate
            your account for access.
          </Text>
          <Flex justifyContent="center" mt="3" pb="5">
            <ChakraButton
              variant="solid"
              colorScheme="brand"
              onClick={() => {
                handleWalletSign()
                onClose()
              }}
            >
              Sign Token
            </ChakraButton>
          </Flex>
        </Box>
      </ModalContent>
    </Modal>
  )
}
