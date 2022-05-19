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
import Frame from './frame'

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

export default function cite(context: PluginContext): PluginInfo {
  // Frame Container
  const container = document.createElement('div')

  const root = ReactDOM.createRoot(container)

  // render react component in the container
  root.render(React.createElement(Frame, { editorContext: context }))

  return {
    toolbarItems: [
      {
        groupIndex: 1,
        itemIndex: 3,
        item: {
          name: 'cite',
          tooltip: 'Cite',
          className: 'toastui-editor-custom-toolbar-icon cite__popupBtn',
          popup: {
            body: container,
            style: { width: '350px' },
          },
        },
      },
    ],
    markdownCommands: {
      cite: (payload, state, dispatch) => {
        const link = `[${payload.refNo}](${payload.urlId})`
        const { from, to } = state.selection
        const tr = state.tr.insertText(link, from, to)
        dispatch(tr)
        return true
      },
    },
    wysiwygCommands: {
      cite: (payload, state, dispatch) => {
        const { from, to } = state.selection
        const attrs = {
          linkUrl: payload.urlId,
        }
        const text = `[${payload.refNo}]`
        const mark = state.schema.marks.link.create(attrs)
        const tr = state.tr
          .insertText(text, from, to)
          .addMark(from, from + text.length, mark)
        dispatch(tr)

        return true
      },
    },
  }
}
