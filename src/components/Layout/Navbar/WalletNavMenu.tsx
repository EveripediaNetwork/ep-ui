import DisplayAvatar from '@/components/Elements/Avatar/DisplayAvatar'
import { useAddress } from '@/hooks/useAddress'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { usePostHog } from 'posthog-js/react'

const WalletNavMenu = () => {
  const { address: userAddress } = useAddress()
  const posthog = usePostHog()
  const { t } = useTranslation('common')

  const handleWalletIconAction = () => {
    posthog.capture('open_wallet', { userAddress })
  }

  return (
    <>
      {userAddress ? (
        <div
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleWalletIconAction()
            }
          }}
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
      ) : (
        <Link
          href="/login"
          className="hidden md:block bg-brand-500 dark:bg-brand-800 text-white hover:bg-brand-600 dark:hover:bg-brand-700 font-semibold text-sm px-6 py-2 rounded-md"
        >
          {t('signIn')}
        </Link>
      )}
    </>
  )
}

export default WalletNavMenu
