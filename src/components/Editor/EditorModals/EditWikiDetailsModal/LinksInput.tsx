import { WIKI_METADATA_VALUE_LIMIT } from '@/data/Constants'
import { LINK_OPTIONS, LinkType } from '@/data/WikiLinks'
import { useAppDispatch } from '@/store/hook'
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Icon,
  IconButton,
  Input,
  Select,
  Stack,
  Text,
  Tooltip,
  chakra,
} from '@chakra-ui/react'
import { MData, Wiki } from '@everipedia/iq-utils'
import React, { useState } from 'react'

const LinksInput = ({ wiki }: { wiki: Wiki }) => {
  const [currentLink, setCurrentLink] = useState<string>()
  const [currentLinkValue, setCurrentLinkValue] = useState<string>()
  const [error, setError] = useState<string>('')
  const dispatch = useAppDispatch()

  const getWikiAttribute = (attr: string) => {
    const attribute = wiki.metadata.find(att => att.id === attr)?.value
    return {
      isDefined: !!attribute,
      value: attribute,
    }
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

  const insertLinks = () => {
    if (currentLinkValue) {
      const link = LINK_OPTIONS.find(l => l.id === currentLink)

      if (currentLinkValue.length > WIKI_METADATA_VALUE_LIMIT) {
        setError(`Link exceeds limit of ${WIKI_METADATA_VALUE_LIMIT}.`)
        return
      }

      const linkIsValid = link?.tests?.some(t => t.test(currentLinkValue))

      if (linkIsValid) {
        updateLink(currentLink, currentLinkValue)
        setError('')
      } else {
        setError(`Invalid ${link?.label} url format`)
      }
    }
  }

  const linksWithValue = LINK_OPTIONS.filter(
    med => !!wiki.metadata.find((m: MData) => m.id === med.id)?.value,
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

  const atttributeExists = (attr?: string) =>
    attr ? getWikiAttribute(attr).isDefined : false

  React.useEffect(() => {
    if (currentLink && atttributeExists(currentLink))
      setCurrentLinkValue(getWikiAttribute(currentLink).value)
    else setCurrentLinkValue('')
    setError('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLink])

  return (
    <Stack rounded="md" _dark={{ borderColor: 'whiteAlpha.300' }} spacing="3">
      <Text fontWeight="semibold">Links</Text>
      <Box borderWidth={1} rounded="md" p="2.5">
        <Flex
          borderColor="gray.200"
          _dark={{ borderColor: 'whiteAlpha.200' }}
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
            <optgroup label="Socials">
              {LINK_OPTIONS.filter(
                option => option.type === LinkType.SOCIAL,
              ).map(med => (
                <chakra.option key={med.id} value={med.id}>
                  {med.label}
                </chakra.option>
              ))}
            </optgroup>
            <optgroup label="Explorers">
              {LINK_OPTIONS.filter(
                option => option.type === LinkType.EXPLORER,
              ).map(med => (
                <chakra.option key={med.id} value={med.id}>
                  {med.label}
                </chakra.option>
              ))}
            </optgroup>
            <optgroup label="Other">
              {LINK_OPTIONS.filter(
                option =>
                  option.type !== LinkType.SOCIAL &&
                  option.type !== LinkType.EXPLORER,
              ).map(med => (
                <chakra.option key={med.id} value={med.id}>
                  {med.label}
                </chakra.option>
              ))}
            </optgroup>
          </Select>
          <Input
            placeholder="Enter link"
            value={currentLinkValue}
            onChange={event => {
              setCurrentLinkValue(event.target.value)
            }}
            type="url"
          />
          <Button colorScheme="blue" mx="auto" onClick={insertLinks}>
            {atttributeExists(currentLink) ? 'Update' : 'Add'}
          </Button>
        </Flex>
        <chakra.span color="red.300">{error}</chakra.span>
        {linksWithValue.length > 0 && (
          <ButtonGroup gap="2" flexWrap="wrap" pt="4">
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
                      <Center
                        pos="absolute"
                        top="5px"
                        right="5px"
                        boxSize={4}
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
                      </Center>
                    </>
                  }
                />
              </Tooltip>
            ))}
          </ButtonGroup>
        )}
      </Box>
    </Stack>
  )
}

export default LinksInput
