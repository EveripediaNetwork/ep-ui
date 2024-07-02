import { Button, UseDisclosureReturn } from '@chakra-ui/react'
import React from 'react'
import DisplayAvatar from '@/components/Elements/Avatar/DisplayAvatar'
import { useRouter } from 'next/router'
import { useAddress } from '@/hooks/useAddress'
import { useTranslation } from 'next-i18next'
import { usePostHog } from 'posthog-js/react'

export interface WalletNavMenuProps {
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>
  drawerOperations: UseDisclosureReturn
}

const WalletNavMenu = ({
  setHamburger,
  drawerOperations,
}: WalletNavMenuProps) => {
  const { address: userAddress } = useAddress()
  const { t } = useTranslation('common')
  const router = useRouter()
  const posthog = usePostHog()

  const handleWalletIconAction = () => {
    posthog.capture('open_wallet', { userAddress })
    setHamburger(false)
    drawerOperations.onToggle()
  }
  if (!userAddress) {
    return (
      <Button
        size="sm"
        fontSize="14px"
        fontWeight={600}
        display={{
          base: 'none',
          md: 'block',
        }}
        onClick={() => router.push('/login')}
      >
        {t('signIn')}
      </Button>
    )
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
        alt={userAddress}
      />
    </Button>
  )
}

export default WalletNavMenu
