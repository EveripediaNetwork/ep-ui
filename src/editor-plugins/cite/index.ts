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
    eventEmitter.emit('command', 'cite', {
      url: urlInput.value,
      desc: descriptionInput.value,
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
      cite: () => {
        // TODO: figure out a markdown syntax for this
        return true
      },
    },
    wysiwygCommands: {
      cite: () => {
        // TODO: implement this
        return true
      },
    },
  }
}
