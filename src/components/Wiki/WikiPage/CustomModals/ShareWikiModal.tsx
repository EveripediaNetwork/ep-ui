import React, { useEffect } from 'react'
import {
  ModalProps,
  Flex,
  Text,
  Wrap,
  Icon,
  useClipboard,
  Input,
  InputGroup,
  InputRightAddon,
  Center,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {
  WhatsappShareButton,
  TwitterShareButton,
  FacebookShareButton,
  RedditShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  EmailShareButton,
} from 'react-share'
import TwitterIconColor from '@/components/Icons/twitterIconColor'
import FacebookIconColor from '@/components/Icons/facebookIconColor'
import RedditIconColor from '@/components/Icons/redditIconColor'
import TelegramIconColor from '@/components/Icons/telegramIconColor'
import WhatsappIconColor from '@/components/Icons/whatsappIconColor'
import LinkedinIconColor from '@/components/Icons/linkedinIconColor'
import EmailIconColor from '@/components/Icons/emailIconColor'
import config from '@/config'
import { Modal } from '@/components/Elements'
import { logEvent } from '@/utils/googleAnalytics'

const SHARING_OPTIONS = [
  {
    label: TwitterShareButton,
    icon: TwitterIconColor,
  },
  {
    label: FacebookShareButton,
    icon: FacebookIconColor,
  },
  {
    label: RedditShareButton,
    icon: RedditIconColor,
  },
  {
    label: TelegramShareButton,
    icon: TelegramIconColor,
  },
  {
    label: WhatsappShareButton,
    icon: WhatsappIconColor,
  },
  {
    label: LinkedinShareButton,
    icon: LinkedinIconColor,
  },
  {
    label: EmailShareButton,
    icon: EmailIconColor,
  },
]

const ShareWikiModal = ({
  onClose = () => {},
  isOpen = true,
}: Partial<ModalProps>) => {
  const router = useRouter()
  const url = `${config.publicDomain}${router.asPath}`
  const { hasCopied, onCopy } = useClipboard(url)

  useEffect(() => {
    logEvent({
      action: 'OPEN_SHARE_WIKI_MODAL',
      label: router.asPath.replace('/wiki/', ''),
      category: 'open_share_wiki_modal',
      value: 1,
    })
  }, [router.asPath])

  return (
    <Modal
      enableBottomCloseButton={false}
      isOpen={isOpen}
      onClose={onClose}
      title="Share"
      isCentered
    >
      <InputGroup>
        <Input
          p={6}
          whiteSpace="nowrap"
          value={url}
          color="#2D3748"
          _dark={{ color: '#b1b2b5' }}
        />
        <InputRightAddon p={6}>
          <Center w="50px">
            <Text
              textAlign="center"
              onClick={onCopy}
              color="brand.600"
              cursor="pointer"
            >
              {hasCopied ? 'Copied!' : 'Copy'}
            </Text>
          </Center>
        </InputRightAddon>
      </InputGroup>

      <Flex fontWeight="bold" mt="2rem" flexDirection="column">
        <Text color="#1A202C" fontSize="sm" _dark={{ color: 'white' }}>
          Or share via:
        </Text>
        <Wrap mt="1rem" spacing="5">
          {SHARING_OPTIONS.map(item => {
            return (
              <item.label url={url}>
                <Icon as={item.icon} fontSize="40px" />
              </item.label>
            )
          })}
        </Wrap>
      </Flex>
    </Modal>
  )
}

export default ShareWikiModal
