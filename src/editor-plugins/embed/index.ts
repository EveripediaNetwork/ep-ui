import Editor, { HTMLConvertorMap, ToMdConvertorMap } from '@toast-ui/editor'
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

  const insertEmbed = (payload: any, editor: Editor | undefined) => {
    const text = `[${payload.type}@EMBED](${payload.path}))`

    if (editor) {
      const [start, end] = editor.getSelection()
      editor.replaceSelection(text, start, end)
    }
    return true
  }

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
      insertEmbed: payload =>
        insertEmbed(payload, wikiEditorRef.current?.getInstance()),
    },
    wysiwygCommands: {
      insertEmbed: payload =>
        insertEmbed(payload, wikiEditorRef.current?.getInstance()),
    },
  }
}
