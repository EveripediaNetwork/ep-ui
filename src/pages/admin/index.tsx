import React, { useEffect } from 'react'
import { Heading, Text, Stack, Box, VStack } from '@chakra-ui/react'
import { WikiDataGraph } from '@/components/Admin/WikiDataGraph'
import { AllWikiDetailsCards } from '@/components/Admin/WikiDetailsCards'
import { WikiEditorsInsightTable } from '@/components/Admin/WikiEditorInsight/WikiEditorsInsight'
import { WikiInsightTable } from '@/components/Admin/WikiCreatedInsight/WikiInsightTable'
import { useWeb3Token } from '@/hooks/useWeb3Token'
import { authenticatedRoute } from '@/components/WrapperRoutes/AuthenticatedRoute'
import {
  UserProfileFetchOptions,
  useUserProfileData,
} from '@/services/profile/utils'
import { useAccount } from 'wagmi'
import { adminApiClient, checkIsAdmin } from '@/services/admin'
import dynamic from 'next/dynamic'
import { store } from '@/store/store'
import { useRouter } from 'next/router'
import { WikiRevalidateURL } from '@/components/Admin/WikiRevalidateURL'
import SignTokenMessage from '../settings/account/SignTokenMessage'

const Admin = () => {
  const router = useRouter()
  const { token, reSignToken, error } = useWeb3Token()
  const { address: userAddress } = useAccount()
  const [isAdmin, setIsAdmin] = React.useState(false)
  const { setAccount } = useUserProfileData(
    UserProfileFetchOptions.WITH_ALL_SETTINGS,
  )

  useEffect(() => {
    async function fetchAuth() {
      if (userAddress && token) {
        adminApiClient.setHeader('authorization', token)
        const { data } = await store.dispatch(checkIsAdmin?.initiate(undefined))
        if (!data) {
          router.push('/404')
        } else setIsAdmin(true)
        setAccount(userAddress)
      }
    }
    fetchAuth()
  }, [userAddress, setAccount, token, router])

  if (!token)
    return (
      <SignTokenMessage
        message="To make changes to the admin panel, authenticate your wallet to continue"
        reopenSigningDialog={reSignToken}
        error={error}
      />
    )

  if (!isAdmin) {
    return null
  }
  return (
    <Box py={4} w="90%" mx="auto">
      <Heading
        as="h4"
        mt="4"
        py="2"
        fontWeight="black"
        w="80%"
        fontSize={{ base: '29', md: '37' }}
        lineHeight="normal"
        letterSpacing="wider"
      >
        Admin Dashboard
      </Heading>

      <Text w="80%" fontSize="sm" fontWeight="light">
        Welcome to the admin dashboard
      </Text>

      <Stack spacing={8} py={7} direction={{ base: 'column', lg: 'row' }}>
        <AllWikiDetailsCards />
        <WikiRevalidateURL />
      </Stack>
      <WikiDataGraph />
      <VStack spacing={15} mb="3rem">
        <WikiInsightTable />
        <WikiEditorsInsightTable />
      </VStack>
    </Box>
  )
}

export default dynamic(() => Promise.resolve(authenticatedRoute(Admin)), {
  ssr: false,
})
