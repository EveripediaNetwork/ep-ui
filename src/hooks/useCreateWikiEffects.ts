import { getDraftFromLocalStorage } from '@/store/slices/wiki.slice'
import { useCreateWikiContext } from '@/utils/CreateWikiUtils/createWiki'
import { initialEditorValue } from '@/utils/CreateWikiUtils/createWikiMessages'
import { EditorContentOverride } from '@everipedia/iq-utils'
import { useEffect } from 'react'

export const useCreateWikiEffects = () => {
  const { slug, revision, setIsNewCreateWiki, dispatch } =
    useCreateWikiContext()

  // Reset the State to new wiki if there is no slug
  useEffect(() => {
    if (!slug && !revision) {
      setIsNewCreateWiki(true)
      // fetch draft data from local storage
      const draft = getDraftFromLocalStorage()
      if (draft) {
        dispatch({
          type: 'wiki/setInitialWikiState',
          payload: {
            ...draft,
            content:
              EditorContentOverride + draft.content.replace(/ {2}\n/gm, '\n'),
          },
        })
      } else {
        dispatch({ type: 'wiki/reset' })
        dispatch({
          type: 'wiki/setInitialWikiState',
          payload: {
            content: EditorContentOverride + initialEditorValue,
          },
        })
      }
    } else {
      setIsNewCreateWiki(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, slug])
}
