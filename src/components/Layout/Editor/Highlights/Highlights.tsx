import React, { ChangeEvent, useState } from 'react'
import {
  Flex,
  Text,
  Divider,
  useDisclosure,
  Badge,
  Input,
  Button,
} from '@chakra-ui/react'
import {
  RiFolder3Fill,
  RiGobletLine,
  RiTranslate2,
  RiSurveyFill,
} from 'react-icons/ri'

import { ImageInput, Dropzone } from '@/components/Elements'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { getWikiMetadataById } from '@/utils/getWikiFields'
import { Category, Content, Languages } from '@/types/Wiki'
import FlexRowContainer from './FlexRowContainer/FlexRowContainer'
import FlexRow from './FlexRow/FlexRow'
import HighlightsModal from './HighlightsModal/HighlightsModal'

const Highlights = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const currentWiki = useAppSelector(state => state.wiki)
  const [hideDropzone, setHideDropzone] = useState(false)
  const [hideImageInput, setHideImageInput] = useState(false)
  const dispatch = useAppDispatch()

  const handleDispatch = (object: Partial<Content>) =>
    dispatch({
      type: 'wiki/setCurrentWiki',
      payload: { content: { ...object } },
    })

  const handleSetImage = (value: string | ArrayBuffer | null) =>
    handleDispatch({
      images: [{ id: '', type: value }],
    })

  const handleDeleteImage = () => {
    handleDispatch({
      images: [],
    })
  }

  const dropZoneActions = {
    setImage: handleSetImage,
    setHideImageInput: setHideImageInput,
    deleteImage: handleDeleteImage
  }

  return (
    <Flex
      direction="column"
      minW="360px"
      w={['full', 'full', 'full', 400]}
      border="1px"
      borderColor="gray.200"
      borderRadius="7px"
      padding="15px"
    >
      <Flex justifyContent="center" alignItems="center" h="50px">
        <Input
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleDispatch({
              title: event.target.value,
            })
          }}
          value={currentWiki.content.title}
          placeholder="Title goes here"
        />
      </Flex>
      <br />
      {!hideDropzone && (
        <>
          <Dropzone
            dropZoneActions={dropZoneActions}
          />
          <br />
        </>
      )}
      {!hideImageInput && (
        <ImageInput
          setImage={handleSetImage}
          setHideDropzone={setHideDropzone}
          deleteImage={handleDeleteImage}
        />
      )}

      <Divider my="10px" />
      <Flex direction="column" justifyContent="center" alignItems="center">
        <FlexRowContainer>
          <FlexRow>
            <RiFolder3Fill /> <Text>Page Type</Text>
          </FlexRow>
          <Text>{getWikiMetadataById(currentWiki, 'page-type')?.value}</Text>
        </FlexRowContainer>
        <FlexRowContainer>
          <FlexRow>
            <RiGobletLine /> <Text>Adult Content</Text>
          </FlexRow>
          <Text>
            {getWikiMetadataById(currentWiki, 'adult-content')?.value === true
              ? 'Yes'
              : 'No'}
          </Text>
        </FlexRowContainer>
        <FlexRowContainer>
          <FlexRow>
            <RiTranslate2 /> <Text>Language</Text>
          </FlexRow>
          <Text>{Languages[currentWiki.language]}</Text>
        </FlexRowContainer>
        <Flex
          justifyContent="center"
          wrap="wrap"
          alignItems="center"
          direction="row"
        >
          <RiSurveyFill /> <Text ml="2">Categories</Text>
          <br />
          <Flex
            mt="2"
            direction="row"
            wrap="wrap"
            justify="space-evenly"
            w="full"
          >
            {currentWiki.content.categories.map((c: Category) => (
              <Badge variant="outline" m="1">
                {c.title}
              </Badge>
            ))}
          </Flex>
        </Flex>
        <Divider my="5" />
        <Flex
          w="full"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Button onClick={onOpen}>Edit</Button>
        </Flex>
      </Flex>
      <HighlightsModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  )
}

export default Highlights
