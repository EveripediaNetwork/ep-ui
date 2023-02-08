import config from '@/config'
import axios from 'axios'
import { useEffect } from 'react'
import { POST_IMG } from '@/services/wikis/queries'
import { EditorContentOverride } from '@everipedia/iq-utils'
import { createContext } from '@chakra-ui/react-utils'
import { getDraftFromLocalStorage } from '@/store/slices/wiki.slice'
import { WikiImageObjectProps } from '@/types/CreateWikiType'
import { useCreateWikiState } from '@/hooks/useCreateWikiState'
import { initialEditorValue } from './createWikiMessages'

export const MINIMUM_WORDS = 100

export const saveImage = async (image: WikiImageObjectProps) => {
  const formData = new FormData()
  const blob = new Blob([image.type], {
    type: 'image/jpeg', // TODO: find proper type for now its forced to bypass API enforcements
  })

  formData.append('operations', POST_IMG)
  formData.append('map', `{"0": ["variables.file"]}`)
  formData.append('0', blob)
  try {
    const {
      data: {
        data: {
          pinImage: { IpfsHash },
        },
      },
    } = await axios.post(config.graphqlUrl, formData, {})

    return IpfsHash
  } catch (err) {
    return null
  }
}

export const [CreateWikiProvider, useCreateWikiContext] =
  createContext<ReturnType<typeof useCreateWikiState>>()

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
