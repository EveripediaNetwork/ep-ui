import { logEvent } from '@/utils/googleAnalytics'
import { Button, UseDisclosureReturn } from '@chakra-ui/react'
import React from 'react'
import { getUserAddressFromCache } from '@/utils/WalletUtils/getUserAddressFromCache'
import DisplayAvatar from '@/components/Elements/Avatar/DisplayAvatar'

export interface WalletNavMenuProps {
  // setVisibleMenu: React.Dispatch<React.SetStateAction<number | null>>
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>
  drawerOperations: UseDisclosureReturn
}

const WalletNavMenu = ({
  // setVisibleMenu,
  setHamburger,
  drawerOperations,
}: WalletNavMenuProps) => {
  const userAddress = getUserAddressFromCache()
  const handleWalletIconAction = () => {
    logEvent({
      action: 'OPEN_DRAWER',
      value: 1,
      label: userAddress || '',
      category: 'open_drawer',
    })
    setHamburger(false)
    drawerOperations.onToggle()
  }

  return !userAddress ? (
    <Button
      size="sm"
      fontSize="14px"
      fontWeight={600}
      onClick={handleWalletIconAction}
    >
      Sign In
    </Button>
  ) : (
    <Button
      variant="unstyled"
      color="linkColor"
      cursor="pointer"
      fontSize="3xl"
      onClick={handleWalletIconAction}
      fontWeight={600}
      // onMouseEnter={() => setVisibleMenu(null)}
      _hover={{
        textDecoration: 'none',
        color: 'linkHoverColor',
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
