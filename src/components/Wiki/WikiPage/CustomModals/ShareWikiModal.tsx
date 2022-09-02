import React from 'react'
import {
  ModalProps,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Text,
  Box,
  Link,
  Wrap,
  Icon,
  useClipboard,
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
  isOpen = false,
  ...rest
}: Partial<ModalProps>) => {
  const router = useRouter()
  const url = `${config.publicDomain}${router.asPath}`
  const { hasCopied, onCopy } = useClipboard(url)
  if (!isOpen) return null
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl" {...rest}>
      <ModalOverlay />
      <ModalContent
        _dark={{
          bg: 'gray.800',
        }}
      >
        <ModalBody py="3rem" px="2rem">
          <Flex
            justify="space-between"
            align="center"
            border="2px solid"
            borderColor="tetiaryGray"
            p="1rem"
            borderRadius="0.4rem"
          >
            <Text onClick={onCopy} color="brand.600" cursor="pointer">
              {hasCopied ? 'Copied!' : 'Copy url'}
            </Text>
            <Box
              overflowX="hidden"
              w="80%"
              p="0.5rem"
              bg="brand.150"
              _dark={{ bg: '#232934' }}
            >
              <Link
                whiteSpace="nowrap"
                href={router.asPath}
                color="#2D3748"
                _dark={{ color: '#b1b2b5' }}
              >
                {url}
              </Link>
            </Box>
          </Flex>

          <Flex fontWeight="bold" mt="3rem" flexDirection="column">
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
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ShareWikiModal
