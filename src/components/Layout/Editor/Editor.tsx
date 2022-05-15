import React, { memo, useCallback, useEffect, useRef } from 'react'
import { Box, useColorMode } from '@chakra-ui/react'

// eslint-disable-next-line import/no-extraneous-dependencies
import '@toast-ui/editor/dist/toastui-editor.css'

import { Editor as ToastUIEditor } from '@toast-ui/react-editor'
import wikiLink from '@/editor-plugins/wikiLink'
import cite from '@/editor-plugins/cite'
import { EditorContentOverride } from '@/types/Wiki'

type EditorType = {
  onChange: (value: string | undefined) => void
  markdown: string
}

const Editor = ({ onChange, markdown }: EditorType) => {
  const { colorMode } = useColorMode()
  const editorRef = useRef<ToastUIEditor>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const html = document.getElementsByTagName('html')[0]

  // when markdown changes, update the editor
  function updateEditorText(text: string) {
    const editorInstance = editorRef.current?.getInstance()
    if (editorInstance?.getMarkdown() !== text) {
      html.classList.add('scroller-blocker')
      editorInstance?.setMarkdown(text)
      editorInstance?.setSelection(0, 0)
      editorInstance?.setScrollTop(0)
    }
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
      } else onChange(currentMd)
    }
  }, [editorRef, markdown, onChange])

  return (
    <Box ref={containerRef} m={0} w="100%" h="100%">
      {markdown && (
        <ToastUIEditor
          plugins={[wikiLink, cite]}
          height="100%"
          theme={colorMode === 'dark' ? 'dark' : 'light'}
          ref={editorRef}
          autofocus={false}
          initialEditType="wysiwyg"
          initialValue={markdown}
          onFocus={() => {
            html.classList.remove('scroller-blocker')
            window.scrollTo(0, 0)
          }}
          onChange={handleOnEditorChange}
          toolbarItems={[
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['ul', 'ol', 'indent', 'outdent'],
            ['table', 'image', 'code'],
          ]}
        />
      )}
    </Box>
  )
}

export default memo(Editor)
