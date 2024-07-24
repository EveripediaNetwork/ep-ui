import { WIKI_METADATA_VALUE_LIMIT } from '@/data/Constants'
import { LINK_OPTIONS, LinkType } from '@/data/WikiLinks'
import { useAppDispatch } from '@/store/hook'
import {
  Button,
  Center,
  HStack,
  Icon,
  Input,
  Stack,
  Text,
  Wrap,
  chakra,
  SimpleGrid,
} from '@chakra-ui/react'
import { MData, Wiki } from '@everipedia/iq-utils'
import React, { useState } from 'react'
import { RiCloseLine } from 'react-icons/ri'
import { useTranslation } from 'next-i18next'
import ComboBoxPopup from './ComboBoxPopup'

const LinksInput = ({ wiki }: { wiki: Wiki }) => {
  const [currentLink, setCurrentLink] = useState<string>()
  const [currentLinkValue, setCurrentLinkValue] = useState<string>()
  const [error, setError] = useState<string>('')

  const dispatch = useAppDispatch()
  const { t } = useTranslation('wiki')

  const getWikiAttribute = (attr: string) => {
    const attribute = wiki.metadata.find((att) => att.id === attr)?.value
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
      const link = LINK_OPTIONS.find((l) => l.id === currentLink)

      if (currentLinkValue.length > WIKI_METADATA_VALUE_LIMIT) {
        setError(`Link exceeds limit of ${WIKI_METADATA_VALUE_LIMIT}.`)
        return
      }

      const linkIsValid = link?.tests?.some((t) => t.test(currentLinkValue))

      if (linkIsValid) {
        updateLink(currentLink, currentLinkValue)
        setError('')
      } else {
        setError(`Invalid ${link?.label} url format`)
      }
    }
  }

  const linksWithValue = LINK_OPTIONS.filter((med) => {
    return !!wiki.metadata.find((m: MData) => m.id === med.id)?.value
  })

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

  const socialOptions = LINK_OPTIONS.filter(
    (option) => option.type === LinkType.SOCIAL,
  )
  const explorerOptions = LINK_OPTIONS.filter(
    (option) => option.type === LinkType.EXPLORER,
  )
  const otherOptions = LINK_OPTIONS.filter(
    (option) =>
      option.type !== LinkType.SOCIAL && option.type !== LinkType.EXPLORER,
  )

  const groupedOptions = [
    { title: 'Social', options: socialOptions },
    { title: 'Explorer', options: explorerOptions },
    { title: 'Other', options: otherOptions },
  ]

  return (
    <Stack rounded="md" _dark={{ borderColor: 'whiteAlpha.300' }} spacing="2">
      <Text fontWeight="semibold">{t('links')}</Text>
      <SimpleGrid
        borderColor="gray.200"
        _dark={{ borderColor: 'whiteAlpha.200' }}
        gap="2"
        gridTemplateColumns={{ base: '1.2fr 2fr', md: '1.3fr 1.9fr 0.8fr' }}
      >
        <ComboBoxPopup
          groupedOptions={groupedOptions}
          placeholder={t('selectOption')}
          onSelect={(selected) => setCurrentLink(selected)}
        />
        <Input
          disabled={!currentLink}
          h="40px"
          rounded="md"
          placeholder={t('enterLink')}
          value={currentLinkValue}
          onChange={(event) => {
            setCurrentLinkValue(event.target.value)
          }}
          type="url"
        />
        <Button
          disabled={!currentLink}
          rounded="md"
          onClick={insertLinks}
          minW={{ base: 'full', md: '110px' }}
          h="40px"
          gridColumn={{ base: 'span 2', md: 'unset' }}
        >
          {atttributeExists(currentLink) ? t('update') : t('add')}
        </Button>
      </SimpleGrid>
      <chakra.span color="red.300">{error}</chakra.span>
      {linksWithValue.length > 0 && (
        <Wrap gap="1">
          {linksWithValue.map((network) => (
            <Button
              key={network.id}
              display="flex"
              gap={2}
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
              rounded="md"
              size="xs"
              px={2}
            >
              <HStack>
                <Icon as={network.icon} />{' '}
                <Text fontWeight="normal" fontSize="xs">
                  {network.label}
                </Text>
              </HStack>
              <Center
                boxSize={4}
                fontSize="xs"
                fontWeight="bold"
                lineHeight="none"
                color="red.100"
                bg="red.400"
                _hover={{ bg: 'red.500' }}
                rounded="full"
                onClick={() => removeLink(network.id)}
              >
                <Icon as={RiCloseLine} />
              </Center>
            </Button>
          ))}
        </Wrap>
      )}
    </Stack>
  )
}

export default LinksInput
