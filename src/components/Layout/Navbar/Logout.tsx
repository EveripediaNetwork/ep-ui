import { setStateToDefault } from '@/store/slices/user-slice'
import { cookieNames } from '@/types/cookies'
import { Flex, Icon, MenuItem } from '@chakra-ui/react'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { RiLogoutBoxRFill } from 'react-icons/ri'
import { useTranslation } from 'next-i18next'
import { useAddress } from '@/hooks/useAddress'

export const LogOutBtn = ({ isInMobileMenu }: { isInMobileMenu: boolean }) => {
  const { address: isUserConnected } = useAddress()
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation('common')

  const handleLogOut = () => {
    window.localStorage.removeItem('wagmi.metaMask.shimDisconnect')
    window.localStorage.removeItem('wagmi.connected')
    dispatch(setStateToDefault())
    deleteCookie(cookieNames.Enum['x-auth-token'])
    router.push(router.asPath)
  }

  return (
    <Flex>
      <MenuItem
        minH="48px"
        borderTopWidth={isInMobileMenu ? 0 : '1px'}
        px={isInMobileMenu ? 0 : 3}
        bgColor={!isInMobileMenu ? 'subMenuBg' : 'transparent'}
        sx={{ '&:hover, &:focus, &:active': { bgColor: 'subMenuHoverBg' } }}
        onClick={isUserConnected ? handleLogOut : undefined}
        cursor={isUserConnected ? 'pointer' : 'not-allowed'}
        display={isUserConnected ? 'flex' : 'none'}
      >
        <Icon
          fontSize="4xl"
          color="linkColor"
          fontWeight={600}
          as={RiLogoutBoxRFill}
          pr={3}
        />
        <Flex
          ml={isInMobileMenu ? 2 : 'unset'}
          fontSize="md"
          fontWeight="semibold"
          color="linkColor"
          flex="auto"
        >
          <span style={isInMobileMenu ? { fontSize: 18 } : {}}>
            {t('Logout')}
          </span>
        </Flex>
      </MenuItem>
    </Flex>
  )
}
