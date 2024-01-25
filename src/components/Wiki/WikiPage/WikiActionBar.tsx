import React from 'react'
import {
  VStack,
  Icon,
  Text,
  Flex,
  useDisclosure,
  Tooltip,
} from '@chakra-ui/react'
import { IconType } from 'react-icons'
import {
  RiBookOpenFill,
  RiEdit2Line,
  RiHistoryLine,
  RiNotificationLine,
} from 'react-icons/ri'
import { BiShareAlt } from 'react-icons/bi'
import { Wiki } from '@everipedia/iq-utils'
import { useRouter } from 'next/router'
import { getUserAddressFromCache } from '@/utils/WalletUtils/getUserAddressFromCache'
import ShareWikiModal from './CustomModals/ShareWikiModal'
import SubscribeModal from './CustomModals/SubscribeModal'
import { useTranslation } from 'next-i18next'

interface WikiActionBarProps {
  wiki?: Wiki | null
}

const WikiActionBar = ({ wiki }: WikiActionBarProps) => {
  const { t } = useTranslation('wiki')
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

  type ActionBarItem = {
    label: string
    icon: IconType
    isDisabled?: boolean
    isActive?: boolean
    disabledTooltip?: string
    handleClick: () => void
  }

  const actionBarItems: ActionBarItem[] = [
    {
      label: t('read'),
      icon: RiBookOpenFill,
      isDisabled: !wiki,
      disabledTooltip: 'Wiki not found',
      isActive: router.asPath === `/wiki/${wiki?.id}`,
      handleClick: () => {},
    },
    {
      label: t('edit'),
      icon: RiEdit2Line,
      isDisabled: typeof getUserAddressFromCache() !== 'string',
      disabledTooltip: 'Please login to edit',
      isActive: router.asPath === `/create-wiki?slug=${wiki?.id}`,
      handleClick: () => {
        router.push(`/create-wiki?slug=${wiki?.id}`)
      },
    },
    {
      label: t('history'),
      icon: RiHistoryLine,
      isDisabled: false,
      handleClick: () => {
        router.push(`/wiki/${wiki?.id}/history`)
      },
    },
    {
      label: t('notify'),
      icon: RiNotificationLine,
      disabledTooltip: 'Please login to subscribe',
      isDisabled: typeof getUserAddressFromCache() !== 'string',
      handleClick: onSubscribeBoxOpen,
    },
    {
      label: t('share'),
      icon: BiShareAlt,
      isDisabled: !wiki,
      isActive: router.asPath === '',
      handleClick: onShareBoxOpen,
    },
  ]

  const actionIconColor = (item: ActionBarItem) => {
    if (item.isActive) return 'brandLinkColor'
    if (item.isDisabled) return 'wikiActionBtnDisabled'
    if (wiki === undefined) return 'wikiActionBtnDisabled'
    return 'unset'
  }

  return (
    <>
      <VStack
        borderRightWidth={{ base: 0, md: '1px' }}
        borderBottomWidth={{ base: '1px', md: '0' }}
        px={6}
        pt={4}
        pb={1}
        maxW={{ base: 'unset', md: '120px' }}
        borderColor="rankingListBorder"
      >
        {isShareBoxOpen && (
          <ShareWikiModal isOpen={isShareBoxOpen} onClose={onShareBoxClose} />
        )}
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
          top="calc(60vh)"
          transform={{ base: 'unset', md: 'translateY(-50px)' }}
          justifyContent="center"
          alignItems="center"
        >
          {actionBarItems.map((item, index) => (
            <Tooltip
              isDisabled={!item.isDisabled}
              placement="right"
              label={item.disabledTooltip}
              key={index}
            >
              <VStack
                minW="28px"
                cursor={
                  item.isDisabled || wiki === undefined
                    ? 'not-allowed'
                    : 'pointer'
                }
                color={actionIconColor(item)}
                onClick={
                  !item.isDisabled && wiki !== undefined
                    ? item.handleClick
                    : undefined
                }
              >
                <Icon fontSize={{ base: '16px', sm: '20px' }} as={item.icon} />
                <Text fontSize={{ base: '12px', sm: '14px' }}>
                  {item.label}
                </Text>
              </VStack>
            </Tooltip>
          ))}
        </Flex>
      </VStack>
    </>
  )
}

export default WikiActionBar
