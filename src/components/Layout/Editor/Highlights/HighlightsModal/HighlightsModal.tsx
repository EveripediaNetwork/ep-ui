import React, { useState } from 'react'
import {
  Divider,
  ModalProps,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  chakra,
  Flex,
  Text,
  Select,
  Stack,
  Input,
  ButtonGroup,
  IconButton,
  Tooltip,
} from '@chakra-ui/react'

import { useAppDispatch, useAppSelector } from '@/store/hook'
import { useGetCategoriesLinksQuery } from '@/services/categories'
import { RiSurveyLine } from 'react-icons/ri'
import { GiTwoCoins } from 'react-icons/gi'
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineLinkedin,
  AiOutlineYoutube,
} from 'react-icons/ai'
import { CommonMetaIds, MData } from '@/types/Wiki'
import Tags from '@/components/Layout/Editor/Highlights/HighlightsModal/Tags'
import { slugifyText } from '@/utils/slugify'

export const LINK_OPTIONS = [
  {
    id: CommonMetaIds.FACEBOOK_PROFILE,
    label: 'Facebook',
    icon: <AiOutlineFacebook />,
    tests: [/https:\/\/(www.)?facebook.com\/\w+/],
  },
  {
    id: CommonMetaIds.INSTAGRAM_PROFILE,
    label: 'Instagram',
    icon: <AiOutlineInstagram />,
    tests: [/https:\/\/(www.)?instagram.com\/\w+/],
  },
  {
    id: CommonMetaIds.TWITTER_PROFILE,
    label: 'Twitter',
    icon: <AiOutlineTwitter />,
    tests: [/https:\/\/(www.)?twitter.com\/\w+/],
  },
  {
    id: CommonMetaIds.LINKEDIN_PROFILE,
    label: 'Linkedin',
    icon: <AiOutlineLinkedin />,
    tests: [/https:\/\/(www.)?linkedin.com\/in\/\w+/],
  },
  {
    id: CommonMetaIds.YOUTUBE_PROFILE,
    label: 'Youtube',
    icon: <AiOutlineYoutube />,
    tests: [/https:\/\/(www.)?youtube.com\/\w+/],
  },
  {
    id: CommonMetaIds.COINGECKO_PROFILE,
    label: 'Coingecko',
    icon: <GiTwoCoins />,
    tests: [
      /https:\/\/(www.)?coinmarketcap.com\/currencies\/\w+/,
      /https:\/\/(www.)?coingecko.com\/en\/coins\//,
    ],
  },
]

