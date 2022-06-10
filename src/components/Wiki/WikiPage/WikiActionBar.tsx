import React from 'react'
import { VStack, Icon, Text, Flex } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { RiBookOpenFill, RiEdit2Line, RiHistoryLine } from 'react-icons/ri'
import { Wiki } from '@/types/Wiki'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'

interface WikiActionBarProps {
  wiki: Wiki | undefined
}

const WikiActionBar = ({ wiki }: WikiActionBarProps) => {
  const router = useRouter()
  const { data: accountData } = useAccount()
  const actionBarItems: {
    label: string
    icon: IconType
    isDisabled?: boolean
    isActive?: boolean
    handleClick: () => void
  }[] = [
    {
      label: 'Read',
      icon: RiBookOpenFill,
      isDisabled: !wiki,
      isActive: router.asPath === `/wiki/${wiki?.id}`,
      handleClick: () => {},
    },
    {
      label: 'Edit',
      icon: RiEdit2Line,
      isDisabled: accountData?.address === undefined,
      isActive: router.asPath === `/create-wiki?slug=${wiki?.id}`,
      handleClick: () => {
        router.push(`/create-wiki?slug=${wiki?.id}`)
      },
    },
    {
      label: 'History',
      icon: RiHistoryLine,
      isDisabled: false,
      handleClick: () => {
        router.push(`/wiki/${wiki?.id}/history`)
      },
    },
  ]
  return (
    <VStack
      borderRightWidth={{ base: 0, md: '1px' }}
      borderBottomWidth={{ base: '1px', md: '0' }}
      px={6}
      py={{ base: 4, md: 'calc(50vh - 150px )' }}
      mt={{ base: 0, md: 0 }}
      borderColor="borderColor"
      w={{ lg: '5%', base: '100%' }}
    >
      <Flex
        direction={{ base: 'row', md: 'column' }}
        gap={{ base: 6, sm: 8 }}
        position="sticky"
        top="calc(50vh - 150px + 70px + 2px)"
      >
        {actionBarItems.map((item, index) => (
          <VStack
            cursor={item.isDisabled ? 'not-allowed' : 'pointer'}
            color={
              // eslint-disable-next-line no-nested-ternary
              item.isActive
                ? 'brand.600'
                : item.isDisabled
                ? 'wikiActionBtnDisabled'
                : 'unset'
            }
            key={index}
            onClick={!item.isDisabled ? item.handleClick : undefined}
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
