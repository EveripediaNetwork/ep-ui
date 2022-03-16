import React, { memo, useCallback, useEffect, useRef } from 'react'
import { Box, useColorMode } from '@chakra-ui/react'

// eslint-disable-next-line import/no-extraneous-dependencies
import '@toast-ui/editor/dist/toastui-editor.css'

import { Editor as ToastUIEditor } from '@toast-ui/react-editor'
import wikiLink from '@/editor-plugins/WikiLink'

type EditorType = {
  onChange: (value: string | undefined) => void
  initialValue: string
  markdown: string
}

const Editor = ({ onChange, initialValue, markdown }: EditorType) => {
  const { colorMode } = useColorMode()
  const editorRef = useRef<ToastUIEditor>(null)

  const callEditorMethod = useCallback(() => {
    editorRef.current?.getInstance().setMarkdown(markdown)
  }, [editorRef, markdown])

  useEffect(() => {
    callEditorMethod()
  }, [markdown, callEditorMethod])

  return (
    <Box m={0} w="100%" h="100%">
      <ToastUIEditor
        plugins={[wikiLink]}
        height="100%"
        theme={colorMode === 'dark' ? 'dark' : 'light'}
        initialValue={initialValue}
        ref={editorRef}
        onChange={() => {
          if (editorRef.current)
            onChange(editorRef.current.getInstance().getMarkdown())
        }}
      />
    </Box>
  )
}

export default memo(Editor)
