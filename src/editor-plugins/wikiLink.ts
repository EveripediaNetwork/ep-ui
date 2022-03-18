import { HTMLConvertorMap, ToMdConvertorMap } from '@toast-ui/editor'
import {
  PluginCommandMap,
  PluginContext,
} from '@toast-ui/editor/dist/toastui-editor-viewer'
import {
  NodeViewPropMap,
  PluginProp,
  PluginToolbarItem,
} from '@toast-ui/editor/types/plugin'

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

export default function wikiLink(context: PluginContext): PluginInfo {
  const { eventEmitter } = context
  const container = document.createElement('div')
  const input = document.createElement('input')
  const button = document.createElement('button')

  container.classList.add('toastui-editor-popup-body')
  container.style.display = 'flex'
  container.style.alignItems = 'center'
  container.style.justifyContent = 'center'
  container.style.gap = '10px'

  input.type = 'text'
  input.placeholder = 'Search Wiki'
  input.style.width = '100%'

  button.classList.add('toastui-editor-ok-button')
  button.innerText = 'Link'

  button.addEventListener('click', () => {
    eventEmitter.emit('command', 'wikiLink', {
      url: input.value,
      text: input.value,
    })
    eventEmitter.emit('closePopup')
  })

  container.appendChild(input)
  container.appendChild(button)

  return {
    toolbarItems: [
      {
        groupIndex: 1,
        itemIndex: 3,
        item: {
          name: 'wiki link',
          tooltip: 'add wiki link',
          text: 'W',
          popup: {
            className: 'some class',
            body: container,
            style: { width: 'auto' },
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