import React from 'react'
import {
  Flex,
  VStack,
  Heading,
  Box,
  Text,
  Select,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Legend,
  Label,
} from 'recharts'
import { MdArrowDropDown } from 'react-icons/md'
import { UserDataPie } from './UserDataPie'

export const WikiDataGraph = ({
  piedata,
  data,
  colors,
  handleGraphFilterChange,
}: {
  piedata: Array<{ name: string | undefined; value: number | undefined }>
  data: Array<{
    name: string | undefined
    'Wikis Created': number | undefined
    'Wikis Edited': number | undefined
  }>
  colors: Array<string>
  handleGraphFilterChange: any
}) => {
  const currentYear = new Date().getFullYear()
  const labelColor = useColorModeValue('#718096', '#6c7079')
  return (
    <Flex gap={4} py="4" w="full" flexDir={{ base: 'column', lg: 'row' }}>
      <Box rounded="xl" borderWidth="1px" p={4} w={{ lg: '75%', base: '100%' }}>
        <Flex justifyContent="space-between" pt="2" pb="10">
          <VStack spacing={2} w="full">
            <Heading as="h2" fontSize="21" fontWeight="bold" w="full">
              Wiki Data
            </Heading>
            <Text fontSize="sm" fontWeight="light" w="full">
              Track wikis created and wikis edited
            </Text>
          </VStack>
          <Select
            w="20%"
            icon={<MdArrowDropDown />}
            onChange={e => {
              handleGraphFilterChange(e.target.value)
            }}
          >
            <option value="week">{`Weekly (${currentYear})`}</option>
            <option value="month">{`Monthly (${currentYear})`}</option>
            <option value="year">{`Yearly (${currentYear})`}</option>
          </Select>
        </Flex>
        <Box p={5}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart width={500} data={data}>
              <Legend iconType="circle" verticalAlign="top" align="right" />
              <XAxis
                padding={{ left: 30 }}
                axisLine={false}
                tickLine={false}
                minTickGap={20}
                tickMargin={50}
                dataKey="name"
                dy={-45}
              >
                <Label position="insideBottom" style={{ fill: labelColor }} />
              </XAxis>
              <YAxis
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                dx={40}
                dy={-20}
              >
                <Label
                  angle={270}
                  position="center"
                  style={{ fill: labelColor }}
                  value="No. of wikis"
                />
              </YAxis>
              <Tooltip />
              <Line
                type="monotone"
                dataKey="Wikis Created"
                stroke="#FF69B4"
                activeDot={{ r: 8 }}
                strokeWidth={2.2}
              />
              <Line
                type="monotone"
                dataKey="Wikis Edited"
                stroke="#FFC0CB"
                strokeWidth={2.2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
      <UserDataPie piedata={piedata} colors={colors} data={data} />
    </Flex>
  )
}
