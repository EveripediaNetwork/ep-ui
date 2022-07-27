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
} from 'react-share'
import TwitterIconColor from '@/components/Icons/twitterIconColor'
import FacebookIconColor from '@/components/Icons/facebookIconColor'
import RedditIconColor from '@/components/Icons/redditIconColor'
import TelegramIconColor from '@/components/Icons/telegramIconColor'
import WhatsappIconColor from '@/components/Icons/whatsappIconColor'
import LinkedinIconColor from '@/components/Icons/linkedinIconColor'

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
]

const ShareWikiModal = ({
  onClose = () => {},
  isOpen = false,
  ...rest
}: Partial<ModalProps>) => {
  const router = useRouter()
  const { hasCopied, onCopy } = useClipboard(
    `https://alpha.everipedia.org${router.asPath}`,
  )
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
              >{`https://alpha.everipedia.org${router.asPath}`}</Link>
            </Box>
          </Flex>

          <Flex fontWeight="bold" mt="3rem" flexDirection="column">
            <Text color="#1A202C" fontSize="sm" _dark={{ color: 'white' }}>
              Or share via:
            </Text>
            <Wrap mt="1rem">
              {SHARING_OPTIONS.map(item => {
                return (
                  <item.label
                    url={`https://alpha.everipedia.org${router.asPath}`}
                  >
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
