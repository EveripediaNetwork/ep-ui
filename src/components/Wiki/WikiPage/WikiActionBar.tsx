import React from 'react'
import { VStack, Icon, Text } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import {
  RiBookOpenFill,
  RiChat3Line,
  RiEdit2Line,
  RiHistoryLine,
  RiLineChartLine,
} from 'react-icons/ri'

const actionBarItems: {
  label: string
  icon: IconType
  handleClick: () => void
}[] = [
  {
    label: 'Read',
    icon: RiBookOpenFill,
    handleClick: () => {},
  },
  {
    label: 'Edit',
    icon: RiEdit2Line,
    handleClick: () => {},
  },
  {
    label: 'History',
    icon: RiHistoryLine,
    handleClick: () => {},
  },
  {
    label: 'Delete',
    icon: RiChat3Line,
    handleClick: () => {},
  },
  {
    label: 'Activity',
    icon: RiLineChartLine,
    handleClick: () => {},
  },
]
const WikiActionBar = () => (
  <VStack borderRightWidth="1px" px={6} py="100px" borderColor="borderColor">
    <VStack spacing={8} position="sticky" top="calc(100px + 70px + 2px)">
      {actionBarItems.map((item, index) => (
        <VStack
          cursor="pointer"
          color={item.label === 'Read' ? 'brand.600' : 'unset'}
          key={index}
        >
          <Icon fontSize="20px" as={item.icon} />
          <Text fontSize="14px">{item.label}</Text>
        </VStack>
      ))}
    </VStack>
  </VStack>
)

export default WikiActionBar
