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
} from '@chakra-ui/react'

import { useAppDispatch, useAppSelector } from '@/store/hook'
import { useGetCategoriesLinksQuery } from '@/services/categories'
import { RiFolder3Line, RiSurveyLine } from 'react-icons/ri'
import { GiTwoCoins } from 'react-icons/gi'
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineLinkedin,
  AiOutlineYoutube,
} from 'react-icons/ai'
import { CommonMetaIds, MData, PageTypeName } from '@/types/Wiki'
import Tags from '@/components/Layout/Editor/Highlights/HighlightsModal/Tags'
import { slugifyText } from '@/utils/slugify'

export const SOCIAL_MEDIA_OPTIONS = [
  {
    id: CommonMetaIds.FACEBOOK_PROFILE,
    label: 'Facebook',
    icon: <AiOutlineFacebook />,
  },
  {
    id: CommonMetaIds.INSTAGRAM_PROFILE,
    label: 'Instagram',
    icon: <AiOutlineInstagram />,
  },
  {
    id: CommonMetaIds.TWITTER_PROFILE,
    label: 'Twitter',
    icon: <AiOutlineTwitter />,
  },
  {
    id: CommonMetaIds.LINKEDIN_PROFILE,
    label: 'Linkedin',
    icon: <AiOutlineLinkedin />,
  },
  {
    id: CommonMetaIds.YOUTUBE_PROFILE,
    label: 'Youtube',
    icon: <AiOutlineYoutube />,
  },
  {
    id: CommonMetaIds.COINGECKO_PROFILE,
    label: 'Coingecko',
    icon: <GiTwoCoins />,
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

  const socialMedia = SOCIAL_MEDIA_OPTIONS.filter(
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

  const addSocialMedia = () => {
    updateSocialMedia(currentSocialMedia, currentSocialLink)
  }

  const getWikiAttribute = (attr: string) => {
    const attribute = currentWiki.metadata.find(att => att.id === attr)?.value
    return {
      isDefined: !!attribute,
      value: attribute,
    }
  }

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
            {/* PAGE TYPE SELECTION  */}
            <Flex gap="2.5" align="center" mt={1}>
              <RiFolder3Line /> <Text whiteSpace="nowrap">Page Type</Text>
              <Select
                maxW="52"
                ml="auto"
                onChange={event => {
                  if (event.target.value)
                    dispatch({
                      type: 'wiki/updateMetadata',
                      payload: {
                        id: CommonMetaIds.PAGE_TYPE,
                        value: event.target.value,
                      },
                    })
                }}
                value={String(
                  currentWiki.metadata.find(
                    (m: MData) => m.id === CommonMetaIds.PAGE_TYPE,
                  )?.value,
                )}
                placeholder={
                  getWikiAttribute('page-type').isDefined
                    ? ''
                    : 'Select Page Type'
                }
              >
                {Object.values(PageTypeName).map(o => (
                  <option key={o}>{o}</option>
                ))}
              </Select>
            </Flex>
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
                    setCurrentSocialMedia(event.target.value)
                  }}
                  placeholder="Select Network"
                >
                  {SOCIAL_MEDIA_OPTIONS.filter(
                    med => !socialMedia.includes(med),
                  ).map(med => (
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
                <Button colorScheme="blue" mx="auto" onClick={addSocialMedia}>
                  Add
                </Button>
              </Flex>
              {socialMedia.length > 0 && (
                <ButtonGroup spacing="7" pt="3">
                  {socialMedia.map(network => (
                    <IconButton
                      key={network.id}
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
