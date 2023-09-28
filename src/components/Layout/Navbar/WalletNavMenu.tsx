import { store } from '@/store/store'
import { logEvent } from '@/utils/googleAnalytics'
import { Icon, UseDisclosureReturn } from '@chakra-ui/react'
import React from 'react'
import { RiWalletLine } from 'react-icons/ri'

interface WalletNavMenuProps {
  setVisibleMenu: React.Dispatch<React.SetStateAction<number | null>>
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>
  drawerOperations: UseDisclosureReturn
}

const WalletNavMenu = ({
  setVisibleMenu,
  setHamburger,
  drawerOperations,
}: WalletNavMenuProps) => {
  const handleWalletIconAction = () => {
    logEvent({
      action: 'OPEN_DRAWER',
      value: 1,
      label: store.getState().user.address || '',
      category: 'open_drawer',
    })
    setHamburger(false)
    drawerOperations.onToggle()
  }

  return (
    <Icon
      display={{
        base: 'none',
        md: 'flex',
      }}
      color="linkColor"
      cursor="pointer"
      fontSize="3xl"
      onClick={handleWalletIconAction}
      fontWeight={600}
      as={RiWalletLine}
      onMouseEnter={() => setVisibleMenu(null)}
      _hover={{
        textDecoration: 'none',
        color: 'linkHoverColor',
      }}
    />
  )
}

export default WalletNavMenu
