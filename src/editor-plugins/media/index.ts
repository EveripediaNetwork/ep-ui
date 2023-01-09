import { HTMLConvertorMap, ToMdConvertorMap } from '@toast-ui/editor'
import ReactDOM from 'react-dom/client'
import {
  PluginCommandMap,
  PluginContext,
} from '@toast-ui/editor/dist/toastui-editor-viewer'
import {
  NodeViewPropMap,
  PluginProp,
  PluginToolbarItem,
} from '@toast-ui/editor/types/plugin'
import React from 'react'
// eslint-disable-next-line import/no-cycle
import { wikiEditorRef } from '@/components/Editor/Editor'
import MediaFrame from './frame'

interface PluginInfo {
  toHTMLRenderers?: HTMLConvertorMap
  toMarkdownRenderers?: ToMdConvertorMap
  markdownPlugins?: PluginProp[]
  wysiwygPlugins?: PluginProp[]
  wysiwygNodeViews?: NodeViewPropMap
  markdownCommands?: PluginCommandMap
  wysiwygCommands?: PluginCommandMap
  toolbarItems?: PluginToolbarItem[]
}

export default function media(context: PluginContext): PluginInfo {
  const container = document.createElement('div')
  const root = ReactDOM.createRoot(container)
  root.render(React.createElement(MediaFrame, { editorContext: context }))
  return {
    toolbarItems: [
      {
        groupIndex: 3,
        itemIndex: 0,
        item: {
          name: 'media',
          tooltip: 'Media',
          className: 'toastui-editor-custom-toolbar-icon media__popupBtn',
          popup: {
            body: container,
            style: { width: '350px' },
          },
        },
      },
    ],
    markdownCommands: {
      insertImage: (payload, state, dispatch) => {
        const link = `![${payload.name}](${payload.src})`
        const { from, to } = state.selection
        const tr = state.tr.insertText(link, from, to)
        dispatch(tr.scrollIntoView())
        return true
      },
      insertVideo: payload => {
        const text = `[YOUTUBE@VID](${payload.alt})`
        const editor = wikiEditorRef.current?.getInstance()
        if (editor) {
          const [start, end] = editor.getSelection()
          editor.replaceSelection(text, start, end)
        }
        return true
      },
    },
    wysiwygCommands: {
      insertImage: (payload, state, dispatch) => {
        const img = state.schema.nodes.image.createAndFill({
          imageUrl: payload.src,
          altText: payload.alt,
        })
        dispatch(state.tr.replaceSelectionWith(img).scrollIntoView())
        return true
      },
      insertVideo: payload => {
        const text = `[YOUTUBE@VID](${payload.alt})`
        const editor = wikiEditorRef.current?.getInstance()
        if (editor) {
          const [start, end] = editor.getSelection()
          editor.replaceSelection(text, start, end)
        }
        return true
      },
    },
  }
}
