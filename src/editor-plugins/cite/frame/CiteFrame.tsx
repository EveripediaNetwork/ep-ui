import { store } from '@/store/store'
import { getWikiMetadataById } from '@/utils/getWikiFields'
import { hashToNum } from '@/utils/hashToNum'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react'
import { PluginContext } from '@toast-ui/editor'
import React, { useEffect } from 'react'

const FrameTab = ({ children }: { children: React.ReactNode }) => (
  <Tab
    border="unset"
    h="unset !important"
    borderBottom="1px solid #dbdde5 !important"
    borderRadius="0 !important"
    sx={{
      '&[aria-selected="true"]': {
        borderBottom: '2px solid #4ba6f8 !important',
        color: '#4ba6f8 !important',
      },
    }}
    _dark={{
      color: 'white !important',
      borderBottom: '1px solid #2b2f37 !important',
      '&[aria-selected="true"]': {
        bgColor: '#2e3445 !important',
        color: '#4ba6f8 !important',
        borderBottom: '2px solid #4ba6f8 !important',
      },
      bgColor: '#212533',
    }}
    p={8}
  >
    {children}
  </Tab>
)

interface Reference {
  id: number
  url: string
  description: string
}

const CiteFrame = ({ editorContext }: { editorContext: PluginContext }) => {
  const { eventEmitter } = editorContext
  const urlInputRef = React.useRef<HTMLInputElement>(null)
  const descriptionInputRef = React.useRef<HTMLInputElement>(null)
  const [references, setReferences] = React.useState<Reference[]>([])
  const [refCount, setRefCount] = React.useState(0)

  const fetchReferences = () => {
    const fetchedReferences =
      getWikiMetadataById(store.getState().wiki, 'references')?.value || '[]'
    const referencesParsed = JSON.parse(fetchedReferences)
    setReferences(referencesParsed)
    setRefCount(referencesParsed.length)
  }

  useEffect(() => {
    fetchReferences()
  }, [])

  const handleCiteSubmit = () => {
    // Dispatch new metadata to wiki slice
    store.dispatch({
      type: 'wiki/updateMetadata',
      payload: {
        id: 'references',
        value: JSON.stringify([
          ...references,
          {
            id: refCount + 1,
            url: urlInputRef.current?.value,
            description: descriptionInputRef.current?.value,
          },
        ]),
      },
    })

    // Clear input fields
    if (urlInputRef && descriptionInputRef) {
      if (urlInputRef.current && descriptionInputRef.current) {
        urlInputRef.current.value = ''
        descriptionInputRef.current.value = ''
      }
    }

    // Add CiteMarker to editor
    eventEmitter.emit('command', 'cite', {
      urlId: `#cite-id-${refCount + 1}`,
      refNo: refCount + 1,
    })
    fetchReferences()
  }

  const handleExistingCiteSubmit = (ref: Reference) => {
    // Add CiteMarker to editor
    eventEmitter.emit('command', 'cite', {
      urlId: `#cite-id-${ref.id}`,
      refNo: ref.id,
    })
  }

  return (
    <Tabs>
      <TabList mt={-8} mb={8}>
        <FrameTab>New URL</FrameTab>
        <FrameTab>Add from Existing</FrameTab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Box>
            <FormControl>
              <FormLabel mt="0 !important">Enter URL</FormLabel>
              <Input
                mt={4}
                w="100% !important"
                ref={urlInputRef}
                type="text"
                placeholder="Insert URL"
                id="citeUrlInput"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Enter Description</FormLabel>
              <Input
                mt={4}
                w="100% !important"
                ref={descriptionInputRef}
                type="text"
                placeholder="Insert Description"
                id="citeDescriptionInput"
              />
            </FormControl>
            <Button
              type="button"
              className="toastui-editor-ok-button"
              onClick={handleCiteSubmit}
              outline="0 !important"
              w="100% !important"
              mt="20px !important"
            >
              Cite
            </Button>
          </Box>
        </TabPanel>
        <TabPanel>
          <VStack spacing={8}>
            {refCount > 0 ? (
              references.map((ref, index) => (
                <Button
                  key={index}
                  w="100% !important"
                  onClick={() => handleExistingCiteSubmit(ref)}
                  h="unset !important"
                >
                  <Box
                    textAlign="start"
                    w="100% !important"
                    p={8}
                    bgColor="#aaaaaa2a !important"
                    borderLeftWidth="3px !important"
                    borderColor={`hsl(${hashToNum(
                      ref.url + ref.description,
                    )}, 80%, 80%) !important`}
                  >
                    <Text>{ref.url}</Text>
                    <Text
                      textOverflow="ellipsis"
                      maxW="100%"
                      overflow="hidden"
                      opacity={0.5}
                      fontWeight="100 !important"
                    >
                      {ref.description}
                    </Text>
                  </Box>
                </Button>
              ))
            ) : (
              <Box
                p="10px !important"
                w="100%"
                textAlign="center"
                fontSize="14px"
              >
                <Text
                  p="10px !important"
                  w="100%"
                  textAlign="center"
                  fontSize="14px"
                >
                  This Page has no Citations
                </Text>
                <Text
                  fontSize="12px"
                  fontWeight="100 !important"
                  opacity={0.5}
                  w="60%"
                  mx="auto"
                >
                  Add a Citation to this Page by clicking the New URL tab at the
                  top
                </Text>
              </Box>
            )}
          </VStack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default CiteFrame
