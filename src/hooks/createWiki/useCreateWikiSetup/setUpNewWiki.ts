import type { Dispatch, SetStateAction } from 'react'
import { getDraftFromLocalStorage } from '@/store/slices/wiki.slice'
import { initialEditorValue } from '@/utils/CreateWikiUtils/createWikiMessages'
import { EditorContentOverride } from '@everipedia/iq-utils'
import type { AppDispatch } from '@/store/store'

const setUpNewWiki = (
  setIsNewCreateWiki: Dispatch<SetStateAction<boolean>>,
  dispatch: AppDispatch,
) => {
  setIsNewCreateWiki(true)

  //initialize editor wih saved draft if available
  const draftWiki = getDraftFromLocalStorage()
  if (draftWiki) {
    dispatch({
      type: 'wiki/setInitialWikiState',
      payload: {
        ...draftWiki,
        content:
          EditorContentOverride + draftWiki.content.replace(/ {2}\n/gm, '\n'),
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
}

export default setUpNewWiki
