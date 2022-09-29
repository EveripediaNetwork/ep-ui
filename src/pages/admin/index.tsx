import React, { useEffect, useMemo, useState } from 'react'
import {
  Heading,
  Text,
  Stack,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react'

import { RiNewspaperFill, RiEditFill, RiUser3Fill } from 'react-icons/ri'
import { WikiDataGraph } from '@/components/Admin/WikiDataGraph'
import { WikiDetailsCards } from '@/components/Admin/WikiDetailsCards'
import { WikiEditorsInsightTable } from '@/components/Admin/WikiEditorInsight/WikiEditorsInsight'
import { WikiInsightTable } from '@/components/Admin/WikiCreatedInsight/WikiInsightTable'
import { useWeb3Token } from '@/hooks/useWeb3Token'
import { authenticatedRoute } from '@/components/WrapperRoutes/AuthenticatedRoute'
import { useUserProfileData } from '@/services/profile/utils'
import { useAccount } from 'wagmi'
import {
  useGetWikisCreatedCountQuery,
  useGetWikisEditedCountQuery,
  useGetEditorsCountQuery,
  adminApiClient,
  checkIsAdmin,
  useRevalidateURLMutation,
} from '@/services/admin'
import dynamic from 'next/dynamic'
import { store } from '@/store/store'
import { useRouter } from 'next/router'
import SignTokenMessage from '../account/SignTokenMessage'

const Admin = () => {
  const router = useRouter()
  const { token, reSignToken, error } = useWeb3Token()
  const { address: userAddress } = useAccount()
  const [isAdmin, setIsAdmin] = React.useState(false)
  const [revalidateActive, setRevalidateActive] = React.useState<boolean>(true)
  const [revalidateURLText, setRevalidateURLText] = React.useState<string>('')
  const { setAccount } = useUserProfileData('', {
    withAllSettings: true,
  })

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
  }, [userAddress, setAccount, token])

  const endDate = useMemo(() => Math.floor(new Date().getTime() / 1000), [])

  const [graphFilter, setGraphFilter] = useState<string>('day')

  const { data: totalWikisCreatedCountData } = useGetWikisCreatedCountQuery({
    startDate: 0,
    endDate,
    interval: 'year',
  })

  const { data: weeklyWikiCreatedCountData } = useGetWikisCreatedCountQuery({
    startDate: 0,
    interval: 'week',
  })

  const { data: totalWikisEditedCountData } = useGetWikisEditedCountQuery({
    startDate: 0,
    endDate,
    interval: 'year',
  })

  const { data: weeklyWikiEditedCountData } = useGetWikisEditedCountQuery({
    startDate: 0,
    interval: 'week',
  })

  const { data: totalEditorsCountData } = useGetEditorsCountQuery({
    startDate: 0,
    endDate,
    interval: 'year',
  })

  const { data: weeklyEditorsCountData } = useGetEditorsCountQuery({})

  const { data: GraphWikisCreatedCountData } = useGetWikisCreatedCountQuery({
    interval: graphFilter,
    startDate: 0,
  })

  const { data: GraphWikisEditedCountData } = useGetWikisEditedCountQuery({
    interval: graphFilter,
    startDate: 0,
  })

  const { data: DayTunedgraphWikisCreatedCountData } =
    useGetWikisCreatedCountQuery({
      interval: graphFilter,
    })

  const { data: DayTunedgraphWikisEditedCountData } =
    useGetWikisEditedCountQuery({
      interval: graphFilter,
    })

  const dataObj: Array<{
    name: string | undefined
    'Wikis Created': number | undefined
    'Wikis Edited': number
  }> = []
  if (graphFilter === 'day') {
    DayTunedgraphWikisEditedCountData?.map((item, index) => {
      const editedCount = DayTunedgraphWikisEditedCountData[index].amount
      const createdCount =
        DayTunedgraphWikisCreatedCountData &&
        DayTunedgraphWikisCreatedCountData[index]?.amount
      const createCountStart =
        DayTunedgraphWikisCreatedCountData &&
        DayTunedgraphWikisCreatedCountData[index]?.startOn

      dataObj.push({
        name:
          // eslint-disable-next-line
          graphFilter !== 'day'
            ? graphFilter === 'year'
              ? createCountStart?.split('-')[0]
              : createCountStart?.split('T')[0].split('-').slice(0, 2).join('-')
            : `${new Date(item.endOn).toDateString().split(' ')[0]} `,
        'Wikis Created': createdCount,
        'Wikis Edited': editedCount,
      })
      return null
    })
  } else {
    GraphWikisEditedCountData?.map((item, index) => {
      const editedCount = GraphWikisEditedCountData[index].amount
      const createdCount =
        GraphWikisCreatedCountData && GraphWikisCreatedCountData[index]?.amount
      const createCountStart =
        GraphWikisCreatedCountData && GraphWikisCreatedCountData[index]?.startOn

      const getXaxis = () => {
        if (graphFilter === 'week') {
          return `Week ${index + 1}`
        }
        if (graphFilter === 'year') {
          return createCountStart?.split('-')[0]
        }
        if (graphFilter === 'month') {
          return `${new Date(item.endOn).toDateString().split(' ')[1]} `
        }
        if (graphFilter === 'day') {
          return `${new Date(item.endOn).toDateString().split(' ')[0]}`
        }
        return ''
      }
      dataObj.push({
        name: getXaxis(),
        'Wikis Created': createdCount,
        'Wikis Edited': editedCount,
      })
      return null
    })
  }

  const [revalidateURL] = useRevalidateURLMutation()
  const toast = useToast()
  const revalidateURLFunc = async () => {
    const data = await revalidateURL(revalidateURLText)
    if (Object.keys(data)[0] === 'error') {
      toast({
        title: 'Failed Revalidation',
        description: 'Check URL and try again',
        status: 'error',
        duration: 2000,
      })
    } else {
      toast({
        title: 'Revalidation Successful',
        description: `You have Successfully revalidated: ${revalidateURLText}`,
        status: 'success',
        duration: 4000,
      })
    }
  }
  const wikiMetaData = [
    {
      icon: RiNewspaperFill,
      value: totalWikisEditedCountData
        ? totalWikisEditedCountData[0]?.amount
        : 0,
      weeklyValue: weeklyWikiEditedCountData
        ? weeklyWikiEditedCountData[weeklyWikiEditedCountData.length - 1]
            ?.amount
        : 0,
      color: 'pink.400',
      detailHeader: 'Total no of Edited Wikis',
    },
    {
      icon: RiEditFill,
      value: totalWikisCreatedCountData
        ? totalWikisCreatedCountData[0]?.amount
        : 0,
      weeklyValue: weeklyWikiCreatedCountData
        ? weeklyWikiCreatedCountData[weeklyWikiCreatedCountData.length - 1]
            ?.amount
        : 0,
      color: 'pink.400',
      detailHeader: 'Total no of Created Wikis',
    },
    {
      icon: RiUser3Fill,
      detailHeader: 'Total no of Editors',
      value: totalEditorsCountData ? totalEditorsCountData.amount : 0,
      weeklyValue: weeklyEditorsCountData ? weeklyEditorsCountData.amount : 0,
      color: 'pink.400',
    },
  ]
  const piedata = [
    { name: 'Editors', value: 400 },
    { name: 'Visitors', value: 300 },
  ]
  const COLORS = ['#FF5DAA', '#FFB3D7']

  if (!token)
    return (
      <SignTokenMessage
        message="To make changes to the admin panel, authenticate
your wallet to continue"
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
        {wikiMetaData.map((item, i) => {
          const { value, detailHeader, weeklyValue, color, icon } = item
          return (
            <WikiDetailsCards
              detailHeader={detailHeader}
              icon={icon}
              key={i}
              currentValue={value || 0}
              weeklyValue={weeklyValue ? weeklyValue.toString() : '0'}
              color={color}
            />
          )
        })}
        <Box
          w={{ lg: '90%', base: '100%' }}
          px="5"
          py="4"
          cursor="pointer"
          borderWidth="1px"
          rounded="xl"
          alignItems="center"
          justifyContent="flex-start"
        >
          <FormControl isRequired>
            <FormLabel htmlFor="username">Enter URL</FormLabel>
            <Input
              mb={5}
              onChange={e => {
                if (e.target.value.length >= 1) {
                  setRevalidateActive(false)
                  setRevalidateURLText(e.target.value)
                } else {
                  setRevalidateActive(true)
                }
              }}
            />
            <Button
              disabled={revalidateActive}
              onClick={() => {
                revalidateURLFunc()
              }}
            >
              Revalidate Url
            </Button>
          </FormControl>
        </Box>
      </Stack>
      <WikiDataGraph
        piedata={piedata}
        colors={COLORS}
        data={dataObj}
        handleGraphFilterChange={(e: string) => {
          return setGraphFilter(e)
        }}
      />
      <Stack spacing={15} direction="column" mb="3rem">
        <WikiInsightTable />
        <WikiEditorsInsightTable />
      </Stack>
    </Box>
  )
}

export default dynamic(() => Promise.resolve(authenticatedRoute(Admin)), {
  ssr: false,
})
