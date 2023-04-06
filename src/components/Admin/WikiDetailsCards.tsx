import React, { useMemo } from 'react'
import {
  VStack,
  Icon,
  Text,
  Box,
  Flex,
  Heading,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { RiNewspaperFill, RiEditFill, RiUser3Fill } from 'react-icons/ri'
import {
  useGetWikisCreatedCountQuery,
  useGetWikisEditedCountQuery,
  useGetEditorsCountQuery,
} from '@/services/admin'
import { WikisModifiedCount } from '@/types/admin'

interface WikidetailsProps {
  detailHeader: string
  icon: IconType
  currentValue: number
  weeklyValue: string
  color: string
}

export const WikiDetailsCards = ({
  detailHeader,
  icon,
  currentValue,
  weeklyValue,
  color,
}: WikidetailsProps) => {
  return (
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
      <VStack cursor="pointer" mx="auto" justifyContent="flex-start" w="full">
        <Icon
          as={icon}
          width="40px"
          height="40px"
          padding={2}
          w="full"
          alignSelf="flex-start"
        />

        <Text w="full" fontSize="15" fontWeight="bold" my={2}>
          {detailHeader}
        </Text>

        <Flex alignItems="center" justifyContent="space-between" w="full">
          <VStack spacing={0}>
            <Heading as="h3" fontSize="25" w="full">
              {currentValue}
            </Heading>
            <Text fontSize="xs" color="primaryGray">
              {weeklyValue} this week
            </Text>
          </VStack>
          <CircularProgress
            value={Math.round((parseInt(weeklyValue, 10) / currentValue) * 100)}
            color={color}
            size="45px"
          >
            <CircularProgressLabel fontSize="xs">
              {Math.round((parseInt(weeklyValue, 10) / currentValue) * 100)}%
            </CircularProgressLabel>
          </CircularProgress>
        </Flex>
      </VStack>
    </Box>
  )
}

export const AllWikiDetailsCards = () => {
  const endDate = useMemo(() => Math.floor(new Date().getTime() / 1000), [])

  const { data: totalWikisCreatedCountData } = useGetWikisCreatedCountQuery({
    startDate: 0,
    endDate,
    interval: 'year',
  })

  // const { data: weeklyWikiCreatedCountData } = useGetWikisCreatedCountQuery({
  //   interval: 'year',
  // })

  const { data: wikisCreatedThisWeek } = useGetWikisCreatedCountQuery({
    interval: 'week',
  })

  const { data: totalWikisEditedCountData } = useGetWikisEditedCountQuery({
    startDate: 0,
    endDate,
    interval: 'year',
  })

  const { data: wikisEditedThisWeek } = useGetWikisEditedCountQuery({
    interval: 'week',
  })

  // const { data: weeklyWikiEditedCountData } = useGetWikisEditedCountQuery({
  //   startDate: 0,
  //   interval: 'week',
  // })

  const { data: totalEditorsCountData } = useGetEditorsCountQuery({
    startDate: 0,
  })

  const { data: weeklyEditorsCountData } = useGetEditorsCountQuery({})

  const addCountAmount = (data: WikisModifiedCount[]) => {
    let total = 0
    data.forEach((item: WikisModifiedCount) => {
      total += item.amount
    })
    return total
  }

  const wikiMetaData = [
    {
      icon: RiNewspaperFill,
      value: totalWikisEditedCountData
        ? addCountAmount(totalWikisEditedCountData)
        : 0,
      weeklyValue: wikisEditedThisWeek
        ? addCountAmount(wikisEditedThisWeek)
        : 0,
      color: 'pink.400',
      detailHeader: 'Total no of Edited Wikis',
    },
    {
      icon: RiEditFill,
      value: totalWikisCreatedCountData
        ? addCountAmount(totalWikisCreatedCountData)
        : 0,
      weeklyValue: wikisCreatedThisWeek
        ? addCountAmount(wikisCreatedThisWeek)
        : 0,
      color: 'pink.400',
      detailHeader: 'Total no. of Created Wikis',
    },
    {
      icon: RiUser3Fill,
      detailHeader: 'Total no. of Editors',
      value: totalEditorsCountData ? totalEditorsCountData.amount : 0,
      weeklyValue: weeklyEditorsCountData ? weeklyEditorsCountData.amount : 0,
      color: 'pink.400',
    },
  ]

  return (
    <>
      {wikiMetaData.map((item, i) => {
        return (
          <WikiDetailsCards
            detailHeader={item.detailHeader}
            icon={item.icon}
            key={i}
            currentValue={item.value || 0}
            weeklyValue={item.weeklyValue ? item.weeklyValue.toString() : '0'}
            color={item.color}
          />
        )
      })}
    </>
  )
}
