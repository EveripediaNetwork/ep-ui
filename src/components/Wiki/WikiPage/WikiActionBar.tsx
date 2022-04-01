import React from 'react'
import { Icon, Text, VStack } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { RiBookOpenFill, RiEdit2Line, RiHistoryLine } from 'react-icons/ri'
import { Wiki } from '@/types/Wiki'
import { useRouter } from 'next/router'

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
]

interface WikiActionBarProps {
  wiki: Wiki | undefined
}

const WikiActionBar = ({ wiki }: WikiActionBarProps) => {
  const router = useRouter()
  return (
    <VStack borderRightWidth="1px" px={6} py="100px" borderColor="borderColor">
      <VStack spacing={8} position="sticky" top="calc(100px + 70px + 2px)">
        {actionBarItems.map((item, index) => (
          <VStack
            cursor="pointer"
            color={item.label === 'Read' ? 'brand.600' : 'unset'}
            key={index}
            onClick={() => {
              router.push(`/create-wiki?slug=${wiki?.id}`) // TODO: fix this for only edit button
            }}
          >
            <Icon fontSize="20px" as={item.icon} />
            <Text fontSize="14px">{item.label}</Text>
          </VStack>
        ))}
      </VStack>
    </VStack>
  )
}

export default WikiActionBar
