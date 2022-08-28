import React, { useEffect, useMemo, useState } from 'react'
import { Heading, Text, Stack, Box } from '@chakra-ui/react'

import {
  RiNewspaperFill,
  RiEditFill,
  RiUser3Fill,
  RiUserSearchFill,
} from 'react-icons/ri'
import { WikiDataGraph } from '@/components/Admin/WikiDataGraph'
import { WikiDetailsCards } from '@/components/Admin/WikiDetailsCards'
import { WikiEditorsInsightTable } from '@/components/Admin/WikiEditorInsight/WikiEditorsInsight'
import { WikiInsightTable } from '@/components/Admin/WikiCreatedInsight/WikiInsightTable'
import { useWeb3Token } from '@/hooks/useWeb3Token'
import { profileApiClient } from '@/services/profile'
import { authenticatedRoute } from '@/components/AuthenticatedRoute'
import { useUserProfileData } from '@/services/profile/utils'
import { useAccount } from 'wagmi'
import {
  useGetWikisCreatedCountQuery,
  useGetWikisEditedCountQuery,
  useGetEditorsCountQuery,
  adminApiClient,
} from '@/services/admin'
import dynamic from 'next/dynamic'
import SignTokenMessage from '../account/SignTokenMessage'

const Admin = () => {
  const { token, reSignToken, error } = useWeb3Token()
  const { address: userAddress } = useAccount()
  const { setAccount } = useUserProfileData('', {
    withAllSettings: true,
  })

  useEffect(() => {
    if (userAddress && token) {
      adminApiClient.setHeader('authorization', token)
      setAccount(userAddress)
    }
  }, [userAddress, setAccount, token])
  const startDate = useMemo(() => {
    let prevMonday = new Date()
    prevMonday = new Date(
      prevMonday.setDate(
        prevMonday.getDate() - ((prevMonday.getDay() + 6) % 7),
      ),
    )
    prevMonday.setHours(0, 0, 0, 0)

    return Math.floor(prevMonday.getTime() / 1000)
  }, [])

  const endDate = useMemo(() => Math.floor(new Date().getTime() / 1000), [])

  const [graphFilter, setGraphFilter] = useState<string>('week')

  const { data: totalWikisCreatedCountData } = useGetWikisCreatedCountQuery({
    startDate: 0,
    endDate,
    interval: 'year',
  })

  const { data: weeklyWikiCreatedCountData } = useGetWikisCreatedCountQuery({
    startDate,
    interval: 'week',
  })

  const { data: totalWikisEditedCountData } = useGetWikisEditedCountQuery({
    startDate: 0,
    endDate,
    interval: 'year',
  })

  const { data: weeklyWikiEditedCountData } = useGetWikisEditedCountQuery({
    startDate,
    interval: 'week',
  })

  const { data: totalEditorsCountData } = useGetEditorsCountQuery({
    startDate: 0,
    endDate,
    interval: 'year',
  })

  const { data: weeklyEditorsCountData } = useGetEditorsCountQuery({
    startDate,
    interval: 'week',
  })

  const { data: GraphWikisCreatedCountData } = useGetWikisCreatedCountQuery({
    interval: graphFilter,
    startDate: 0,
  })

  const { data: GraphWikisEditedCountData } = useGetWikisEditedCountQuery({
    interval: graphFilter,
    startDate: 0,
  })

  const dataObj: Array<{
    name: string | undefined
    'Wikis Created': number | undefined
    'Wikis Edited': number
  }> = []
  GraphWikisEditedCountData?.map((item, index) => {
    const editedCount = GraphWikisEditedCountData[index].amount
    const createdCount =
      GraphWikisCreatedCountData && GraphWikisCreatedCountData[index]?.amount
    const createCountStart =
      GraphWikisCreatedCountData && GraphWikisCreatedCountData[index]?.startOn

    dataObj.push({
      name:
        // eslint-disable-next-line
        graphFilter !== 'week'
          ? graphFilter === 'year'
            ? createCountStart?.split('-')[0]
            : createCountStart?.split('T')[0].split('-').slice(0, 2).join('-')
          : `Week ${index + 1}`,
      'Wikis Created': createdCount,
      'Wikis Edited': editedCount,
    })
    return null
  })

  const wikiMetaData = [
    {
      icon: RiNewspaperFill,
      value: totalWikisEditedCountData
        ? totalWikisEditedCountData[0]?.amount
        : 0,
      weeklyValue: weeklyWikiEditedCountData
        ? weeklyWikiEditedCountData[0]?.amount
        : 0,
      percent: Math.round(
        totalWikisEditedCountData && weeklyWikiEditedCountData
          ? weeklyWikiEditedCountData[0].amount /
              totalWikisEditedCountData[0].amount
          : 0,
      ),
      color: 'pink.400',
      detailHeader: 'Total no of Edited Wikis',
    },
    {
      icon: RiEditFill,
      value: totalWikisCreatedCountData
        ? totalWikisCreatedCountData[0]?.amount
        : 0,
      weeklyValue: weeklyWikiCreatedCountData
        ? weeklyWikiCreatedCountData[0]?.amount
        : 0,
      percent: Math.round(
        totalWikisCreatedCountData && weeklyWikiCreatedCountData
          ? weeklyWikiCreatedCountData[0].amount /
              totalWikisCreatedCountData[0].amount
          : 0,
      ),
      color: 'pink.400',
      detailHeader: 'Total no of Created Wikis',
    },
    {
      icon: RiUser3Fill,
      detailHeader: 'Total no of Editors',
      value: totalEditorsCountData ? totalEditorsCountData.amount : 0,
      weeklyValue: weeklyEditorsCountData ? weeklyEditorsCountData.amount : 0,
      percent: Math.round(
        (totalEditorsCountData ? totalEditorsCountData.amount : 0) /
          (weeklyEditorsCountData ? weeklyEditorsCountData.amount : 0),
      ),
      color: 'pink.400',
    },
    {
      icon: RiUserSearchFill,
      value: 500,
      detailHeader: 'Total no of Visitors',
      weeklyValue: '1k',
      percent: 40,
      color: 'pink.400',
    },
  ]
  const piedata = [
    { name: 'Editors', value: 400 },
    { name: 'Visitors', value: 300 },
  ]
  const COLORS = ['#FF5DAA', '#FFB3D7']

  useEffect(() => {
    if (userAddress && token) {
      profileApiClient.setHeader('authorization', token)
      setAccount(userAddress)
    }
  }, [userAddress, setAccount, token])

  if (!token)
    return <SignTokenMessage reopenSigningDialog={reSignToken} error={error} />

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
          const { value, detailHeader, weeklyValue, percent, color, icon } =
            item
          return (
            <WikiDetailsCards
              detailHeader={detailHeader}
              icon={icon}
              key={i}
              currentValue={value?.toString()}
              weeklyValue={weeklyValue ? weeklyValue.toString() : '0'}
              percent={percent}
              color={color}
            />
          )
        })}
      </Stack>
      <WikiDataGraph
        piedata={piedata}
        colors={COLORS}
        data={dataObj}
        handleGraphFilterChange={(e: string) => {
          return setGraphFilter(e)
        }}
      />
      <Stack spacing={15} direction="column">
        <WikiInsightTable />
        <WikiEditorsInsightTable />
      </Stack>
    </Box>
  )
}

export default dynamic(() => Promise.resolve(authenticatedRoute(Admin)), {
  ssr: false,
})
