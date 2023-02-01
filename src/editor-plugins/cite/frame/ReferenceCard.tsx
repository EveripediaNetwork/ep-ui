import { store } from '@/store/store'
import { CiteReference, EditorContentOverride } from '@everipedia/iq-utils'
import { lettersToNum } from '@/utils/DataConversion/lettersToNum'
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Tag,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import React, { ChangeEvent, useEffect } from 'react'
import { RiArrowUpLine, RiEdit2Line } from 'react-icons/ri'
import { tuiEditorInputStyles } from './CiteFromNewURL'

interface ReferenceCardProps {
  handleExistingCiteSubmit: (reference: CiteReference, index: number) => void
  reference: CiteReference
  setEditingId: (id: string | null) => void
  editingId: string | null
  allReferences: CiteReference[]
  fetchReferences: () => void
}
export const ReferenceCard = ({
  handleExistingCiteSubmit,
  reference,
  setEditingId,
  editingId,
  allReferences,
  fetchReferences,
}: ReferenceCardProps) => {
  const [url, setUrl] = React.useState('')
  const [desc, setDesc] = React.useState<string>('')
  const [showRed, setShowRed] = React.useState(false)
  const isOpen = editingId === reference.id
  const index = allReferences.findIndex(ref => ref.id === reference.id) + 1

  useEffect(() => {
    setUrl(reference.url)
    setDesc(reference.description)
  }, [reference, editingId])

  const handleDeleteRefClick = () => {
    // =======================
    // Edit cite marks
    // =======================
    let newContent = store.getState().wiki.content

    // STEP 1: remove the reference to be deleted
    newContent = newContent.replace(
      new RegExp(
        // eslint-disable-next-line no-useless-escape
        `\[\\\\[[0-9]+\\]\]\\(#cite-id-${reference.id}\\)`,
        'g',
      ),
      '',
    )

    // STEP 2: update all the cite marks that are after the deleted reference with currIndex - 1
    for (let i = index + 1; i <= allReferences.length; i += 1) {
      newContent = newContent.replace(
        `[\\[${i}\\]](#cite-id-`,
        `[\\[${i - 1}\\]](#cite-id-`,
      )
    }
    store.dispatch({
      type: 'wiki/setContent',
      payload: EditorContentOverride + newContent,
    })

    // =======================
    // Delete from metadata
    // =======================

    const newReferences = allReferences.filter(ref => ref.id !== reference.id)
    store.dispatch({
      type: 'wiki/updateMetadata',
      payload: {
        id: 'references',
        value: JSON.stringify(newReferences),
      },
    })

    fetchReferences()

    // close the card
    setEditingId(null)
  }

  const handleSaveRefClick = () => {
    const newReferences = allReferences.map(ref =>
      ref.id === reference.id
        ? {
            id: ref.id,
            url,
            description: desc,
            timestamp: reference.url !== url ? Date.now() : reference.timestamp,
          }
        : ref,
    )
    store.dispatch({
      type: 'wiki/updateMetadata',
      payload: {
        id: 'references',
        value: JSON.stringify(newReferences),
      },
    })
    fetchReferences()
    setEditingId(null)
  }

  return (
    <Box w="100% !important" h="unset !important">
      <Flex
        w="100% !important"
        justify="space-between"
        align="center"
        borderLeftWidth="3px !important"
        borderColor={`hsl(${lettersToNum(reference.id)}, 80%, 80%) !important`}
        bgColor="#f7f9fc !important"
        _dark={{
          bgColor: '#2e3445 !important',
          color: 'white !important',
        }}
      >
        <Box
          flex="9"
          minH="50px"
          textAlign="start"
          p={8}
          onClick={() =>
            !editingId && handleExistingCiteSubmit(reference, index)
          }
          cursor={!editingId ? 'pointer' : 'unset'}
        >
          <HStack>
            <Text
              color={`hsl(${lettersToNum(reference.id)}, 50%, 40%) !important`}
              _dark={{
                color: `hsl(${lettersToNum(
                  reference.id,
                )}, 50%, 80%) !important`,
              }}
              textAlign="center"
              borderRadius="3px"
              fontSize="0.9em"
            >
              [{index}]
            </Text>
            <Text
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              maxW="220px"
              overflow="hidden"
            >
              {url}
            </Text>
            <HStack flexWrap="wrap" />
          </HStack>
          <Text
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
            maxW="250px !important"
            opacity={0.5}
            fontWeight="100 !important"
          >
            {desc}
          </Text>
        </Box>
        <VStack flex="1" mr="10px !important">
          <IconButton
            aria-label="edit-citation"
            icon={isOpen ? <RiArrowUpLine /> : <RiEdit2Line />}
            _dark={{ color: 'white', bgColor: '#464c61 !important' }}
            bgColor="#dde4f0 !important"
            h="30px !important"
            w="30px !important"
            borderRadius="4px"
            _hover={{
              filter: 'brightness(0.9)',
            }}
            onClick={() => {
              if (isOpen) {
                setEditingId(null)
              } else {
                setEditingId(reference.id)
              }
            }}
          />
        </VStack>
      </Flex>
      {isOpen && (
        <Box borderWidth="1px" p="10px !important" mt="10px">
          <form
            onSubmit={e => {
              e.preventDefault()
              if (url) {
                setUrl('')
                setDesc('')
              }
              handleSaveRefClick()
            }}
          >
            <FormControl>
              <FormLabel mt="0 !important">Enter URL</FormLabel>
              <Input
                mt={4}
                w="100% !important"
                type="url"
                required
                value={url}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> }
                }) => setUrl(e.target.value)}
                placeholder="Insert URL"
                id="citeUrlInput"
                h="30px"
                {...tuiEditorInputStyles}
              />
            </FormControl>
            <FormControl>
              <HStack mt="10px" align="center" justify="space-between">
                <FormLabel m="0 !important">Short Description</FormLabel>
                <Tag
                  display="block"
                  variant="outline"
                  px={4}
                  py={2}
                  borderRadius={3}
                  color="white"
                  bgColor={
                    // eslint-disable-next-line no-nested-ternary
                    showRed
                      ? '#d34c46 !important'
                      : (desc.length || '') > 25
                      ? '#579f6e !important'
                      : '#cea046 !important'
                  }
                >
                  {desc.length || 0}/60
                </Tag>
              </HStack>
              <Textarea
                mt="4px"
                w="100% !important"
                value={desc}
                required
                placeholder="Enter a short description about the reference linked"
                id="citeDescriptionInput"
                h="50px"
                resize="none"
                {...tuiEditorInputStyles}
                bgColor={showRed ? '#d406082a' : 'transparent'}
                outline={!showRed ? 'none' : '1px solid red !important'}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                  if (event.target.value.length <= 60)
                    setDesc(event.target.value)
                  else {
                    setShowRed(true)
                    setTimeout(() => setShowRed(false), 2000)
                  }
                }}
              />
            </FormControl>
            <ButtonGroup>
              <Button
                type="button"
                className="toastui-editor-ok-button"
                outline="0 !important"
                bgColor="#e36e6a !important"
                color="white !important"
                w="150px !important"
                mt="10px !important"
                onClick={handleDeleteRefClick}
              >
                Delete Citation
              </Button>
              <Button
                type="submit"
                className="toastui-editor-ok-button"
                color="white !important"
                bgColor="#4ba6f8 !important"
                outline="0 !important"
                w="100px !important"
                mt="10px !important"
              >
                Save
              </Button>
            </ButtonGroup>
          </form>
        </Box>
      )}
    </Box>
  )
}
