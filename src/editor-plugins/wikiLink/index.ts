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
import { debounce } from 'debounce'
import { getWikisByTitle } from '@/services/nav-search'
import { store } from '@/store/store'
import { getWikiSummary, WikiSummarySize } from '@/utils/getWikiSummary'
import { WikiPreview } from '@/types/Wiki'

const fetchWikisList = async (
  query: string,
  cb: (data: WikiPreview[]) => void,
) => {
  const { data } = await store.dispatch(getWikisByTitle.initiate(query))
  cb(data || [])
}

export const debouncedFetchWikis = debounce(
  (query: string, cb: (data: WikiPreview[]) => void) => {
    fetchWikisList(query, cb)
  },
  500,
)

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
  isTextSelected: boolean,
  cleanWikiLinkPopup: () => void,
  query: string,
  resultsContainer: HTMLDivElement,
  previewContainer: HTMLDivElement,
  wikiSelected: {
    title: string
    url: string
  },
  searchInput: HTMLInputElement,
  linkButton: HTMLButtonElement,
) => {
  cleanWikiLinkPopup()
  const loader = document.createElement('div')
  loader.classList.add('wikiLink__loader')
  loader.appendChild(document.createElement('div'))
  loader.appendChild(document.createElement('div'))
  loader.appendChild(document.createElement('div'))

  resultsContainer.appendChild(loader)
  debouncedFetchWikis(query, res => {
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
          wiki.title.length > 70
            ? wiki.title.slice(0, 70).concat('...')
            : wiki.title
        wikiResult.classList.add('wikiLink__wikiResult')
        if (i === 0)
          wikiResult.classList.add('wikiLink__wikiResult--noTopBorder')

        // event listener on wikiResult button to set wikiSelected
        wikiResult.addEventListener('click', () => {
          // update input and wikiSelected state
          if (!isTextSelected) wikiSelected.title = wiki.title
          wikiSelected.url = `${window.location.origin}/wiki/${wiki.id}`
          searchInput.value = wiki.title

          // enable button
          linkButton.disabled = false

          //= ====================
          // render preview card
          //= ====================

          previewContainer.classList.remove(
            'wikiLink__previewContainer--displayNone',
          )
          previewContainer.innerHTML = ''

          // preview title
          const previewTitle = document.createElement('h3')
          previewTitle.textContent = wiki.title
          previewTitle.classList.add('wikiLink__previewTitle')

          // preview tags container
          const previewTagsContainer = document.createElement('div')
          previewTagsContainer.classList.add('wikiLink__previewTagsContainer')
          wiki.tags?.forEach(tag => {
            const previewTag = document.createElement('span')
            previewTag.style.background = `hsl(${Math.floor(
              Math.random() * 360,
            )}, 10%, 80%)`
            previewTag.classList.add('wikiLink__previewTag')
            previewTag.textContent = tag.id
            previewTagsContainer.appendChild(previewTag)
          })

          // preview content
          const previewContent = document.createElement('p')
          previewContent.textContent = getWikiSummary(
            wiki,
            WikiSummarySize.Medium,
          )

          previewContainer.appendChild(previewTitle)
          previewContainer.appendChild(previewTagsContainer)
          previewContainer.appendChild(previewContent)
        })

        resultsContainer.appendChild(wikiResult)
      })
    } else {
      const noResultsMsg = document.createElement('div')
      noResultsMsg.textContent = 'No Wikis Found.'
      noResultsMsg.classList.add('wikiLink__noResultsMsg')
      resultsContainer.appendChild(noResultsMsg)
    }
  })
}

export default function wikiLink(context: PluginContext): PluginInfo {
  const { eventEmitter } = context
  const wikiSelected = { title: '', url: '' }
  let userSelectedText = ''

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

  // preview container
  const previewContainer = document.createElement('div')
  previewContainer.classList.add('wikiLink__previewContainer')
  previewContainer.classList.add('wikiLink__previewContainer--displayNone')

  // Results container
  const resultsContainer = document.createElement('div')
  resultsContainer.classList.add('wikiLink__resultsContainer')

  // Frame Link Button (runs wikiLink command when clicked)
  const button = document.createElement('button')
  button.innerText = 'Link'
  button.disabled = true
  button.classList.add('toastui-editor-ok-button')

  const cleanWikiLinkPopup = () => {
    wikiSelected.title = ''
    wikiSelected.url = ''
    previewContainer.innerHTML = ''
    resultsContainer.innerHTML = ''
    previewContainer.classList.add('wikiLink__previewContainer--displayNone')
    button.disabled = true
  }

  button.addEventListener('click', () => {
    if ((wikiSelected.title || userSelectedText) && wikiSelected.url) {
      eventEmitter.emit('command', 'wikiLink', {
        url: wikiSelected.url,
        text: userSelectedText === '' ? wikiSelected.title : userSelectedText,
      })
      eventEmitter.emit('closePopup')
      cleanWikiLinkPopup()
    }
  })

  // Append all elements to container
  inputContainer.appendChild(input)
  inputContainer.appendChild(button)
  container.appendChild(inputContainer)
  container.appendChild(previewContainer)
  container.appendChild(resultsContainer)

  // Adding event listener on wikiLink button to get select text using javascript
  // since there seems to be no way to get selected text in the editor api
  // setTimeout is for waiting till the button gets created after this plugin is loaded
  setTimeout(() => {
    const popupBtn = document.querySelector('.toastui-editor-wiki-link-button')
    popupBtn?.addEventListener('click', () => {
      userSelectedText = ''
      if (window.getSelection) {
        userSelectedText = window.getSelection()?.toString() || ''
      }
      input.value = userSelectedText
      fetchWikiResults(
        userSelectedText !== '',
        cleanWikiLinkPopup,
        userSelectedText,
        resultsContainer,
        previewContainer,
        wikiSelected,
        input,
        button,
      )
    })
  }, 500)

  // Event listener on input search field to get the wikis when user types
  setTimeout(() => {
    input.addEventListener('keyup', () => {
      fetchWikiResults(
        userSelectedText !== '',
        cleanWikiLinkPopup,
        input.value,
        resultsContainer,
        previewContainer,
        wikiSelected,
        input,
        button,
      )
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
