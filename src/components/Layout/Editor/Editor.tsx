import React, { memo, useCallback, useEffect, useRef } from 'react'
import { Box, useColorMode } from '@chakra-ui/react'

// eslint-disable-next-line import/no-extraneous-dependencies
import '@toast-ui/editor/dist/toastui-editor.css'

import { Editor as ToastUIEditor } from '@toast-ui/react-editor'

type EditorType = {
  onChange: (value: string | undefined) => void
  initialValue: string
  markdown: string
}

const Editor = ({ onChange, initialValue, markdown }: EditorType) => {
  const { colorMode } = useColorMode()
  const editorRef = useRef<ToastUIEditor>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const callEditorMethod = useCallback(() => {
    editorRef.current?.getInstance().setMarkdown(markdown)
  }, [editorRef, markdown])

  useEffect(() => {
    callEditorMethod()
  }, [markdown, callEditorMethod])

  const updateEditorHeaderBackground = (mode: 'dark' | 'light') => {
    const backgroundColor = mode === "dark" ? "#232428" : "#f7f9fc"
    const editorContainer = containerRef.current?.getElementsByClassName(
      'toastui-editor-defaultUI',
    )[0]
    const editorTab = Array.from(
      containerRef.current?.getElementsByClassName(
        'toastui-editor-md-tab-container',
      ) as HTMLCollectionOf<HTMLElement>,
    )[0]
    if (editorContainer) {
      if (mode === 'dark') {
        editorContainer.classList.add('toastui-editor-dark')
        editorTab.style.backgroundColor = backgroundColor
      } else {
        editorTab.style.backgroundColor = backgroundColor
        editorContainer.classList.remove('toastui-editor-dark')
      }
    }
  }

  useEffect(() => {
    updateEditorHeaderBackground(colorMode)
  }, [colorMode])

  return (
    <Box ref={containerRef} m={0} w="100%" h="100%">
      <ToastUIEditor
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
