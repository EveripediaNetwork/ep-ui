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
import { wikiEditorRef } from '@/components/Layout/Editor/Editor'
import { EmbedFrame } from './frame'

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

export default function embed(context: PluginContext): PluginInfo {
  const container = document.createElement('div')
  const root = ReactDOM.createRoot(container)
  root.render(React.createElement(EmbedFrame, { editorContext: context }))
  return {
    toolbarItems: [
      {
        groupIndex: 3,
        itemIndex: 0,
        item: {
          name: 'embed',
          tooltip: 'Embed',
          className: 'toastui-editor-custom-toolbar-icon embed__popupBtn',
          popup: {
            body: container,
            style: { width: '350px' },
          },
        },
      },
    ],
    markdownCommands: {
      insertEmbed: payload => {
        const text = `[${payload.type}@EMBED](${payload.path}))`
        const editor = wikiEditorRef.current?.getInstance()
        if (editor) {
          const [start, end] = editor.getSelection()
          editor.replaceSelection(text, start, end)
        }
        return true
      },
    },
    wysiwygCommands: {
      insertEmbed: payload => {
        const text = `[${payload.type}@EMBED](${payload.path})`
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
