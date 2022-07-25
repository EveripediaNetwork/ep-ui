import DisplayAvatar from '@/components/Elements/Avatar/Avatar'
import { NAV_ICON } from '@/data/NavItemData'
import { Box } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { ColorModeToggle } from './ColorModeToggle'
import NavMenu from './NavMenu'
import { ProfileLink } from './ProfileLink'
import { LogOutBtn } from './Logout'

interface ProfileNavMenuProps {
  setVisibleMenu: Dispatch<SetStateAction<number | null>>
  visibleMenu: number | null
  address?: string
}

const ProfileNavMenu = ({
  setVisibleMenu,
  visibleMenu,
  address,
}: ProfileNavMenuProps) => (
  <Box onMouseLeave={() => setVisibleMenu(null)}>
    <NavMenu
      navItem={NAV_ICON}
      setVisibleMenu={setVisibleMenu}
      visibleMenu={visibleMenu}
      label={<DisplayAvatar address={address} size="25" />}
    >
      <ProfileLink />
      <ColorModeToggle isInMobileMenu={false} />
      <LogOutBtn isInMobileMenu={false} />
    </NavMenu>
  </Box>
)

export default ProfileNavMenu
