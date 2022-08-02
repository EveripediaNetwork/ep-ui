import React from 'react'
import { Heading, Text, Stack, Icon } from '@chakra-ui/react'

import { RiEditFill, RiUser3Fill, RiUserSearchFill } from 'react-icons/ri'
import { WikiDataGraph } from '@/components/Admin/WikiDataGraph'
import { WikiDetailsCards } from '@/components/Admin/WikiDetailsCards'

const Admin = () => {
  const data = [
    {
      name: 'Mon',
      "Wikis Created": 40,
      "Wikis Edited": 24,
    },
    {
      name: 'Tue',
      "Wikis Created": 30,
      "Wikis Edited": 13,
    },
    {
      name: 'Wed',
      "Wikis Created": 20,
      "Wikis Edited": 18,
    },
    {
      name: 'Thur',
      "Wikis Created": 27,
      "Wikis Edited": 14,
    },
    {
      name: 'Fri',
      "Wikis Created": 18,
      "Wikis Edited": 48,
    },
    {
      name: 'Sat',
      "Wikis Created": 23,
      "Wikis Edited": 38,
    },
    {
      name: 'Sun',
      "Wikis Created": 34,
      "Wikis Edited": 43,
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
          const { value, detailHeader, weeklyValue, percent, color, icon } = item
          return (
            <WikiDetailsCards
              detailHeader={detailHeader}
              icon={icon}
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
