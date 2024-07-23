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

  // biome-ignore lint/correctness/useExhaustiveDependencies: we don't want calling dispatch to triggger set up again
  useEffect(() => {
    const isNewWiki = !slug && !revision

    if (isNewWiki) {
      setUpNewWiki(setIsNewCreateWiki, dispatch)
    } else {
      setUpExistingWiki(
        dispatch,
        setIsNewCreateWiki,
        setCommitMessage,
        existingWiki as Wiki,
        revision,
      )
    }
  }, [setCommitMessage, setIsNewCreateWiki, slug, revision, existingWiki])
}

export default useCreateWikiSetup
