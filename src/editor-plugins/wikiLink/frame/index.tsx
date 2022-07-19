import { Wiki } from '@/types/Wiki'
import { PluginContext } from '@toast-ui/editor/dist/toastui-editor-viewer'
import React, { useEffect } from 'react'

const WikiLinkFrame = ({ editorContext }: { editorContext: PluginContext }) => {
  const [query, setQuery] = React.useState('')
  const [wikiSelected, setWikiSelected] = React.useState<Wiki | null>(null)
  const [userSelectedText, setUserSelectedText] = React.useState<string | null>(
    null,
  )

  console.log(userSelectedText, editorContext)
  useEffect(() => {
    const windowSelection = window.getSelection()?.toString()
    setUserSelectedText(windowSelection || null)
  }, [])

  return (
    <div>
      <div className="wikiLink__inputContainer">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          type="text"
          placeholder="Search Wiki"
        />
        <div className="wikiLink__previewContainer">
          <h3 className="wikiLink__previewTitle">{wikiSelected.title}</h3>
          <div className="wikiLink__previewTagsContainer">
            {wikiSelected.tags?.map(tag => (
              <span
                key={tag.id}
                className="wikiLink__previewTag"
                style={{
                  background: `hsl(${Math.floor(
                    Math.random() * 360,
                  )}, 10%, 80%)`,
                }}
              >
                {tag.id}
              </span>
            ))}
            <p className="wikiLink__previewContent">
              {getWikiSummary(wikiSelected, WikiSummarySize.Medium)}
            </p>
          </div>
        </div>
        <div className="wikiLink__resultsContainer"></div>
        <button type="button" className="toastui-editor-ok-button">
          Link
        </button>
      </div>
    </div>
  )
}

export default WikiLinkFrame
