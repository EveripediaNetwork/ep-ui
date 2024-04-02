import { setStateToDefault } from '@/store/slices/user-slice'
import { Button, Flex, Icon } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { RiLogoutBoxRFill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { useAddress } from '@/hooks/useAddress'
import { deleteCookie } from 'cookies-next'
import { cookieNames } from '@/types/cookies'
import { disconnect } from '@wagmi/core'
import { wagmiConfig } from '@/config/wagmi'
import { WagmiWrapper } from '../WagmiWrapper'

export const LogOutBtn = ({ isInMobileMenu }: { isInMobileMenu: boolean }) => {
  const { address: isUserConnected } = useAddress()
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation('common')

  const handleLogOut = async () => {
    dispatch(setStateToDefault())
    deleteCookie(cookieNames.Enum['x-auth-token'])
    await disconnect(wagmiConfig)
    router.push(router.asPath)
  }

  return (
    <WagmiWrapper>
      <Button
        minH={{ base: '35px', md: '48px' }}
        px={isInMobileMenu ? 0 : 3}
        bgColor="transparent"
        sx={{ '&:hover, &:focus, &:active': { bgColor: 'subMenuHoverBg' } }}
        onClick={isUserConnected ? handleLogOut : undefined}
        cursor={isUserConnected ? 'pointer' : 'not-allowed'}
        display={isUserConnected ? 'flex' : 'none'}
        w="full"
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
    </WagmiWrapper>
  )
}
