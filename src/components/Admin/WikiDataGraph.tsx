import React from 'react'
import {
  HStack,
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
}: {
  piedata: Array<{ name: string; value: number }>
  data: Array<{ name: string; 'Wikis Created': number; 'Wikis Edited': number }>
  colors: Array<string>
}) => {
  const currentYear = new Date().getFullYear()
  const labelColor = useColorModeValue('#718096', '#6c7079')
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
          <Select w="20%" icon={<MdArrowDropDown />}>
            <option value="option1">{`Weekly (${currentYear})`}</option>
            <option value="option1">{`Monthly (${currentYear})`}</option>
            <option value="option1">{`Yearly (${currentYear})`}</option>
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
                dy={-65}
              >
                <Label
                  position="insideBottom"
                  style={{ fill: labelColor }}
                  value="Week"
                />
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
    </HStack>
  )
}
