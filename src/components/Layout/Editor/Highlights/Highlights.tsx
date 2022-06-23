import React, { useState, memo } from 'react'
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
  Box,
  VStack,
} from '@chakra-ui/react'
import { RiFolder3Line, RiSurveyLine, RiFilmLine } from 'react-icons/ri'

import { ImageInput, Dropzone } from '@/components/Elements'
import { useAppSelector } from '@/store/hook'
import { getWikiMetadataById } from '@/utils/getWikiFields'
import { BaseCategory, Wiki, CommonMetaIds } from '@/types/Wiki'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { saveImage } from '@/utils/create-wiki'
import HighlightsModal from './HighlightsModal/HighlightsModal'
import MediaModal from './MediaModal/MediaModal'
import SummaryInput from './SummaryInput'

type HightLightsType = {
  initialImage: string | undefined
  isToResetImage: boolean
}

const Highlights = ({ initialImage, isToResetImage }: HightLightsType) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()
  const {
    isOpen: isMediaOpen,
    onOpen: mediaOpen,
    onClose: mediaClose,
  } = useDisclosure()
  const currentWiki = useAppSelector(state => state.wiki)
  const [hideDropzone, setHideDropzone] = useState(false)
  const [hideImageInput, setHideImageInput] = useState(false)

  const handleSetImage = async (_: string, value: ArrayBuffer) => {
    // upload image to ipfs
    const IPFSHash = await saveImage({ type: value, id: '' })

    // update image state
    dispatch({
      type: 'wiki/addWikiImageIPFS',
      payload: IPFSHash,
    })
  }

  const handleDeleteImage = () =>
    dispatch({
      type: 'wiki/deleteWikiImages',
    })

  const dropZoneActions = {
    setImage: handleSetImage,
    setHideImageInput,
    isToResetImage,
    deleteImage: handleDeleteImage,
    initialImage,
    showFetchedImage: true,
    textType: 'main image',
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
      h="auto"
    >
      <SummaryInput />
      {!hideDropzone && <Dropzone dropZoneActions={dropZoneActions} />}
      {!hideImageInput && (
        <ImageInput
          setImage={handleSetImage}
          setHideDropzone={setHideDropzone}
          deleteImage={handleDeleteImage}
          showFetchedImage
        />
      )}
      <VStack align="start" spacing={2}>
        <Flex gap={2} color="linkColor">
          <Box mt={1}>
            <RiFilmLine size="16" />
          </Box>
          <Text>Media</Text>
        </Flex>
        <Button onClick={mediaOpen} mt="2" size="sm">
          <Text fontSize="sm">Add new image or video</Text>
        </Button>
      </VStack>
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
      <MediaModal isOpen={isMediaOpen} onClose={mediaClose} />
    </Flex>
  )
}

export default memo(Highlights)
