import DisplayAvatar from '@/components/Elements/Avatar/DisplayAvatar'
import { useAddress } from '@/hooks/useAddress'
import { usePostHog } from 'posthog-js/react'

const WalletNavMenu = () => {
  const { address: userAddress } = useAddress()
  const posthog = usePostHog()

  const handleWalletIconAction = () => {
    posthog.capture('open_wallet', { userAddress })
  }

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleWalletIconAction()
        }
      }}
      role="button"
      className="hidden md:block cursor-pointer text-3xl font-semibold"
      onClick={handleWalletIconAction}
    >
      <DisplayAvatar
        key={userAddress}
        address={userAddress}
        size={30}
        alt={userAddress as string}
      />
    </div>
  )
}

export default WalletNavMenu
