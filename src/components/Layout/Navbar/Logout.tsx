import { setStateToDefault } from '@/store/slices/user-slice'
import { Button, Flex, Icon } from '@chakra-ui/react'
import React from 'react'
import { RiLogoutBoxRFill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { deleteCookie } from 'cookies-next'
import { cookieNames } from '@/types/cookies'
import { usePostHog } from 'posthog-js/react'
import { useAccount, useDisconnect } from 'wagmi'
import { magic } from '@/utils/WalletUtils/getMagicSDK'

export const LogOutBtn = ({ isInMobileMenu }: { isInMobileMenu: boolean }) => {
  const { isConnected: isUserConnected } = useAccount()
  const { disconnect, status } = useDisconnect()
  const dispatch = useDispatch()
  const { t } = useTranslation('common')
  const posthog = usePostHog()

  const isLogoutLoading = status === 'loading'

  const handleLogOut = async () => {
    try {
      if (magic && (await magic.user?.isLoggedIn())) {
        await magic.user.logout()
      } else {
        disconnect()
      }

      deleteCookie(cookieNames.Enum['x-auth-token'])
      for (const key of Object.keys(localStorage)) {
        if (key.startsWith('wagmi')) {
          localStorage.removeItem(key)
        }
      }
      dispatch(setStateToDefault())
      posthog.reset()
      window.location.reload()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Button
      minH={{ base: '35px', md: '48px' }}
      px={isInMobileMenu ? 0 : 3}
      bgColor="transparent"
      sx={{ '&:hover, &:focus, &:active': { bgColor: 'subMenuHoverBg' } }}
      onClick={() => {
        console.log('FIRED!!!')
        if (isUserConnected) {
          handleLogOut()
        }
      }}
      cursor={isUserConnected ? 'pointer' : 'not-allowed'}
      display={isUserConnected ? 'flex' : 'none'}
      w="full"
      isLoading={isLogoutLoading}
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
    </Button>
  )
}
