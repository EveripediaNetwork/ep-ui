import { Heading, Box } from '@chakra-ui/react'
import React from 'react'
import { PieChart, Pie, Cell, Legend } from 'recharts'

export const UserDataPie = ({
  piedata,
  data,
  colors,
}: {
  piedata: Array<{ name: string; value: number }>
  data: Array<{ name: string; "Wikis Created": number; "Wikis Edited": number }>
  colors: Array<string>
}) => {
  return (
    <Box rounded="xl" borderWidth="1px" p={6}>
      <Heading as="h2" fontSize="21" fontWeight="bold" w="full">
        User Data
      </Heading>
      <PieChart width={350} height={400}>
        <Pie
          data={piedata}
          cx={170}
          cy={200}
          innerRadius={50}
          outerRadius={130}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry: any, index: any) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend 
        payload={
          piedata.map(
            (item, index) => ({
              id: item.name,
              type: "circle",
              value: item.name,
              color: colors[index % colors.length]
            })
          )
        }
         layout="horizontal" verticalAlign="bottom" align="center" 
        />
      </PieChart>
    </Box>
  )
}
