import React from 'react'
import { SettingsIcon } from '@chakra-ui/icons'
import {
  Flex,
  chakra,
  IconButton,
  Box,
  ButtonGroup,
  Tooltip,
  TooltipProps,
  Skeleton,
} from '@chakra-ui/react'
import { FaShareAlt } from 'react-icons/fa'
import { useProfileContext } from '@/components/Profile/utils'
import { useRouter } from 'next/router'
import DisplayAvatar from '@/components/Elements/Avatar/Avatar'
import { LoadingProfile } from '@/components/Profile/LoadingProfile'
import { useENSData } from '@/hooks/useENSData'
import { NextSeo } from 'next-seo'
import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'
import shortenAccount from '@/utils/shortenAccount'
import { useUserProfileData } from '@/services/profile/utils'

export type UserDetailsProps = { hide?: boolean }

export const UserDetails = (props: UserDetailsProps) => {
  const { hide } = props
  const router = useRouter()
  const { data } = useAccount()
  const address = router.query.profile as string
  const { profileData } = useUserProfileData(address)

  const { headerIsSticky } = useProfileContext()
  const [, ensUserName, loading] = useENSData(address)
  const isSticky = headerIsSticky && hide

  const tooltipProps: Partial<TooltipProps> = {
    placement: 'top',
    hasArrow: true,
    rounded: 'md',
    fontWeight: 'semibold',
    fontSize: 'md',
    px: 3,
    py: 2,
  }
  const { t } = useTranslation()
  // TODO: change
  if (loading) return <LoadingProfile hide={hide} />
  return (
    <>
      <NextSeo
        title={`${ensUserName || address} Profile Page - Everipedia`}
        openGraph={{
          title: `${ensUserName || address} Profile Page - Everipedia`,
          description: `${ensUserName || address} profile page`,
        }}
      />
      <Flex align="center" justify="space-between" w="full" px="6" gap={3}>
        <chakra.span flex="1" />
        <Flex
          direction={isSticky ? 'row' : 'column'}
          align="center"
          gap="3"
          flex="1"
          justifyContent="center"
        >
          <Box mt={`${isSticky ? 0 : '-11'}`} zIndex="docked">
            <DisplayAvatar
              boxSize="32"
              overflow="hidden"
              borderWidth={2}
              borderColor="white"
              rounded="full"
              justifySelf="center"
              {...(isSticky && { mt: 0, boxSize: 12 })}
              address={address}
              wrapperProps={{
                zIndex: 'calc(var(--chakra-zIndices-sticky) - 1)',
              }}
              svgProps={{
                boxSize: isSticky ? '10' : '32',
                overflow: 'hidden',
                borderWidth: 2,
                borderColor: 'white',
                rounded: 'full',
                justifySelf: 'center',
              }}
            />
          </Box>

          <Skeleton isLoaded={!loading}>
            <chakra.span
              fontSize={isSticky ? 'md' : '3xl'}
              fontWeight="semibold"
              letterSpacing="tighter"
            >
              {profileData?.username || ensUserName || shortenAccount(address)}
            </chakra.span>
          </Skeleton>
        </Flex>
        <chakra.span display="flex" flex="1">
          <ButtonGroup
            isAttached
            variant="outline"
            ml="auto"
            my={isSticky ? 4 : 6}
          >
            <Tooltip label={t('shareBttnText')} {...tooltipProps}>
              <IconButton
                mr="-px"
                boxSize="12"
                aria-label="Share"
                icon={<FaShareAlt />}
                rounded="xl"
                _hover={{ shadow: 'xl' }}
                {...(isSticky && { boxSize: 6, rounded: '4' })}
              />
            </Tooltip>
            <Tooltip label={t('settingBttnText')} {...tooltipProps}>
              <IconButton
                cursor="pointer"
                boxSize="12"
                aria-label="Settings"
                icon={<SettingsIcon />}
                rounded="xl"
                _hover={{ shadow: 'xl' }}
                onClick={() => router.push('/account/settings')}
                disabled={address !== data?.address}
                {...(isSticky && { boxSize: 6, rounded: '4' })}
              />
            </Tooltip>
          </ButtonGroup>
        </chakra.span>
      </Flex>
    </>
  )
}
