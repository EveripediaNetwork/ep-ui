import React, { memo, useRef } from 'react'
import { Box, useColorMode } from '@chakra-ui/react'
// eslint-disable-next-line import/no-extraneous-dependencies
import '@toast-ui/editor/dist/toastui-editor.css'

import { Editor as ToastUIEditor } from '@toast-ui/react-editor'

type EditorType = {
  onChange: (value: string | undefined) => void
  initialValue: string
}

const Editor = ({ onChange, initialValue }: EditorType) => {
  const { colorMode } = useColorMode()
  const editorRef = useRef<ToastUIEditor>(null)

  return (
    <Box m={0} w="100%" h="100%">
      <ToastUIEditor
        height="100%"
        theme={colorMode === 'dark' ? 'dark' : 'light'}
        initialValue={initialValue}
        ref={editorRef}
        onChange={() =>
          onChange(editorRef?.current?.getInstance().getMarkdown())
        }
      />
    </Box>
  )
}

export default memo(Editor)
