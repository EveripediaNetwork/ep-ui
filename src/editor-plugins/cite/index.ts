import { store } from '@/store/store'
import { getWikiMetadataById } from '@/utils/getWikiFields'
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

export default function cite(context: PluginContext): PluginInfo {
  const { eventEmitter } = context
  // ========================
  //  Toolbar Frame Elements
  // ========================

  // Frame Container
  const container = document.createElement('div')
  container.classList.add('cite__frame')

  //  Input bar for URL
  const urlLabel = document.createElement('label')
  urlLabel.textContent = 'Enter URL'
  urlLabel.htmlFor = 'citeUrlInput'

  const urlInput = document.createElement('input')
  urlInput.type = 'text'
  urlInput.placeholder = 'Insert URL'
  urlInput.id = 'citeUrlInput'

  const urlInputContainer = document.createElement('div')
  urlInputContainer.appendChild(urlLabel)
  urlInputContainer.appendChild(urlInput)

  // Input bar for Description
  const descriptionLabel = document.createElement('label')
  descriptionLabel.textContent = 'Enter Description'
  descriptionLabel.htmlFor = 'citeDescriptionInput'

  const descriptionInput = document.createElement('input')
  descriptionInput.type = 'text'
  descriptionInput.placeholder = 'Insert Description'
  descriptionInput.id = 'citeDescriptionInput'

  const descriptionInputContainer = document.createElement('div')
  descriptionInputContainer.appendChild(descriptionLabel)
  descriptionInputContainer.appendChild(descriptionInput)

  // Submit button to cite the current cursor position
  const submitButton = document.createElement('button')
  submitButton.classList.add('toastui-editor-ok-button')
  submitButton.textContent = 'Cite'

  submitButton.addEventListener('click', () => {
    // access wiki data from wiki slice
    const references =
      getWikiMetadataById(store.getState().wiki, 'references')?.value || '[]'
    const referencesParsed = JSON.parse(references)
    const refCount = referencesParsed.length

    // dispatch new metadata to wiki slice
    store.dispatch({
      type: 'wiki/updateMetadata',
      payload: {
        id: 'references',
        value: JSON.stringify([
          ...referencesParsed,
          {
            url: urlInput.value,
            description: descriptionInput.value,
          },
        ]),
      },
    })
    eventEmitter.emit('command', 'cite', {
      urlId: `#cite-id-${refCount + 1}`,
      refNo: refCount + 1,
    })
  })
  container.appendChild(urlInputContainer)
  container.appendChild(descriptionInputContainer)
  container.appendChild(submitButton)

  return {
    toolbarItems: [
      {
        groupIndex: 1,
        itemIndex: 3,
        item: {
          name: 'cite',
          tooltip: 'Cite',
          className: 'toastui-editor-cite-button cite__popupBtn',
          popup: {
            body: container,
            style: { width: '300px' },
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
