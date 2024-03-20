import { Flex, Spinner, Text, Box } from '@chakra-ui/react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts'
import GraphLine from './GraphLine'
import { Dict } from '@chakra-ui/utils'
import * as Humanize from 'humanize-plus'

const IQGraph = ({
  graphTitle,
  areaGraphData,
  height = 200,
}: {
  graphTitle: string
  areaGraphData?: Dict<number>[] | undefined
  height?: number
}) => {
  return (
    <Box
      rounded="lg"
      border="solid 1px "
      borderColor="divider"
      //   py={{ base: '13px', md: '22px', lg: '6' }}
      //   px={{ base: '11px', md: '18px', lg: 5 }}
      //   minH={{ base: 'auto', lg: '380px' }}
      id={graphTitle}
    >
      <Flex
        mt="27px"
        sx={{
          '.recharts-surface, .recharts-wrapper': {
            w: '100%',
          },
          '.recharts-tooltip-cursor, .recharts-area-curve': {
            color: 'brandText',
            stroke: 'currentColor',
          },
          '.gradientStart': {
            color: 'brandText',
            _dark: {
              color: 'rgba(255, 26, 136, 0.2)',
            },
          },
          '.gradientStop': {
            color: 'white',
            _dark: {
              color: 'transparent',
            },
          },
        }}
      >
        <Flex>
          <ResponsiveContainer width="100%" height={height}>
            {areaGraphData !== undefined ? (
              <AreaChart data={areaGraphData}>
                <YAxis
                  dataKey="amt"
                  stroke="currentColor"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value: number) =>
                    Humanize.formatNumber(value, 4)
                  }
                  tick={{ fontSize: 12 }}
                  type="number"
                  tickCount={7}
                  domain={['dataMin', 'dataMax']}
                />
                <Tooltip label={'tooltip'} />
                <GraphLine />
                <Area
                  className="area"
                  activeDot={{ r: 4 }}
                  type="monotone"
                  dataKey="amt"
                  stroke="#FF1A88"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            ) : (
              <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Spinner
                  thickness="4px"
                  speed="0.4s"
                  color="graphSpinnerColor"
                  emptyColor="graphSpinnerEmptyColor"
                  size={{ xl: 'xl', base: 'md' }}
                />
                <Text mt="5" color="tooltipColor">
                  Fetching chart data
                </Text>
              </Flex>
            )}
          </ResponsiveContainer>
        </Flex>
      </Flex>
    </Box>
  )
}

export default IQGraph
