import config from '@/config'
import { getWikisByTitle } from '@/services/search'
import { store } from '@/store/store'
import { WikiPreview } from '@everipedia/iq-utils'
import { shortenText } from '@/utils/textUtils'
import { Center, Flex } from '@chakra-ui/react'
import { PluginContext } from '@toast-ui/editor/dist/toastui-editor-viewer'
import { debounce } from 'debounce'
import React, { useEffect } from 'react'
import {
  getWikiSummary,
  WikiSummarySize,
} from '@/utils/WikiUtils/getWikiSummary'
import { CHAR_SEARCH_LIMIT } from '@/data/Constants'

const DISPLAY_LIMIT = 10

const fetchWikisList = async (
  query: string,
  cb: (data: WikiPreview[]) => void,
) => {
  const { data } = await store.dispatch(getWikisByTitle.initiate(query))
  cb(data || [])
}

const debouncedFetchWikis = debounce(
  (query: string, cb: (data: WikiPreview[]) => void) => {
    fetchWikisList(query, cb)
  },
  500,
)

const WikiLinkFrame = ({ editorContext }: { editorContext: PluginContext }) => {
  const { eventEmitter } = editorContext
  const [search, setSearch] = React.useState('')
  const [results, setResults] = React.useState<WikiPreview[]>([])
  const [loading, setLoading] = React.useState(false)
  const [wikiSelected, setWikiSelected] = React.useState<WikiPreview | null>(
    null,
  )
  const [userSelectedText, setUserSelectedText] = React.useState<string | null>(
    null,
  )
  const [triggerCleanup, setTriggerCleanup] = React.useState(false)
  const [offset, setOffset] = React.useState(0)
  const [wikiList, setWikiList] = React.useState<WikiPreview[]>([])

  useEffect(() => {
    setTimeout(() => {
      const popupBtn = document.querySelector('.wikiLink__popupBtn')
      popupBtn?.addEventListener('click', () => {
        setTriggerCleanup((p) => !p)
      })
    }, 500)
  }, [])

  useEffect(() => {
    setSearch('')
    setResults([])
    setWikiSelected(null)
    const windowSelection = window.getSelection()?.toString()
    setUserSelectedText(windowSelection ?? null)
    setSearch(windowSelection ?? '')
    if (windowSelection && windowSelection.length > CHAR_SEARCH_LIMIT) {
      setLoading(true)
      debouncedFetchWikis(windowSelection, (data) => {
        setResults(data)
        setOffset(0)
        setWikiList(data.slice(0, DISPLAY_LIMIT))
        setLoading(false)
      })
    }
  }, [triggerCleanup])

  useEffect(() => {
    if (search.length >= CHAR_SEARCH_LIMIT) {
      setLoading(true)
      debouncedFetchWikis(search, (data) => {
        setResults(data)
        setWikiList(data.slice(0, DISPLAY_LIMIT))
        setOffset(0)
        setLoading(false)
      })
    } else {
      setResults([])
      setWikiSelected(null)
    }
  }, [search])

  const handleWikiLinkSubmit = () => {
    if (!wikiSelected) return

    const payload = {
      url: `${config.publicDomain}/wiki/${wikiSelected.id}`,
      text: userSelectedText ?? wikiSelected.title,
    }

    eventEmitter.emit('command', 'wikiLink', payload)
    eventEmitter.emit('closePopup')
  }

  useEffect(() => {
    setWikiList(results.slice(offset, offset + DISPLAY_LIMIT))
  }, [offset])

  return (
    <div>
      <div className="wikiLink__inputContainer">
        <input
          className="wikiLink__input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search Wiki"
        />
      </div>
      {wikiSelected && (
        <div className="wikiLink__previewContainer">
          <h3 className="wikiLink__previewTitle">
            {shortenText(wikiSelected.title, 30)}
          </h3>
          <div className="wikiLink__previewTagsContainer">
            {wikiSelected.tags?.map((tag) => (
              <span
                style={{
                  backgroundColor: `hsl(${Math.floor(
                    Math.random() * 360,
                  )}, 10%, 80%)`,
                }}
                className="wikiLink__previewTag"
              >
                {tag.id}
              </span>
            ))}
          </div>
          <p className="wikiLink__previewContent">
            {getWikiSummary(wikiSelected, WikiSummarySize.Medium)}
          </p>
        </div>
      )}
      {loading && (
        <Center>
          <div className="wikiLink__loader">
            <div />
            <div />
            <div />
          </div>
        </Center>
      )}
      {!loading && search.length >= 3 && results.length === 0 && (
        <div className="wikiLink__noResultsMsg">No results found</div>
      )}
      {wikiList.length > 0 && !wikiSelected && (
        <div className="wikiLink__resultsContainer">
          {wikiList.map((wiki) => (
            <button
              key={wiki.id}
              type="button"
              className="wikiLink__wikiResult"
              onClick={() => setWikiSelected(wiki)}
            >
              {shortenText(wiki.title, 30)}
            </button>
          ))}
        </div>
      )}
      {results.length > 0 && !wikiSelected && (
        <Flex justifyContent="flex-end" gap={10}>
          <button
            type="button"
            onClick={() => setOffset(offset - DISPLAY_LIMIT)}
            className="toastui-editor-paginate-button wikiLink_linkButton"
            disabled={offset === 0 || results.length === 0}
          >
            Previous
          </button>
          <button
            type="button"
            className="toastui-editor-paginate-button wikiLink_linkButton"
            disabled={offset + DISPLAY_LIMIT >= results.length}
            onClick={() => setOffset(offset + DISPLAY_LIMIT)}
          >
            Next
          </button>
        </Flex>
      )}
      {wikiSelected && (
        <button
          type="button"
          onClick={handleWikiLinkSubmit}
          className="toastui-editor-ok-button wikiLink_linkButton"
        >
          Link
        </button>
      )}
    </div>
  )
}

export default WikiLinkFrame
