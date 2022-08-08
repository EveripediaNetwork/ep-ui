import React, { useEffect, useMemo } from 'react'
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
  useGetAllCreatedWikiCountQuery,
  useGetWikisCreatedCountQuery,
  useGetWikisEditedCountQuery,
} from '@/services/admin'
import dynamic from 'next/dynamic'
import SignTokenMessage from '../account/SignTokenMessage'

const Admin = () => {
  const getMonday = useMemo(() => {
    const d = new Date()
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1)
    return new Date(d.setDate(diff))
  }, [])

  const endDate = useMemo(() => Math.floor(new Date().getTime() / 1000), [])

  const startDate = Math.floor(getMonday.getTime() / 1000)

  const { data: totalWikisCreatedCountData } = useGetWikisCreatedCountQuery({
    startDate: 0,
    endDate,
    interval: 'year',
  })

  const { data: weeklyWikiCreatedCountData } = useGetWikisCreatedCountQuery({
    startDate,
    endDate,
    interval: 'year',
  })

  const { data: totalWikisEditedCountData } = useGetWikisEditedCountQuery({
    startDate: 0,
    endDate,
    interval: 'year',
  })

  const { data: weeklyWikiEditedCountData } = useGetWikisEditedCountQuery({
    startDate,
    endDate,
    interval: 'year',
  })
  const { data: wikiData } = useGetAllCreatedWikiCountQuery(30)

  console.log({ wikiData })

  const { data: GraphWikiEditedCountData } = useGetWikisCreatedCountQuery({
    startDate: 0,
    endDate,
    interval: 'year',
  })

  const data = [
    {
      name: 'Mon',
      'Wikis Created': 40,
      'Wikis Edited': 24,
    },
    {
      name: 'Tue',
      'Wikis Created': 30,
      'Wikis Edited': 13,
    },
    {
      name: 'Wed',
      'Wikis Created': 20,
      'Wikis Edited': 18,
    },
    {
      name: 'Thur',
      'Wikis Created': 27,
      'Wikis Edited': 14,
    },
    {
      name: 'Fri',
      'Wikis Created': 18,
      'Wikis Edited': 48,
    },
    {
      name: 'Sat',
      'Wikis Created': 23,
      'Wikis Edited': 38,
    },
    {
      name: 'Sun',
      'Wikis Created': 34,
      'Wikis Edited': 43,
    },
  ]

  const wikiMetaData = [
    {
      icon: RiNewspaperFill,
      value: totalWikisEditedCountData
        ? totalWikisEditedCountData[0]?.amount
        : 0,
      weeklyValue: weeklyWikiEditedCountData
        ? weeklyWikiEditedCountData[0]?.amount
        : 0,
      percent: 40,
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
      percent: 40,
      color: 'pink.400',
      detailHeader: 'Total no of Created Wikis',
    },
    {
      icon: RiUser3Fill,
      detailHeader: 'Total no of Editors',
      value: 500,
      weeklyValue: '1k',
      percent: 40,
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
  const COLORS = ['#FF69B4', '#FFC0CB']
  // const { query } = useRouter()
  const { token, reSignToken, error } = useWeb3Token()
  const { address: userAddress } = useAccount()
  const { setAccount } = useUserProfileData('', {
    withAllSettings: true,
  })

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

      <Stack spacing={8} py={7} direction={{ base: 'column', md: 'row' }}>
        {wikiMetaData.map(item => {
          const { value, detailHeader, weeklyValue, percent, color, icon } =
            item
          return (
            <WikiDetailsCards
              detailHeader={detailHeader}
              icon={icon}
              currentValue={value.toString()}
              weeklyValue={weeklyValue ? weeklyValue.toString() : '0'}
              percent={percent}
              color={color}
            />
          )
        })}
      </Stack>
      <WikiDataGraph piedata={piedata} colors={COLORS} data={data} />
      <Stack spacing={15} direction="column">
        <WikiInsightTable wiki={wikiData || []} />
        <WikiEditorsInsightTable />
      </Stack>
    </Box>
  )
}

export default dynamic(() => Promise.resolve(authenticatedRoute(Admin)), {
  ssr: false,
})
