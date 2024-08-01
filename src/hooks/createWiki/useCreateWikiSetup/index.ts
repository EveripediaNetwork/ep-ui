import { useCreateWikiContext } from '../../useCreateWikiState'
import { useEffect } from 'react'
import setUpNewWiki from './setUpNewWiki'
import setUpExistingWiki from './setUpExistingWiki'
import type { Wiki } from '@everipedia/iq-utils'

const useCreateWikiSetup = () => {
  const {
    wikiData: existingWiki,
    setCommitMessage,
    dispatch,
    slug,
    revision,
    setIsNewCreateWiki,
  } = useCreateWikiContext()

  useEffect(() => {
    const isNewWiki = !slug && !revision

    if (isNewWiki) {
      setIsNewCreateWiki(true)
      setUpNewWiki(dispatch)
    } else {
      setIsNewCreateWiki(false)
      setUpExistingWiki(
        dispatch,
        setCommitMessage,
        existingWiki as Wiki,
        revision ?? '',
      )
    }
  }, [slug, existingWiki])

  const handleOnEditorChanges = (
    val: string | undefined,
    isInitSet?: boolean,
  ) => {
    if (isInitSet) {
      dispatch({
        type: 'wiki/setInitialWikiState',
        payload: {
          content: val ?? ' ',
        },
      })
    } else {
      dispatch({
        type: 'wiki/setContent',
        payload: val ?? ' ',
      })
    }
  }

  return {
    handleOnEditorChanges,
  }
}

export default useCreateWikiSetup
