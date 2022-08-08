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
  Icon,
} from '@chakra-ui/react'

import { useAppDispatch, useAppSelector } from '@/store/hook'
import { useGetCategoriesLinksQuery } from '@/services/categories'

import { MData } from '@/types/Wiki'
import { slugifyText } from '@/utils/slugify'
import Tags from '@/components/Layout/Editor/Highlights/HighlightsModal/Tags'
import { LINK_OPTIONS } from '@/data/WikiLinks'

const HighlightsModal = ({
  onClose = () => {},
  isOpen = false,
  ...rest
}: Partial<ModalProps>) => {
  const dispatch = useAppDispatch()
  const currentWiki = useAppSelector(state => state.wiki)
  const { data: categoryOptions } = useGetCategoriesLinksQuery()

  const [currentLink, setCurrentLink] = useState<string>()
  const [currentLinkValue, setCurrentLinkValue] = useState<string>()
  const [error, setError] = useState<string>('')

  const linksWithValue = LINK_OPTIONS.filter(
    med => !!currentWiki.metadata.find((m: MData) => m.id === med.id)?.value,
  )
  const removeLink = (network: string) => {
    dispatch({
      type: 'wiki/updateMetadata',
      payload: {
        id: network,
        value: '',
      },
    })
  }

  const updateLink = (network?: string, link?: string) => {
    if (network && link) {
      dispatch({
        type: 'wiki/updateMetadata',
        payload: {
          id: network,
          value: link,
        },
      })
      setCurrentLink('')
      setCurrentLinkValue('')
    }
  }

  const upsertLinks = () => {
    if (currentLinkValue) {
      const link = LINK_OPTIONS.find(l => l.id === currentLink)
      const linkIsValid = link?.tests?.some(t => t.test(currentLinkValue))
      if (linkIsValid) {
        updateLink(currentLink, currentLinkValue)
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
    if (currentLink && atttributeExists(currentLink)) {
      setCurrentLinkValue(getWikiAttribute(currentLink).value)
    } else {
      setCurrentLinkValue('')
    }
    setError('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLink])
  if (!isOpen) return null
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl" {...rest}>
      <ModalOverlay />
      <ModalContent
        w="min(95vw, 600px)"
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
              <Text fontWeight="semibold">Category</Text>
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
                defaultValue={currentWiki.categories[0]?.id}
                placeholder={
                  currentWiki.categories.length > 0
                    ? undefined
                    : 'Select Category'
                }
              >
                {categoryOptions?.map(o => (
                  <option key={o.id} value={o.id}>
                    {o.title}
                  </option>
                ))}
              </Select>
            </Flex>

            {/* TAGS ADDITIONS */}
            <Tags />

            {/* LINKS */}
            <Stack
              rounded="md"
              borderWidth={1}
              _dark={{ borderColor: 'whiteAlpha.300' }}
              p={4}
              spacing="3"
            >
              <Text fontWeight="semibold">Links</Text>
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
                  value={currentLink}
                  onChange={event => {
                    const attr = event.target.value
                    setCurrentLink(attr)
                  }}
                  placeholder="Select option"
                >
                  {LINK_OPTIONS.map(med => (
                    <chakra.option key={med.id} value={med.id}>
                      {med.label}
                    </chakra.option>
                  ))}
                </Select>
                <Input
                  placeholder="Enter link"
                  value={currentLinkValue}
                  onChange={event => {
                    setCurrentLinkValue(event.target.value)
                  }}
                  type="url"
                />
                <Button colorScheme="blue" mx="auto" onClick={upsertLinks}>
                  {atttributeExists(currentLink) ? 'Update' : 'Add'}
                </Button>
              </Flex>
              <chakra.span color="red.300">{error}</chakra.span>
              {linksWithValue.length > 0 && (
                <ButtonGroup gap="4" flexWrap="wrap" pt="3">
                  {linksWithValue.map(network => (
                    <Tooltip label={network.label}>
                      <IconButton
                        key={network.id}
                        onClick={() => setCurrentLink(network.id)}
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
                            <Icon as={network.icon} />
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
                              onClick={() => removeLink(network.id)}
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
  )
}

export default HighlightsModal
