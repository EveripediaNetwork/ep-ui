import DisplayAvatar from '@/components/Elements/Avatar/DisplayAvatar'
import { NAV_ICON } from '@/data/NavItemData'
import { Box, Divider } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { getUserAddressFromCache } from '@/utils/getUserAddressFromCache'
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
  const userAddress = getUserAddressFromCache()
  return (
    <Box onMouseLeave={() => setVisibleMenu(null)}>
      <NavMenu
        navItem={NAV_ICON}
        setVisibleMenu={setVisibleMenu}
        visibleMenu={visibleMenu}
        label={
          <DisplayAvatar
            key={userAddress}
            address={userAddress}
            size="25"
            alt={userAddress}
          />
        }
      >
        <Divider />
        <ProfileLink />
        <ColorModeToggle isInMobileMenu={false} />
        {userAddress && <LogOutBtn isInMobileMenu={false} />}
      </NavMenu>
    </Box>
  )
}

export default ProfileNavMenu
