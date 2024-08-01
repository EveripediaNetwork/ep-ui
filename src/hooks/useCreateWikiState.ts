import { useGetWikiByActivityIdQuery } from '@/services/activities'
import { useGetWikiQuery } from '@/services/wikis'
import { useAppDispatch } from '@/store/hook'
import { initialMsg } from '@/utils/CreateWikiUtils/createWikiMessages'
import type { LinkedWikiKey, LinkedWikis, Wiki } from '@everipedia/iq-utils'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { NextRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { createContext } from '@chakra-ui/react-utils'

export const [CreateWikiProvider, useCreateWikiContext] =
  createContext<ReturnType<typeof useCreateWikiState>>()

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
