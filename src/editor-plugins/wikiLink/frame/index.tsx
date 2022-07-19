import { getWikisByTitle } from '@/services/search'
import { store } from '@/store/store'
import { WikiPreview } from '@/types/Wiki'
import { getWikiSummary, WikiSummarySize } from '@/utils/getWikiSummary'
import { shortenText } from '@/utils/shortenText'
import { Center } from '@chakra-ui/react'
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
  const [loading, setLoading] = React.useState(false)
  const [wikiSelected, setWikiSelected] = React.useState<WikiPreview | null>(
    null,
  )
  const [userSelectedText, setUserSelectedText] = React.useState<string | null>(
    null,
  )
  useEffect(() => {
    const windowSelection = window.getSelection()?.toString()
    setUserSelectedText(windowSelection || null)
    setSearch(windowSelection || '')
  }, [])

  const cleanComponentState = () => {
    setSearch('')
    setResults([])
    setWikiSelected(null)
  }

  useEffect(() => {
    if (search.length > 3) {
      setLoading(true)
      debouncedFetchWikis(search, data => {
        setResults(data.slice(0, 6))
        setLoading(false)
      })
    } else {
      setResults([])
      setWikiSelected(null)
    }
  }, [search])

  const handleWikiLinkSubmit = () => {
    if (!wikiSelected) return
    eventEmitter.emit('command', 'wikiLink', {
      url: wikiSelected.id,
      text: userSelectedText === '' ? wikiSelected.title : userSelectedText,
    })
    cleanComponentState()
    eventEmitter.emit('closePopup')
  }

  return (
    <div>
      <div className="wikiLink__inputContainer">
        <input
          className="wikiLink__input"
          value={search}
          onChange={e => setSearch(e.target.value)}
          type="text"
          placeholder="Search Wiki"
        />
      </div>
      {wikiSelected && (
        <div className="wikiLink__previewContainer">
          <h3 className="wikiLink__previewTitle">{wikiSelected.title}</h3>
          <div className="wikiLink__previewTagsContainer">
            {wikiSelected.tags?.map(tag => (
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
          className="toastui-editor-ok-button wikiLink_linkButton"
        >
          Link
        </button>
      )}
    </div>
  )
}

const WikiLinkGuardFrame = ({
  editorContext,
}: {
  editorContext: PluginContext
}) => {
  return <WikiLinkFrame editorContext={editorContext} />
}

export default WikiLinkGuardFrame
