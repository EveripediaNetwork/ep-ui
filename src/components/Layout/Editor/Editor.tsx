import React, { memo, useCallback, useEffect, useRef } from 'react'
import { Box, useColorMode } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
// eslint-disable-next-line import/no-extraneous-dependencies
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor as ToastUIEditor } from '@toast-ui/react-editor'
import wikiLink from '@/editor-plugins/wikiLink'
import cite from '@/editor-plugins/cite'
import { EditorContentOverride } from '@/types/Wiki'
import { Dict } from '@chakra-ui/utils'
import { useGetWikiQuery } from '@/services/wikis'
import { store } from '@/store/store'
import media from '@/editor-plugins/media'

const ToastUIEditorJSX = ToastUIEditor as unknown as (
  props: Dict,
) => JSX.Element

type EditorType = {
  onChange: (value: string | undefined, isInitSet?: boolean) => void
  markdown?: string
}

const Editor = ({ onChange, markdown = '' }: EditorType) => {
  const { colorMode } = useColorMode()
  const editorRef = useRef<ToastUIEditor>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { data: wikiData } = useGetWikiQuery(store.getState().wiki.id)

  // insert undo redo buttons to editor
  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance()
      const undoBtn = document.createElement('div')
      ReactDOM.createRoot(undoBtn).render(
        <button
          type="button"
          className="toastui-editor-custom-toolbar-icon undo__toolbarBtn"
          onClick={() => {
            const wikiContent = wikiData?.content.replace(/ {2}\n/gm, '').trim()
            const editorText = editorInstance
              .getMarkdown()
              .replaceAll('\n', '')
              .trim()
            if (wikiContent !== editorText) editorInstance.exec('undo')
          }}
        >
          {' '}
        </button>,
      )
      const actions = ['undo', 'redo']
      actions.forEach((e, i) => {
        editorInstance.removeToolbarItem(e)
        editorInstance.insertToolbarItem(
          {
            groupIndex: 0,
            itemIndex: i,
          },
          {
            name: e,
            command: e,
            className: `toastui-editor-custom-toolbar-icon ${e}__toolbarBtn`,
            tooltip: e.charAt(0).toUpperCase() + e.slice(1),
            el: e === 'undo' ? undoBtn : undefined,
          },
        )
      })
    }
  }, [wikiData])

  // when markdown changes, update the editor
  const updateEditorText = useCallback((text: string) => {
    const editorInstance = editorRef.current?.getInstance()
    if (editorInstance?.getMarkdown() !== text)
      editorInstance?.setMarkdown(text, false)
  }, [])

  useEffect(() => {
    if (
      markdown.substring(0, EditorContentOverride.KEYWORD.length) ===
      EditorContentOverride.KEYWORD
    )
      updateEditorText(markdown.substring(26))
    else updateEditorText(markdown)
  }, [markdown, updateEditorText])

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
        onChange(markdown.substring(26), true)
      } else if (
        currentMd &&
        currentMd !== 'Write\nPreview\n\nMarkdown\nWYSIWYG'
      ) {
        onChange(currentMd)
      } else if (currentMd.trim() === '') {
        onChange(' ')
      }
    }
  }, [editorRef, markdown, onChange])

  return (
    <Box ref={containerRef} m={0} w="full" h="full">
      <ToastUIEditorJSX
        plugins={[wikiLink, cite, media]}
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
          ['table', 'code'],
        ]}
      />
    </Box>
  )
}

export default memo(Editor)
