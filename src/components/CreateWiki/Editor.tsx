import React, { memo, useCallback, useEffect, useRef } from 'react'
import { Box, useColorMode } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor as ToastUIEditor } from '@toast-ui/react-editor'
import wikiLink from '@/editor-plugins/wikiLink'
import cite from '@/editor-plugins/cite'
import { CreateNewWikiSlug, EditorContentOverride } from '@everipedia/iq-utils'
import { Dict } from '@chakra-ui/utils'
import { useGetWikiQuery } from '@/services/wikis'
import { store } from '@/store/store'
// eslint-disable-next-line import/no-cycle
import media from '@/editor-plugins/media'
import { PasteListener } from '@/utils/CreateWikiUtils/pasteListener'
import tableMergedCellPlugin from '@toast-ui/editor-plugin-table-merged-cell'
import { skipToken } from '@reduxjs/toolkit/dist/query'
// eslint-disable-next-line import/no-cycle
import embed from '@/editor-plugins/embed'
import { widgetRules } from '../Layout/Editor/widgetRules'

export const wikiEditorRef = {
  current: null as ToastUIEditor | null,
}

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
  const { id } = store.getState().wiki
  const { data: wikiData } = useGetWikiQuery(
    id !== CreateNewWikiSlug ? id : skipToken,
  )

  if (editorRef.current) {
    wikiEditorRef.current = editorRef.current
  }

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
    if (editorInstance && editorInstance.getMarkdown() !== text)
      editorInstance.setMarkdown(text, false)
  }, [])

  useEffect(() => {
    if (
      markdown.substring(0, EditorContentOverride.length) ===
      EditorContentOverride
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
    const currentMd = editorRef.current?.getInstance().getMarkdown().toString()

    if (markdown !== currentMd) {
      if (
        markdown.substring(0, EditorContentOverride.length) ===
        EditorContentOverride
      ) {
        onChange(markdown.substring(26), true)
      } else if (
        currentMd &&
        currentMd !== 'Write\nPreview\n\nMarkdown\nWYSIWYG'
      ) {
        onChange(currentMd)
      } else if (currentMd?.trim() === '') {
        onChange(' ')
      }
    }
  }, [editorRef, markdown, onChange])

  useEffect(() => {
    const editorWrapper = document.querySelector(
      'div.ProseMirror.toastui-editor-contents',
    )
    editorWrapper?.addEventListener('paste', PasteListener, true)
    return () => editorWrapper?.removeEventListener('paste', PasteListener)
  }, [])

  return (
    <Box ref={containerRef} m={0} w="full" h="full">
      <ToastUIEditorJSX
        plugins={[wikiLink, cite, media, embed, tableMergedCellPlugin]}
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
        widgetRules={widgetRules}
      />
    </Box>
  )
}

export default memo(Editor)
