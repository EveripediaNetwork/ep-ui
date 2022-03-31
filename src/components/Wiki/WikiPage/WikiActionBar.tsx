import React from 'react'
import { VStack, Icon, Text, Flex } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import {
  RiBookOpenFill,
  RiChat3Line,
  RiEdit2Line,
  RiHistoryLine,
  RiLineChartLine,
} from 'react-icons/ri'
import { Wiki } from '@/types/Wiki'
import { useRouter } from 'next/router'

interface WikiActionBarProps {
  wiki: Wiki | undefined
}

const WikiActionBar = ({ wiki }: WikiActionBarProps) => {
  const router = useRouter()
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
      handleClick: () => {
        router.push(`/create-wiki?slug=${wiki?.id}`)
      },
    },
    {
      label: 'History',
      icon: RiHistoryLine,
      handleClick: () => {},
    },
    {
      label: 'Discussion',
      icon: RiChat3Line,
      handleClick: () => {},
    },
    {
      label: 'Activity',
      icon: RiLineChartLine,
      handleClick: () => {},
    },
  ]
  return (
    <VStack
      borderRightWidth={{ base: 0, md: '1px' }}
      borderBottomWidth={{ base: '1px', md: '0' }}
      px={3}
      py={{ base: 4, md: '100px' }}
      mt={{ base: 0, md: 0 }}
      borderColor="borderColor"
    >
      <Flex
        direction={{ base: 'row', md: 'column' }}
        gap={{ base: 6, sm: 8 }}
        position="sticky"
        top="calc(100px + 70px + 2px)"
      >
        {actionBarItems.map((item, index) => (
          <VStack
            cursor="pointer"
            color={item.label === 'Read' ? 'brand.600' : 'unset'}
            key={index}
            onClick={item.handleClick}
          >
            <Icon fontSize={{ base: '16px', sm: '20px' }} as={item.icon} />
            <Text fontSize={{ base: '12px', sm: '14px' }}>{item.label}</Text>
          </VStack>
        ))}
      </Flex>
    </VStack>
  )
}

export default WikiActionBar
