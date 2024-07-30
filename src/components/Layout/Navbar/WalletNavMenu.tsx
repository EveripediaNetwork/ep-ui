import DisplayAvatar from '@/components/Elements/Avatar/DisplayAvatar'
import { useAddress } from '@/hooks/useAddress'
import { Button } from '@chakra-ui/react'
import { usePostHog } from 'posthog-js/react'

const WalletNavMenu = () => {
  const { address: userAddress } = useAddress()
  const posthog = usePostHog()

  const handleWalletIconAction = () => {
    posthog.capture('open_wallet', { userAddress })
  }

  return (
    <Button
      variant="unstyled"
      color="linkColor"
      cursor="pointer"
      fontSize="3xl"
      onClick={handleWalletIconAction}
      fontWeight={600}
      _hover={{
        textDecoration: 'none',
        color: 'linkHoverColor',
      }}
      display={{
        base: 'none',
        md: 'block',
      }}
    >
      <DisplayAvatar
        key={userAddress}
        address={userAddress}
        size={30}
        alt={userAddress as string}
      />
    </Button>
  )
}

export default WalletNavMenu
