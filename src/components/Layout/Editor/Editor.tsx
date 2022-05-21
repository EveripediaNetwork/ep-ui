import React, { memo, useCallback, useEffect, useRef } from 'react'
import { Box, useColorMode } from '@chakra-ui/react'

// eslint-disable-next-line import/no-extraneous-dependencies
import '@toast-ui/editor/dist/toastui-editor.css'

import { Editor as ToastUIEditor } from '@toast-ui/react-editor'
import wikiLink from '@/editor-plugins/wikiLink'
import cite from '@/editor-plugins/cite'
import { EditorContentOverride } from '@/types/Wiki'
import { Dict } from '@chakra-ui/utils'

const ToastUIEditorJSX = ToastUIEditor as unknown as (
  props: Dict,
) => JSX.Element

type EditorType = {
  onChange: (value: string | undefined) => void
  markdown?: string
}

const Editor = ({ onChange, markdown = '' }: EditorType) => {
  const { colorMode } = useColorMode()
  const editorRef = useRef<ToastUIEditor>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // when markdown changes, update the editor
  function updateEditorText(text: string) {
    const editorInstance = editorRef.current?.getInstance()
    if (editorInstance?.getMarkdown() !== text)
      editorInstance?.setMarkdown(text, false)
  }
  useEffect(() => {
    if (
      markdown.substring(0, EditorContentOverride.KEYWORD.length) ===
      EditorContentOverride.KEYWORD
    )
      updateEditorText(markdown.substring(26))
    else updateEditorText(markdown)
  }, [markdown])

  // when color mode changes, update top level class tag
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

  // when there is a change in the editor, update the markdown
  const handleOnEditorChange = useCallback(() => {
    const currentMd = editorRef.current
      ?.getInstance()
      .getMarkdown()
      .toString() as string
    if (markdown !== currentMd) {
      if (
        markdown.substring(0, EditorContentOverride.KEYWORD.length) ===
        EditorContentOverride.KEYWORD
      ) {
        onChange(markdown.substring(26))
      } else if (
        currentMd &&
        currentMd !== 'Write\nPreview\n\nMarkdown\nWYSIWYG'
      )
        onChange(currentMd)
    }
  }, [editorRef, markdown, onChange])

  return (
    <Box ref={containerRef} m={0} w="100%" h="100%">
      <ToastUIEditorJSX
        plugins={[wikiLink, cite]}
        height="100%"
        theme={colorMode === 'dark' ? 'dark' : 'light'}
        ref={editorRef}
        autofocus={false}
        initialEditType="wysiwyg"
        initialValue={markdown}
        onChange={handleOnEditorChange}
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'indent', 'outdent'],
          ['table', 'image', 'code'],
        ]}
      />
    </Box>
  )
}

export default memo(Editor)
