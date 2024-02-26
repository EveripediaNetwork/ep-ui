import { logEvent } from '@/utils/googleAnalytics'
import { Button, UseDisclosureReturn } from '@chakra-ui/react'
import React from 'react'
import DisplayAvatar from '@/components/Elements/Avatar/DisplayAvatar'
import { useRouter } from 'next/router'
import { useAddress } from '@/hooks/useAddress'

export interface WalletNavMenuProps {
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>
  drawerOperations: UseDisclosureReturn
}

const WalletNavMenu = ({
  setHamburger,
  drawerOperations,
}: WalletNavMenuProps) => {
  const { address: userAddress } = useAddress()
  const router = useRouter()
  const handleWalletIconAction = () => {
    logEvent({
      action: 'OPEN_WALLET',
      value: 1,
      label: userAddress || '',
      category: 'open_drawer',
    })
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
        Sign In
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
