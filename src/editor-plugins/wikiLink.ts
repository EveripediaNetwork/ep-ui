import { debouncedFetchData } from '@/services/nav-search/utils'
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
  const wikiSelected = { title: '', url: '' }

  // WIKI LINK: Frame Container
  const container = document.createElement('div')
  container.style.gap = '10px'

  // WIKI LINK: Input and Button container
  const inputContainer = document.createElement('div')
  inputContainer.style.display = 'flex'
  inputContainer.style.alignItems = 'center'
  inputContainer.style.justifyContent = 'center'
  inputContainer.style.gap = '10px'

  // WIKI LINK: Frame Input
  const input = document.createElement('input')
  input.type = 'text'
  input.placeholder = 'Search Wiki'
  input.style.width = '100%'

  // WIKI LINK: Frame Button
  const button = document.createElement('button')
  button.classList.add('toastui-editor-ok-button')
  button.innerText = 'Link'

  button.addEventListener('click', () => {
    if (wikiSelected.title && wikiSelected.url) {
      eventEmitter.emit('command', 'wikiLink', {
        url: wikiSelected.url,
        text: wikiSelected.title,
      })
      eventEmitter.emit('closePopup')
    }
  })

  // WIKI LINK: auto-complete results container
  const resultsContainer = document.createElement('div')
  resultsContainer.style.display = 'none'
  resultsContainer.style.flexDirection = 'column'
  resultsContainer.style.gap = '5px'
  resultsContainer.style.marginTop = '10px'

  inputContainer.appendChild(input)
  inputContainer.appendChild(button)
  container.appendChild(inputContainer)
  container.appendChild(resultsContainer)

  // Fetch results of wiki
  const fetchWikiResults = (query: string) => {
    debouncedFetchData(query, res => {
      resultsContainer.innerHTML = ''
      if (res.length > 0) {
        resultsContainer.style.display = 'flex'
        // for each result, create a button and append to results container
        res.forEach((wiki, i) => {
          const wikiResult = document.createElement('button')
          wikiResult.innerText = wiki.title
          wikiResult.style.textAlign = 'left'
          wikiResult.style.width = '100%'
          wikiResult.style.padding = '5px'
          wikiResult.style.cursor = 'pointer'
          if (i !== 0) {
            wikiResult.style.borderTop = '1px solid #eaeaea'
          }
          wikiResult.addEventListener('click', () => {
            wikiSelected.title = wiki.title
            wikiSelected.url = `${window.location.origin}/wiki/${wiki.id}`
            input.value = wiki.title
          })
          resultsContainer.appendChild(wikiResult)
        })
      } else resultsContainer.style.display = 'none'
    })
  }
  // Adding event listener on wikiLink button to get select text using javascript
  // since there seems to be no way to get selected text in the editor api
  // setTimeout is for waiting till the button gets created after this plugin is loaded
  setTimeout(() => {
    const popupBtn = document.querySelector('.toastui-editor-wiki-link-button')
    popupBtn?.addEventListener('click', () => {
      let selectedText = ''
      if (window.getSelection) {
        selectedText = window.getSelection()?.toString() || ''
      }
      input.value = selectedText
      fetchWikiResults(selectedText)
    })
  }, 500)

  // Event listener on input search field to get the wikis when user types
  setTimeout(() => {
    input.addEventListener('keyup', () => {
      fetchWikiResults(input.value)
    })
  }, 500)

  return {
    toolbarItems: [
      {
        groupIndex: 1,
        itemIndex: 3,
        item: {
          name: 'wiki link',
          tooltip: 'add wiki link',
          className: 'toastui-editor-wiki-link-button',
          text: 'W',
          popup: {
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
