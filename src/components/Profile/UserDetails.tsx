import React, { useEffect, useRef } from 'react'
import {
  Flex,
  chakra,
  IconButton,
  Box,
  ButtonGroup,
  Tooltip,
  TooltipProps,
  Skeleton,
  Text,
  VStack,
  useClipboard,
  useToast,
  HStack,
} from '@chakra-ui/react'
import { useProfileContext } from '@/components/Profile/utils'
import { useRouter } from 'next/router'
import DisplayAvatar from '@/components/Elements/Avatar/DisplayAvatar'
import { LoadingProfile } from '@/components/Profile/LoadingProfile'
import { useENSData } from '@/hooks/useENSData'
import { useTranslation } from 'react-i18next'
import { shortenAccount } from '@/utils/textUtils'
import {
  UserProfileFetchOptions,
  useUserProfileData,
} from '@/services/profile/utils'
import { RiSettings5Fill, RiShareFill } from 'react-icons/ri'
import { useAppSelector, useAppDispatch } from '@/store/hook'
import { store } from '@/store/store'
import { getLeaderboard } from '@/services/editor'
import { setAddressRank, setLeaderboards } from '@/store/slices/leaderboard'
import {
  getEditorRank,
  sortLeaderboards,
} from '@/utils/DataTransform/leaderboard.utils'
import { getUserAddressFromCache } from '@/utils/WalletUtils/getUserAddressFromCache'
import UserSocialLinks from './UserSocialLinks'
import RankIcon from '../Elements/EditorRank/EditorRank'

export type UserDetailsProps = { hide?: boolean }

export const UserDetails = ({ hide }: UserDetailsProps) => {
  const router = useRouter()
  const userAddress = getUserAddressFromCache()
  const address = router.query.profile as string
  const { profileData } = useUserProfileData(
    UserProfileFetchOptions.USER_PROFILE,
    address,
  )
  const { headerIsSticky } = useProfileContext()
  const [, ensUserName, loading] = useENSData(address)
  const isSticky = headerIsSticky && hide
  const customLink = `${process.env.NEXT_PUBLIC_DOMAIN}/account/${
    profileData?.username || address || ensUserName
  }`
  const clipboard = useClipboard(customLink || '')
  const toast = useToast()
  const { addressRank, leaderboard } = useAppSelector(
    state => state.leaderboard,
  )
  const dispatch = useAppDispatch()
  const isFetched = useRef(false)
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
  useEffect(() => {
    if (leaderboard.length < 1 && !isFetched.current) {
      const fetchLeaderboard = async () => {
        const result = await store.dispatch(getLeaderboard.initiate())
        if (result.data) {
          const sortedleaderboards = sortLeaderboards(result.data)
          dispatch(setLeaderboards(sortedleaderboards))
          isFetched.current = true
        }
      }
      fetchLeaderboard()
    } else {
      dispatch(setAddressRank(getEditorRank(address, leaderboard)))
    }
  }, [leaderboard, address, dispatch])

  if (loading) return <LoadingProfile hide={hide} />

  return (
    <>
      <Flex
        flexDir={{ base: isSticky ? 'row' : 'column', sm: 'row' }}
        align="center"
        justify="space-between"
        w="full"
        px={{ base: '0', sm: '6' }}
        gap={3}
      >
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
              alt={profileData?.username}
              size={isSticky ? 35 : 130}
              overflow="hidden"
              borderWidth={2}
              borderColor="white"
              rounded="full"
              justifySelf="center"
              {...(isSticky && { mt: 0, boxSize: 9 })}
              address={address}
              avatarIPFS={profileData?.avatar}
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
            <VStack>
              <HStack>
                <chakra.span
                  fontSize={isSticky ? 'lg' : '3xl'}
                  fontWeight="semibold"
                  letterSpacing="tighter"
                >
                  {profileData?.username ||
                    ensUserName ||
                    shortenAccount(address)}
                </chakra.span>
                {addressRank !== null && (
                  <chakra.span mb="18px !important">
                    <RankIcon size="22" rank={addressRank} />
                  </chakra.span>
                )}
              </HStack>
              {!isSticky && (
                <VStack spacing={4}>
                  {profileData && (
                    <Text maxW="min(400px, 80vw)" textAlign="center">
                      {profileData.bio}
                    </Text>
                  )}
                  <UserSocialLinks
                    links={profileData?.links[0]}
                    address={address || ''}
                  />
                </VStack>
              )}
            </VStack>
          </Skeleton>
        </Flex>
        <chakra.span display="flex" flex="1">
          <ButtonGroup isAttached variant="outline" ml="auto" my={4}>
            <Tooltip label={t('shareBttnText')} {...tooltipProps}>
              <IconButton
                mr="-px"
                boxSize="12"
                aria-label="Share"
                icon={<RiShareFill size={isSticky ? '15' : '20'} />}
                rounded="xl"
                _hover={{ shadow: 'xl' }}
                onClick={() => {
                  clipboard.onCopy()
                  toast({
                    title: 'Profile Link Copied to Clipboard!',
                    status: 'success',
                    duration: 1000,
                  })
                }}
                {...(isSticky && { boxSize: 8, rounded: '4' })}
              />
            </Tooltip>
            <Tooltip label={t('settingBttnText')} {...tooltipProps}>
              <IconButton
                cursor="pointer"
                boxSize="12"
                aria-label="Settings"
                icon={<RiSettings5Fill size={isSticky ? '15' : '20'} />}
                rounded="xl"
                _hover={{ shadow: 'xl' }}
                onClick={() => router.push('/account/settings')}
                disabled={address !== userAddress}
                {...(isSticky && { boxSize: 8, rounded: '4' })}
              />
            </Tooltip>
          </ButtonGroup>
        </chakra.span>
      </Flex>
    </>
  )
}
