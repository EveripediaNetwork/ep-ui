import React from 'react'
import { HStack, Flex, VStack, Heading, Box, Text, Select } from '@chakra-ui/react'
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Legend,
} from 'recharts'
import { UserDataPie } from './UserDataPie'
import { MdArrowDropDown } from 'react-icons/md'

export const WikiDataGraph = ({
  piedata,
  data,
  colors,
}: {
  piedata: Array<{ name: string; value: number }>
  data: Array<{ name: string; "Wikis Created": number; "Wikis Edited": number }>
  colors: Array<string>
}) => {
    const currentYear = new Date().getFullYear()
    console.log(data)
  return (
    <HStack spacing={4} py="4" w="full">
      <Box rounded="xl" borderWidth="1px" p={4} w="75%">
        <Flex justifyContent="space-between" pt="2" pb="10">
          <VStack spacing={2} w="full">
            <Heading as="h2" fontSize="21" fontWeight="bold" w="full">
              Wiki Data
            </Heading>
            <Text fontSize="sm" fontWeight="light" w="full">
              Track wikis created and wikis edited
            </Text>
          </VStack>
          <Select w='20%' icon={<MdArrowDropDown />}>
            <option value='option1'>{`Weekly (${currentYear})`}</option>
            <option value='option1'>{`Monthly (${currentYear})`}</option>
            <option value='option1'>{`Yearly (${currentYear})`}</option>
        </Select>
        </Flex>
        <Box p={5}>
        <Legend iconType="circle" wrapperStyle={{ top: 300 }} />
          <ResponsiveContainer width="100%" height={300}>
            <LineChart width={500} height={300} data={data}>
            <Legend iconType="circle" verticalAlign="top" align="right" />
              <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="Wikis Created"
                stroke="#FF69B4"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="Wikis Edited" stroke="#FFC0CB" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
      <UserDataPie piedata={piedata} colors={colors} data={data} />
    </HStack>
  )
}
