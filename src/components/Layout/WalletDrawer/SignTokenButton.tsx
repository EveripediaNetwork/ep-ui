import { useWeb3Token } from '@/hooks/useWeb3Token'
import { logEvent } from '@/utils/googleAnalytics'
import { Button as ChakraButton, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'

interface ConnectorsProps {
  openWalletDrawer?: () => void
  handleRedirect?: () => void
}

export const SignTokenButton = ({
  openWalletDrawer,
  handleRedirect,
}: ConnectorsProps) => {
  const router = useRouter()
  const { isConnected } = useAccount()
  const { generateNewToken, fetchStoredToken, error, loading, token } =
    useWeb3Token()

  const handleWalletSign = async () => {
    const storedToken = await fetchStoredToken()
    if (storedToken) {
      if (openWalletDrawer) {
        openWalletDrawer()
      }
      if (handleRedirect) {
        handleRedirect()
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

  let message
  if (error) {
    message = 'Something went wrong. Please try again.'
  } else if (loading) {
    message =
      'You should get a signature request from your wallet. Approve it to continue.'
  } else {
    message = 'You are logged in 🚀'
  }

  return (
    <>
      {token && isConnected ? (
        <Text
          w="full"
          maxW="md"
          rounded="4px"
          bg="white"
          borderColor="gray.200"
          borderWidth="1px"
          px="14px"
          py="8px"
          textAlign="center"
          fontSize="16px"
          fontWeight="bold"
          color="gray.800"
          _dark={{ bg: 'gray.700', borderColor: 'gray.600', color: 'white' }}
        >
          {message}
        </Text>
      ) : (
        <ChakraButton
          disabled={!isConnected}
          variant="solid"
          colorScheme="brand"
          onClick={() => {
            handleWalletSign()
          }}
        >
          Sign Token
        </ChakraButton>
      )}
    </>
  )
}
