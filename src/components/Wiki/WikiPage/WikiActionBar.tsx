import React from 'react'
import { VStack, Icon, Text, Flex, useDisclosure } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import {
  RiBellLine,
  RiBookOpenFill,
  RiEdit2Line,
  RiHistoryLine,
} from 'react-icons/ri'
import { BiShareAlt } from 'react-icons/bi'
import { Wiki } from '@everipedia/iq-utils'
import { useRouter } from 'next/router'
import { getUserAddressFromCache } from '@/utils/getUserAddressFromCache'

import ShareWikiModal from './CustomModals/ShareWikiModal'
import SubscribeModal from './CustomModals/SubscribeModal'

interface WikiActionBarProps {
  wiki?: Wiki | null
}

const WikiActionBar = ({ wiki }: WikiActionBarProps) => {
  const {
    isOpen: isShareBoxOpen,
    onOpen: onShareBoxOpen,
    onClose: onShareBoxClose,
  } = useDisclosure()
  const {
    isOpen: isSubscribeBoxOpen,
    onOpen: onSubscribeBoxOpen,
    onClose: onSubscribeBoxClose,
  } = useDisclosure()
  const router = useRouter()

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
      isDisabled: typeof getUserAddressFromCache() !== 'string',
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
    {
      label: 'Notify',
      icon: RiBellLine,
      isDisabled: typeof getUserAddressFromCache() !== 'string',
      handleClick: onSubscribeBoxOpen,
    },
    {
      label: 'Share',
      icon: BiShareAlt,
      isDisabled: !wiki,
      isActive: router.asPath === ``,
      handleClick: onShareBoxOpen,
    },
  ]

  return (
    <>
      <VStack
        borderRightWidth={{ base: 0, md: '1px' }}
        borderBottomWidth={{ base: '1px', md: '0' }}
        px={6}
        py={4}
        transform={{ base: 'unset', md: 'translateY(-50px)' }}
        maxW={{ base: 'unset', md: '120px' }}
      >
        <ShareWikiModal
          isOpen={isShareBoxOpen}
          onClose={onShareBoxClose}
          {...wiki}
        />
        {isSubscribeBoxOpen && wiki && (
          <SubscribeModal
            isOpen={isSubscribeBoxOpen}
            onClose={onSubscribeBoxClose}
            wiki={wiki}
          />
        )}
        <Flex
          direction={{ base: 'row', md: 'column' }}
          gap={{ base: 6, sm: 8 }}
          position="sticky"
          top="calc(50vh - 150px + 70px + 2px)"
        >
          {actionBarItems.map((item, index) => (
            <VStack
              cursor={
                item.isDisabled || wiki === undefined
                  ? 'not-allowed'
                  : 'pointer'
              }
              color={
                // eslint-disable-next-line no-nested-ternary
                item.isActive
                  ? 'brandLinkColor'
                  : // eslint-disable-next-line no-nested-ternary
                  item.isDisabled
                  ? 'wikiActionBtnDisabled'
                  : wiki === undefined
                  ? 'wikiActionBtnDisabled'
                  : 'unset'
              }
              key={index}
              onClick={
                !item.isDisabled && wiki !== undefined
                  ? item.handleClick
                  : undefined
              }
            >
              <Icon fontSize={{ base: '16px', sm: '20px' }} as={item.icon} />
              <Text fontSize={{ base: '12px', sm: '14px' }}>{item.label}</Text>
            </VStack>
          ))}
        </Flex>
      </VStack>
    </>
  )
}

export default WikiActionBar
