import type { Dispatch, SetStateAction } from 'react'
import { getDraftFromLocalStorage } from '@/store/slices/wiki.slice'
import type { Wiki } from '@everipedia/iq-utils'
import { CommonMetaIds } from '@everipedia/iq-utils'
import { getWikiMetadataById } from '@/utils/WikiUtils/getWikiFields'
import { EditSpecificMetaIds } from '@everipedia/iq-utils'
import type { AppDispatch } from '@/store/store'
import { EditorContentOverride } from '@everipedia/iq-utils'

const setUpExistingWiki = (
  dispatch: AppDispatch,
  setIsNewCreateWiki: Dispatch<SetStateAction<boolean>>,
  setCommitMessage: Dispatch<SetStateAction<string>>,
  existingWiki: Wiki,
  revision: string | string[],
) => {
  setIsNewCreateWiki(false)

  const draftWiki = getDraftFromLocalStorage()
  let wikiData = draftWiki ?? existingWiki

  if (draftWiki) {
    const isDraftWithoutImageModifications =
      draftWiki &&
      !(draftWiki?.images?.length > 0) &&
      (existingWiki?.images?.length ?? 0) > 0

    // add images from existing wiki if no image modifications were made in draft
    if (isDraftWithoutImageModifications) {
      wikiData = Object.assign({}, wikiData, {
        images: existingWiki!.images,
      }) as Wiki
    }
  }

  if (
    (wikiData?.content?.length ?? 0) > 0 &&
    (wikiData?.images?.length ?? 0) > 0
  ) {
    let metadata = wikiData?.metadata

    // fetch the currently stored meta data of page that are not edit specific
    // (commonMetaIds) and append edit specific meta data (editMetaIds) with empty values
    metadata = [
      ...Object.values(CommonMetaIds).map((metaId) => {
        const wikiMetadata = getWikiMetadataById(wikiData, metaId)
        return { id: metaId, value: wikiMetadata?.value ?? '' }
      }),
      ...Object.values(EditSpecificMetaIds).map((metaId) => ({
        id: metaId,
        value: '',
      })),
    ]

    if (revision) {
      setCommitMessage(`Reverted to revision ${revision} ⏪`)
    }

    dispatch({
      type: 'wiki/setInitialWikiState',
      payload: {
        ...wikiData,
        content:
          EditorContentOverride + wikiData.content.replace(/ {2}\n/gm, '\n'),
        metadata,
      },
    })
  }
}

export default setUpExistingWiki
