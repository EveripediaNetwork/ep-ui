import config from '@/config'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { POST_IMG } from '@/services/wikis/queries'
import {
  Wiki,
  EditorContentOverride,
  LinkedWikiKey,
  LinkedWikis,
} from '@everipedia/iq-utils'
import { useAppDispatch } from '@/store/hook'
import { createContext } from '@chakra-ui/react-utils'
import { NextRouter } from 'next/router'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useGetWikiQuery } from '@/services/wikis'
import { getDraftFromLocalStorage } from '@/store/slices/wiki.slice'
import { useToast } from '@chakra-ui/toast'
import { useGetWikiByActivityIdQuery } from '@/services/activities'
import { WikiImageObjectProps } from '@/types/CreateWikiType'
import { initialEditorValue, initialMsg } from './createWikiMessages'

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

export const useCreateWikiState = (router: NextRouter) => {
  const { slug, revision } = router.query

  const { isLoading: isLoadingLatestWiki, data: latestWikiData } =
    useGetWikiQuery(
      typeof revision !== 'string' && typeof slug === 'string'
        ? slug
        : skipToken,
    )

  const { isLoading: isLoadingRevisionWiki, data: revisionWikiData } =
    useGetWikiByActivityIdQuery(
      typeof revision === 'string' ? revision : skipToken,
    )

  const isLoadingWiki = isLoadingLatestWiki || isLoadingRevisionWiki

  const wikiData = useMemo(() => {
    const data = revisionWikiData || latestWikiData

    if (data?.linkedWikis) {
      // remove null values from linked wikis
      const newLinkedWikis = {} as LinkedWikis
      Object.entries(data.linkedWikis).forEach(([key, value]) => {
        if (value !== null) {
          newLinkedWikis[key as LinkedWikiKey] = value
        }
      })
      return {
        ...data,
        linkedWikis: newLinkedWikis,
      }
    }

    return data
  }, [latestWikiData, revisionWikiData])

  const [commitMessage, setCommitMessage] = useState('')
  const [isWritingCommitMsg, setIsWritingCommitMsg] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>()
  const [submittingWiki, setSubmittingWiki] = useState(false)
  const [wikiHash, setWikiHash] = useState<string>()
  const [isNewCreateWiki, setIsNewCreateWiki] = useState<boolean>(false)
  const toast = useToast()
  const [openOverrideExistingWikiDialog, setOpenOverrideExistingWikiDialog] =
    useState<boolean>(false)
  const [existingWikiData, setExistingWikiData] = useState<Wiki>()
  const [activeStep, setActiveStep] = useState<number>(0)
  const [loadingState, setIsLoading] = useState<
    'error' | 'loading' | undefined
  >('loading')
  const [wikiId, setWikiId] = useState<string>('')
  const [msg, setMsg] = useState<string>(initialMsg)
  const [txError, setTxError] = useState({
    title: '',
    description: '',
    opened: false,
  })
  const dispatch = useAppDispatch()

  return {
    isLoadingWiki,
    wikiData,
    commitMessage,
    setCommitMessage,
    dispatch,
    slug,
    revision,
    toast,
    isWritingCommitMsg,
    setIsWritingCommitMsg,
    txHash,
    setTxHash,
    submittingWiki,
    setSubmittingWiki,
    wikiHash,
    setWikiHash,
    isNewCreateWiki,
    setIsNewCreateWiki,
    openOverrideExistingWikiDialog,
    setOpenOverrideExistingWikiDialog,
    existingWikiData,
    setExistingWikiData,
    activeStep,
    setActiveStep,
    loadingState,
    setIsLoading,
    wikiId,
    setWikiId,
    msg,
    setMsg,
    txError,
    setTxError,
  }
}
