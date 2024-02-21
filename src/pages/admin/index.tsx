import React, { useEffect } from 'react'
import { Heading, Text, Box, VStack, Flex, SimpleGrid } from '@chakra-ui/react'
import { WikiDataGraph } from '@/components/Admin/WikiDataGraph'
import { AllWikiDetailsCards } from '@/components/Admin/WikiDetailsCards'
import { WikiEditorsInsightTable } from '@/components/Admin/WikiEditorInsight/WikiEditorsInsight'
import { WikiInsightTable } from '@/components/Admin/WikiCreatedInsight/WikiInsightTable'
import {
  UserProfileFetchOptions,
  useUserProfileData,
} from '@/services/profile/utils'
import { adminApiClient, checkIsAdmin } from '@/services/admin'
import dynamic from 'next/dynamic'
import { RootState, store } from '@/store/store'
import { useRouter } from 'next/router'
import { WikiRevalidateURL } from '@/components/Admin/WikiRevalidateURL'
import { WikiViewsData } from '@/components/Admin/WikiViewsData'
import { authenticatedRoute } from '@/components/WrapperRoutes/AuthenticatedRoute'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import { useAddress } from '@/hooks/useAddress'
import { useSelector } from 'react-redux'

const Admin = () => {
  const router = useRouter()
  const token = useSelector((state: RootState) => state.user.token)
  const { address: userAddress } = useAddress()
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

  if (!isAdmin) {
    return null
  }
  return (
    <Box py={4} w="90%" mx="auto">
      <Flex direction={{ base: 'column', lg: 'row' }}>
        <Box w={{ base: '100%', md: '70%' }}>
          <Heading
            as="h4"
            mt="4"
            py="2"
            fontWeight="black"
            fontSize={{ base: '29', md: '37' }}
            lineHeight="normal"
            letterSpacing="wider"
          >
            Admin Dashboard
          </Heading>
          <Text fontSize="sm" fontWeight="light">
            Welcome to the admin dashboard
          </Text>
        </Box>
        <Box alignSelf={{ lg: 'flex-end' }} pt={{ base: '10', lg: '0' }}>
          <WikiRevalidateURL />
        </Box>
      </Flex>
      <SimpleGrid
        spacing={{ base: '4', lg: '0' }}
        py={7}
        w="full"
        columns={{ base: 1, md: 2, lg: 4 }}
      >
        <AllWikiDetailsCards />
      </SimpleGrid>
      <WikiViewsData />
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  }
}
