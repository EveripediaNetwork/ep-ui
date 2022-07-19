import {
  PluginContext,
  PluginInfo,
} from '@toast-ui/editor/dist/toastui-editor-viewer'
import React from 'react'

import ReactDOM from 'react-dom/client'
import WikiLinkFrame from './frame'

export default function wikiLink(context: PluginContext): PluginInfo {
  const container = document.createElement('div')
  const root = ReactDOM.createRoot(container)
  root.render(React.createElement(WikiLinkFrame, { editorContext: context }))

  return {
    toolbarItems: [
      {
        groupIndex: 1,
        itemIndex: 3,
        item: {
          name: 'wiki link',
          tooltip: 'Insert wiki link',
          className: 'toastui-editor-custom-toolbar-icon wikiLink__popupBtn',
          popup: {
            body: container,
            style: { width: '300px' },
          },
        },
      },
    ],
    markdownCommands: {
      wikiLink: (payload, state, dispatch) => {
        const { url, text } = payload
        const link = `[${text}](${url})`
        const { from, to } = state.selection
        const tr = state.tr.insertText(link, from, to)
        dispatch(tr)
        return true
      },
    },
    wysiwygCommands: {
      wikiLink: (payload, state, dispatch) => {
        const { from, to } = state.selection
        const attrs = {
          linkUrl: payload.url,
        }
        const mark = state.schema.marks.link.create(attrs)
        const tr = state.tr
          .insertText(payload.text, from, to)
          .addMark(from, from + payload.text.length, mark)
        dispatch(tr)

        return true
      },
    },
  }
}
