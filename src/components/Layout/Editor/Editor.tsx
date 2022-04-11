import React, { memo, useCallback, useEffect, useRef } from 'react'
import { Box, useColorMode } from '@chakra-ui/react'

// eslint-disable-next-line import/no-extraneous-dependencies
import '@toast-ui/editor/dist/toastui-editor.css'

import { Editor as ToastUIEditor } from '@toast-ui/react-editor'
import wikiLink from '@/editor-plugins/wikiLink'

type EditorType = {
  onChange: (value: string | undefined) => void
  markdown: string
}

const Editor = ({ onChange, markdown }: EditorType) => {
  const { colorMode } = useColorMode()
  const editorRef = useRef<ToastUIEditor>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const editorContainer = containerRef.current?.getElementsByClassName(
      'toastui-editor-defaultUI',
    )[0]
    if (editorContainer) {
      if (colorMode === 'dark')
        editorContainer.classList.add('toastui-editor-dark')
      else editorContainer.classList.remove('toastui-editor-dark')
    }
  }, [colorMode])

  const handleOnEditorChange = useCallback(() => {
    const currentMd = editorRef.current
      ?.getInstance()
      .getMarkdown()
      .toString() as string

    if (markdown !== currentMd) onChange(currentMd)
  }, [editorRef.current?.getInstance().getMarkdown(), markdown, onChange])

  useEffect(() => {
    if (markdown) editorRef.current?.getInstance().setMarkdown(markdown)
  }, [])

  return (
    <Box ref={containerRef} m={0} w="100%" h="100%">
      {markdown && (
        <ToastUIEditor
          plugins={[wikiLink]}
          height="100%"
          autofocus={false}
          theme={colorMode === 'dark' ? 'dark' : 'light'}
          initialValue={markdown}
          ref={editorRef}
          onChange={handleOnEditorChange}
        />
      )}
    </Box>
  )
}

export default memo(Editor)
