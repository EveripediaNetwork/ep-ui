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
import { debouncedFetchData } from '@/services/nav-search/utils'

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

const fetchWikiResults = (
  query: string,
  resultsContainer: HTMLDivElement,
  wikiSelected: { title: string; url: string },
  searchInput: HTMLInputElement,
) => {
  debouncedFetchData(query, res => {
    // Clear results container before adding new results
    resultsContainer.innerHTML = ''

    if (res.length > 0) {
      // make results container invisible if there are no results
      resultsContainer.classList.remove(
        'wikiLink__resultsContainer--displayNone',
      )
      // for each result, create a button and append to results container
      res.slice(0, 15).forEach((wiki, i) => {
        // create wikiResult button (by truncating title)
        const wikiResult = document.createElement('button')
        wikiResult.innerText =
          wiki.title.length > 100
            ? wiki.title.slice(0, 100).concat('...')
            : wiki.title
        wikiResult.classList.add('wikiLink__wikiResult')
        if (i === 0)
          wikiResult.classList.add('wikiLink__wikiResult--noTopBorder')

        // event listener on wikiResult button to set wikiSelected
        wikiResult.addEventListener('click', () => {
          wikiSelected.title = wiki.title
          wikiSelected.url = `${window.location.origin}/wiki/${wiki.id}`
          searchInput.value = wiki.title
        })

        resultsContainer.appendChild(wikiResult)
      })
    } else
      resultsContainer.classList.add('wikiLink__resultsContainer--displayNone')
  })
}

export default function wikiLink(context: PluginContext): PluginInfo {
  const { eventEmitter } = context
  const wikiSelected = { title: '', url: '' }

  //= =======================
  //  Toolbar Frame Elements
  //= =======================

  // Frame Container
  const container = document.createElement('div')

  // Input and Button container
  const inputContainer = document.createElement('div')
  inputContainer.classList.add('wikiLink__inputContainer')

  // Frame Search Input bar
  const input = document.createElement('input')
  input.type = 'text'
  input.placeholder = 'Search Wiki'

  // Frame Link Button (runs wikiLink command when clicked)
  const button = document.createElement('button')
  button.innerText = 'Link'
  button.classList.add('toastui-editor-ok-button')
  button.addEventListener('click', () => {
    if (wikiSelected.title && wikiSelected.url) {
      eventEmitter.emit('command', 'wikiLink', {
        url: wikiSelected.url,
        text: wikiSelected.title,
      })
      eventEmitter.emit('closePopup')
    }
  })

  // Results container
  const resultsContainer = document.createElement('div')
  resultsContainer.classList.add('wikiLink__resultsContainer')

  // Append all elements to container
  inputContainer.appendChild(input)
  inputContainer.appendChild(button)
  container.appendChild(inputContainer)
  container.appendChild(resultsContainer)

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
      fetchWikiResults(selectedText, resultsContainer, wikiSelected, input)
    })
  }, 500)

  // Event listener on input search field to get the wikis when user types
  setTimeout(() => {
    input.addEventListener('keyup', () => {
      fetchWikiResults(input.value, resultsContainer, wikiSelected, input)
    })
  }, 500)

  //= =======================
  //  Plugin Info Object to return
  //= =======================

  return {
    toolbarItems: [
      {
        groupIndex: 1,
        itemIndex: 3,
        item: {
          name: 'wiki link',
          tooltip: 'Insert wiki link',
          className: 'toastui-editor-wiki-link-button wikiLink__popupBtn',
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
