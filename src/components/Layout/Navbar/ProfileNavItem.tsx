import DisplayAvatar from '@/components/Elements/Avatar/Avatar'
import { NAV_ICON } from '@/data/NavItemData'
import { Box, Divider } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { useAccount } from 'wagmi'
import { ColorModeToggle } from './ColorModeToggle'
import NavMenu from './NavMenu'
import { ProfileLink } from './ProfileLink'
import { LogOutBtn } from './Logout'

interface ProfileNavMenuProps {
  setVisibleMenu: Dispatch<SetStateAction<number | null>>
  visibleMenu: number | null
}

const ProfileNavMenu = ({
  setVisibleMenu,
  visibleMenu,
}: ProfileNavMenuProps) => {
  const { isConnected, address } = useAccount()
  return (
    <Box onMouseLeave={() => setVisibleMenu(null)}>
      <NavMenu
        navItem={NAV_ICON}
        setVisibleMenu={setVisibleMenu}
        visibleMenu={visibleMenu}
        label={
          <DisplayAvatar
            key={address}
            address={isConnected ? address : undefined}
            size="25"
            alt={address}
          />
        }
      >
        <Divider />
        <ProfileLink />
        <ColorModeToggle isInMobileMenu={false} />
        <LogOutBtn isInMobileMenu={false} />
      </NavMenu>
    </Box>
  )
}

export default ProfileNavMenu
