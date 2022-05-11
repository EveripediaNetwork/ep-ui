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
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineLinkedin,
  AiOutlineYoutube,
} from 'react-icons/ai'
import { CommonMetaIds, MData, PageTypeName } from '@/types/Wiki'
import slugify from 'slugify'
import Tags from '@/components/Layout/Editor/Highlights/HighlightsModal/Tags'

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

const SOCIAL_MEDIA_OPTIONS = [
  {
    id: 'facebook',
    label: 'Facebook',
    icon: <AiOutlineFacebook />,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: <AiOutlineInstagram />,
  },
  {
    id: 'twitter',
    label: 'Twitter',
    icon: <AiOutlineTwitter />,
  },
  {
    id: 'linkedin',
    label: 'Linkedin',
    icon: <AiOutlineLinkedin />,
  },
  {
    id: 'youtube',
    label: 'Youtube',
    icon: <AiOutlineYoutube />,
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
  const [currentUserName, setCurrentUserName] = useState<string>()
  const [socialMedia, setSocialMedia] = useState<Record<string, string>>({})

  type SocialMediaOption = ArrayElement<typeof SOCIAL_MEDIA_OPTIONS>
  const findSocialMedia = (network: string): SocialMediaOption =>
    SOCIAL_MEDIA_OPTIONS.find(med => med.id === network) ||
    ({} as SocialMediaOption)

  const removeSocialMedia = (network: string) => {
    setSocialMedia(prev =>
      Object.entries(prev)
        .filter(med => med[0] !== network)
        .reduce(
          (acc, [med, username]) => ({ ...acc, [med]: username }),
          {} as Record<string, string>,
        ),
    )
  }

  const updateSocialMedia = (network?: string, username?: string) => {
    if (network && username) {
      setSocialMedia(prev => ({
        ...prev,
        [network]: username,
      }))
      setCurrentSocialMedia('')
      setCurrentUserName('')
    }
  }

  const addSocialMedia = () => {
    updateSocialMedia(currentSocialMedia, currentUserName)
  }

  const getWikiAttribute = (attr: string) => {
    const attribute = currentWiki.metadata.find(att => att.id === attr)?.value
    return {
      isDefined: !!attribute,
      value: attribute,
    }
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl" {...rest}>
      <ModalOverlay />
      <ModalContent bg="gray.800">
        <ModalHeader fontSize="lg" display="flex" alignItems="center">
          Edit Details
          <ModalCloseButton size="sm" my="auto" position="unset" ml="auto" />
        </ModalHeader>
        <chakra.div pl="6" pr="4">
          <Divider />
        </chakra.div>
        <ModalBody>
          <Stack spacing="12">
            <Stack spacing="6">
              <Flex gap="2.5" align="center">
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
                          id: slugify(event.target.value.toLowerCase()),
                          title: event.target.value,
                        },
                      })
                    } else {
                      dispatch({
                        type: 'wiki/deleteCategories',
                      })
                    }
                  }}
                  placeholder="Select Category"
                >
                  {categoryOptions?.map(o => (
                    <option key={o.title}>{o.title}</option>
                  ))}
                </Select>
              </Flex>
            </Stack>
            <Divider />
            <Stack
              rounded="md"
              border="solid 1px"
              borderColor="gray.300"
              _dark={{ borderColor: 'whiteAlpha.300' }}
              p="5"
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
                    med => !Object.keys(socialMedia).includes(med.id),
                  ).map(med => (
                    <chakra.option key={med.id} value={med.id}>
                      {med.label}
                    </chakra.option>
                  ))}
                </Select>
                <Input
                  placeholder="Enter username"
                  value={currentUserName}
                  onChange={event => {
                    setCurrentUserName(event.target.value)
                  }}
                />
                <Button colorScheme="blue" mx="auto" onClick={addSocialMedia}>
                  Add
                </Button>
              </Flex>
              <ButtonGroup spacing="7" pt="3">
                {Object.keys(socialMedia).map(network => (
                  <IconButton
                    aria-label={network}
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
                        {findSocialMedia(network).icon}{' '}
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
                          onClick={() => removeSocialMedia(network)}
                        >
                          x
                        </chakra.span>
                      </>
                    }
                  />
                ))}
              </ButtonGroup>
              {/* ========== Twitter profile ========== */}
              {/* <FlexRow>
          <RiTwitterLine /> <Text>Twitter profile</Text>
        </FlexRow>
        <Input
          onChange={event => {
            if (event.target.value)
              dispatch({
                type: 'wiki/updateMetadata',
                payload: {
                  id: CommonMetaIds.TWITTER_PROFILE,
                  value: event.target.value,
                },
              })
          }}
          placeholder={
            String(
              currentWiki.metadata.find(
                (m: MData) => m.id === CommonMetaIds.TWITTER_PROFILE,
              )?.value,
            )
              ? String(
                  currentWiki.metadata.find(
                    (m: MData) => m.id === CommonMetaIds.TWITTER_PROFILE,
                  )?.value,
                )
              : 'Your Twitter Handle'
          }
        /> */}
            </Stack>
            <Tags />
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mx="auto" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default HighlightsModal
