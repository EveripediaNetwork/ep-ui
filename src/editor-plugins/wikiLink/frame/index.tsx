import { getWikisByTitle } from '@/services/search'
import { store } from '@/store/store'
import { WikiPreview } from '@/types/Wiki'
import { getWikiSummary, WikiSummarySize } from '@/utils/getWikiSummary'
import { shortenText } from '@/utils/shortenText'
import { PluginContext } from '@toast-ui/editor/dist/toastui-editor-viewer'
import { debounce } from 'debounce'
import React, { useEffect } from 'react'

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
  const [wikiSelected, setWikiSelected] = React.useState<WikiPreview | null>(
    null,
  )
  const [userSelectedText, setUserSelectedText] = React.useState<string | null>(
    null,
  )
  useEffect(() => {
    const windowSelection = window.getSelection()?.toString()
    setUserSelectedText(windowSelection || null)
  }, [])

  useEffect(() => {
    if (search.length > 3) {
      debouncedFetchWikis(search, setResults)
    }
  }, [search])

  const handleWikiLinkSubmit = () => {
    if (!wikiSelected) return
    eventEmitter.emit('command', 'wikiLink', {
      url: wikiSelected.id,
      text: userSelectedText === '' ? wikiSelected.title : userSelectedText,
    })
    eventEmitter.emit('closePopup')
  }

  return (
    <div>
      <div className="wikiLink__inputContainer">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          type="text"
          placeholder="Search Wiki"
        />
        {wikiSelected && (
          <div className="wikiLink__previewContainer">
            <h3 className="wikiLink__previewTitle">{wikiSelected.title}</h3>
            <div className="wikiLink__previewTagsContainer">
              {wikiSelected.tags?.map(tag => (
                <span className="wikiLink__previewTag">{tag.id}</span>
              ))}
            </div>
            <p className="wikiLink__previewContent">
              {getWikiSummary(wikiSelected, WikiSummarySize.Medium)}
            </p>
          </div>
        )}
        {results.length > 0 && (
          <div className="wikiLink__resultsContainer">
            {results.map(wiki => (
              <button
                key={wiki.id}
                type="button"
                className="wikiLink__wikiResult"
                onClick={() => setWikiSelected(wiki)}
              >
                {shortenText(wiki.title, 70)}
              </button>
            ))}
          </div>
        )}
        {wikiSelected && (
          <button
            type="button"
            onClick={handleWikiLinkSubmit}
            className="toastui-editor-ok-button"
          >
            Link
          </button>
        )}
      </div>
    </div>
  )
}

export default WikiLinkFrame
