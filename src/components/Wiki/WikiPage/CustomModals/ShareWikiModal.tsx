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
  Image,
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
import Link from '@/components/Elements/LinkElements/Link'
import { useTranslation } from 'next-i18next'

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
  {
    label: 'lenster',
  },
]

const ShareWikiModal = ({
  onClose = () => {},
  isOpen = true,
}: Partial<ModalProps>) => {
  const { t } = useTranslation('common')
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
      title={t('share')}
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
              {hasCopied ? t('copied') : t('copy')}
            </Text>
          </Center>
        </InputRightAddon>
      </InputGroup>

      <Flex fontWeight="bold" mt="2rem" flexDirection="column">
        <Text color="#1A202C" fontSize="sm" _dark={{ color: 'white' }}>
          {t('orShare')}
        </Text>
        <Wrap mt="1rem" spacing="3">
          {SHARING_OPTIONS.map((item) => {
            return (
              <>
                {typeof item.label !== 'string' ? (
                  <item.label url={url}>
                    <Icon as={item.icon} fontSize="38px" />
                  </item.label>
                ) : (
                  <Link
                    href={`https://lenster.xyz/?text=Checkout%20this%20article%20on%20the%20World’s%20Largest%20Blockchain%20Encyclopedia,%20IQ.wiki&url=${url}`}
                    rel="nofollow"
                    target="_blank"
                    onClick={() =>
                      logEvent({
                        action: 'SHARING_WIKI_ON_LENS',
                        label: url,
                        category: 'sharing_wiki_on_lens',
                        value: 1,
                      })
                    }
                  >
                    <Image
                      alt="Lenster"
                      src="/images/icons/lenster.svg"
                      h="38px"
                      w="38px"
                    />
                  </Link>
                )}
              </>
            )
          })}
        </Wrap>
      </Flex>
    </Modal>
  )
}

export default ShareWikiModal