const HighlightsModal = ({
  onClose = () => {},
  isOpen = false,
  ...rest
}: Partial<ModalProps>) => {
  const dispatch = useAppDispatch()
  const currentWiki = useAppSelector(state => state.wiki)
  const { data: categoryOptions } = useGetCategoriesLinksQuery()

  const [currentSocialMedia, setCurrentSocialMedia] = useState<string>()

  const [currentSocialLink, setCurrentSocialLink] = useState<string>()
  const [error, setError] = useState<string>('')

  const socialMedia = LINK_OPTIONS.filter(
    med => !!currentWiki.metadata.find((m: MData) => m.id === med.id)?.value,
  )

  const removeSocialMedia = (network: string) => {
    dispatch({
      type: 'wiki/updateMetadata',
      payload: {
        id: network,
        value: '',
      },
    })
  }

  const updateSocialMedia = (network?: string, link?: string) => {
    if (network && link) {
      dispatch({
        type: 'wiki/updateMetadata',
        payload: {
          id: network,
          value: link,
        },
      })
      setCurrentSocialMedia('')
      setCurrentSocialLink('')
    }
  }

  const upsertLinks = () => {
    if (currentSocialLink) {
      const link = LINK_OPTIONS.find(l => l.id === currentSocialMedia)
      const linkIsValid = link?.tests?.some(t => t.test(currentSocialLink))
      if (linkIsValid) {
        updateSocialMedia(currentSocialMedia, currentSocialLink)
        setError('')
      } else {
        setError(`Invalid ${link?.label} url format`)
      }
    }
  }

  const getWikiAttribute = (attr: string) => {
    const attribute = currentWiki.metadata.find(att => att.id === attr)?.value
    return {
      isDefined: !!attribute,
      value: attribute,
    }
  }

  const atttributeExists = (attr?: string) =>
    attr ? getWikiAttribute(attr).isDefined : false

  React.useEffect(() => {
    if (currentSocialMedia && atttributeExists(currentSocialMedia)) {
      setCurrentSocialLink(getWikiAttribute(currentSocialMedia).value)
    } else {
      setCurrentSocialLink('')
    }
    setError('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSocialMedia])

  return isOpen ? (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl" {...rest}>
      <ModalOverlay />
      <ModalContent
        _dark={{
          bg: 'gray.800',
        }}
      >
        <ModalHeader fontSize="lg" display="flex" alignItems="center">
          Edit Details
          <ModalCloseButton size="sm" my="auto" position="unset" ml="auto" />
        </ModalHeader>
        <chakra.div pl="6" pr="4">
          <Divider />
        </chakra.div>
        <ModalBody>
          <Stack spacing="4">
            {/* CATEGORY SELECTION */}
            <Flex gap="2.5" align="center">
              <RiSurveyLine />
              <Text whiteSpace="nowrap">Category</Text>
              <Select
                maxW="52"
                ml="auto"
                onChange={event => {
                  if (event.target.value) {
                    dispatch({
                      type: 'wiki/updateCategories',
                      payload: {
                        id: slugifyText(event.target.value),
                        title: event.target.value,
                      },
                    })
                  } else {
                    dispatch({
                      type: 'wiki/deleteCategories',
                    })
                  }
                }}
                value={currentWiki.categories[0]?.title}
                placeholder={
                  currentWiki.categories.length > 0
                    ? undefined
                    : 'Select Category'
                }
              >
                {categoryOptions?.map(o => (
                  <option key={o.id}>{o.id}</option>
                ))}
              </Select>
            </Flex>

            {/* TAGS ADDITIONS */}
            <Tags />

            {/* SOCIAL PROFILES */}
            <Stack
              rounded="md"
              borderWidth={1}
              _dark={{ borderColor: 'whiteAlpha.300' }}
              p={4}
              spacing="3"
            >
              <Text fontWeight="semibold">Social Profiles</Text>
              <Flex
                rounded="md"
                border="solid 1px"
                borderColor="gray.200"
                _dark={{ borderColor: 'whiteAlpha.200' }}
                p="2.5"
                gap="5"
                direction={{ base: 'column', sm: 'row' }}
              >
                <Select
                  minW="25"
                  value={currentSocialMedia}
                  onChange={event => {
                    const attr = event.target.value
                    setCurrentSocialMedia(attr)
                  }}
                  placeholder="Select Network"
                >
                  {LINK_OPTIONS.map(med => (
                    <chakra.option key={med.id} value={med.id}>
                      {med.label}
                    </chakra.option>
                  ))}
                </Select>
                <Input
                  placeholder="Enter link"
                  value={currentSocialLink}
                  onChange={event => {
                    setCurrentSocialLink(event.target.value)
                  }}
                  type="url"
                />
                <Button colorScheme="blue" mx="auto" onClick={upsertLinks}>
                  {atttributeExists(currentSocialMedia) ? 'Update' : 'Add'}
                </Button>
              </Flex>
              <chakra.span color="red.300">{error}</chakra.span>
              {socialMedia.length > 0 && (
                <ButtonGroup spacing="7" pt="3">
                  {socialMedia.map(network => (
                    <Tooltip label={network.label}>
                      <IconButton
                        key={network.id}
                        onClick={() => setCurrentSocialMedia(network.id)}
                        aria-label={network.label}
                        bg="gray.100"
                        color="black"
                        _hover={{
                          bg: 'gray.100',
                        }}
                        _dark={{
                          color: 'white',
                          bg: 'whiteAlpha.100',
                        }}
                        rounded="full"
                        icon={
                          <>
                            {network.icon}{' '}
                            <chakra.span
                              pos="absolute"
                              top="-1px"
                              right="-1px"
                              px={2}
                              py={1}
                              fontSize="xs"
                              fontWeight="bold"
                              lineHeight="none"
                              color="red.100"
                              transform="translate(50%,-50%)"
                              bg="red.400"
                              _hover={{ bg: 'red.500' }}
                              rounded="full"
                              onClick={() => removeSocialMedia(network.id)}
                            >
                              x
                            </chakra.span>
                          </>
                        }
                      />
                    </Tooltip>
                  ))}
                </ButtonGroup>
              )}
            </Stack>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mx="auto" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ) : null
}

export default HighlightsModal
