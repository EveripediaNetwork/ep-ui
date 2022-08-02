import React from 'react'
import { Heading, Text, Stack, Icon } from '@chakra-ui/react'

import { RiEditFill, RiUser3Fill, RiUserSearchFill } from 'react-icons/ri'
import { WikiDataGraph } from '@/components/Admin/WikiDataGraph'
import { WikiDetailsCards } from '@/components/Admin/WikiDetailsCards'

const Admin = () => {
  const data = [
    {
      name: 'Mon',
      uv: 40,
      pv: 24,
    },
    {
      name: 'Tue',
      uv: 30,
      pv: 13,
    },
    {
      name: 'Wed',
      uv: 20,
      pv: 18,
    },
    {
      name: 'Thur',
      uv: 27,
      pv: 14,
    },
    {
      name: 'Fri',
      uv: 18,
      pv: 48,
    },
    {
      name: 'Sat',
      uv: 23,
      pv: 38,
    },
    {
      name: 'Sun',
      uv: 34,
      pv: 43,
    },
  ]

  const wikiMetaData = [
    {
      icon: RiEditFill,
      value: 500,
      weeklyValue: '1k',
      percent: 40,
      color: 'pink.400',
      detailHeader: 'Total no of Edited Wikis',
    },
    {
      icon: RiEditFill,
      value: 500,
      weeklyValue: '1k',
      percent: 40,
      color: 'pink.400',
      detailHeader: 'Total no of Edited Wikis',
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

  return (
    <Stack direction="column" justify="center" mx="auto" w="full" px="20">
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
          const { value, detailHeader, weeklyValue, percent, color } = item
          return (
            <WikiDetailsCards
              detailHeader={detailHeader}
              icon={Icon}
              currentValue={value.toString()}
              weeklyValue={weeklyValue}
              percent={percent}
              color={color}
            />
          )
        })}
      </Stack>
      <WikiDataGraph piedata={piedata} colors={COLORS} data={data} />
    </Stack>
  )
}
export default Admin
