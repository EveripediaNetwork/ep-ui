import { store } from '@/store/store'
import { getWikiMetadataById } from '@/utils/getWikiFields'
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { PluginContext } from '@toast-ui/editor'
import React from 'react'

const CiteFrame = ({ editorContext }: { editorContext: PluginContext }) => {
  const { eventEmitter } = editorContext
  const urlInputRef = React.useRef<HTMLInputElement>(null)
  const descriptionInputRef = React.useRef<HTMLInputElement>(null)

  const handleCiteSubmit = () => {
    // access wiki data from wiki slice
    const references =
      getWikiMetadataById(store.getState().wiki, 'references')?.value || '[]'
    const referencesParsed = JSON.parse(references)
    const refCount = referencesParsed.length

    // dispatch new metadata to wiki slice
    store.dispatch({
      type: 'wiki/updateMetadata',
      payload: {
        id: 'references',
        value: JSON.stringify([
          ...referencesParsed,
          {
            url: urlInputRef.current?.value,
            description: descriptionInputRef.current?.value,
          },
        ]),
      },
    })
    eventEmitter.emit('command', 'cite', {
      urlId: `#cite-id-${refCount + 1}`,
      refNo: refCount + 1,
    })
  }
  return (
    <Box className="cite__frame">
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
  )
}

export default CiteFrame
