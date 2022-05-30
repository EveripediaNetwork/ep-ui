import React, { useContext, useState, memo } from 'react'
import {
  Flex,
  Text,
  useDisclosure,
  Badge,
  Button,
  Table,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react'
import { RiFolder3Line, RiSurveyLine, RiTwitterLine } from 'react-icons/ri'

import { ImageInput, Dropzone } from '@/components/Elements'
import { useAppSelector } from '@/store/hook'
import { getWikiMetadataById } from '@/utils/getWikiFields'
import { BaseCategory, Wiki, CommonMetaIds } from '@/types/Wiki'
import { ImageContext, ImageKey, ImageStateType } from '@/context/image.context'
import { shortenText } from '@/utils/shortenText'
import { useTranslation } from 'react-i18next'
import HighlightsModal from './HighlightsModal/HighlightsModal'
import SummaryInput from './SummaryInput'

type HightLightsType = {
  initialImage: string | undefined
  isToResetImage: boolean
}

const Highlights = ({ initialImage, isToResetImage }: HightLightsType) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { updateImageState } = useContext<ImageStateType>(ImageContext)
  const currentWiki = useAppSelector(state => state.wiki)
  const [hideDropzone, setHideDropzone] = useState(false)
  const [hideImageInput, setHideImageInput] = useState(false)

  const handleSetImage = (name: string, value: ArrayBuffer) => {
    // update isWikiBeingEdited
    updateImageState(ImageKey.IS_WIKI_BEING_EDITED, false)
    updateImageState(ImageKey.IMAGE, { id: name, type: value })
  }

  const handleDeleteImage = () =>
    updateImageState(ImageKey.IMAGE, { type: new ArrayBuffer(0), id: '' })

  const dropZoneActions = {
    setImage: handleSetImage,
    setHideImageInput,
    isToResetImage,
    deleteImage: handleDeleteImage,
    initialImage,
  }
  const { t } = useTranslation()
  return (
    <Flex
      direction="column"
      gap={5}
      w={{ base: 'full', xl: '400px' }}
      border="1px"
      borderColor="borderColor"
      borderRadius="7px"
      padding="15px"
    >
      <SummaryInput />
      {!hideDropzone && <Dropzone dropZoneActions={dropZoneActions} />}
      {!hideImageInput && (
        <ImageInput
          setImage={handleSetImage}
          setHideDropzone={setHideDropzone}
          deleteImage={handleDeleteImage}
        />
      )}
      <Flex direction="column" justifyContent="center" alignItems="center">
        <Table size="sm" variant="simple" mb={2}>
          <Tbody borderWidth="1px" overflow="hidden">
            <Tr>
              <Td color="linkColor" display="flex" gap={2}>
                <RiFolder3Line /> <Text>{`${t('pageTypeLabel')}`}</Text>
              </Td>
              <Td>
                {
                  getWikiMetadataById(
                    currentWiki as Wiki,
                    CommonMetaIds.PAGE_TYPE,
                  )?.value
                }
              </Td>
            </Tr>
            <Tr>
              <Td color="linkColor" display="flex" gap={2}>
                <RiSurveyLine /> <Text>{`${t('categoryTypeLabel')}`}</Text>
              </Td>
              <Td borderColor="inherit">
                {currentWiki.categories?.map((c: BaseCategory, i) => (
                  <Badge variant="outline" m={0} key={i}>
                    {c.title}
                  </Badge>
                ))}
              </Td>
            </Tr>
            <Tr>
              <Td
                color="linkColor"
                borderColor="transparent"
                display="flex"
                gap={2}
              >
                <RiTwitterLine />
                <Text whiteSpace="nowrap">{`${t('twitterProfileLabel')}`}</Text>
              </Td>
              <Td wordBreak="break-word">
                {shortenText(
                  getWikiMetadataById(
                    currentWiki as Wiki,
                    CommonMetaIds.TWITTER_PROFILE,
                  )?.value || '',
                  50,
                )}
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Flex
          w="full"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Button variant="outline" color="linkColor" onClick={onOpen}>
            Edit
          </Button>
        </Flex>
      </Flex>
      <HighlightsModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  )
}

export default memo(Highlights)
