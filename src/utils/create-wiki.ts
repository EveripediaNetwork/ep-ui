import config from '@/config'
import axios from 'axios'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { POST_IMG } from '@/services/wikis/queries'
import {
  Image,
  Wiki,
  CommonMetaIds,
  EditSpecificMetaIds,
  WikiRootBlocks,
  MData,
} from '@/types/Wiki'
import diff from 'fast-diff'
import { getWordCount } from '@/utils/getWordCount'
import { getWikiMetadataById } from '@/utils/getWikiFields'
import { useAppDispatch } from '@/store/hook'
import { createContext } from '@chakra-ui/react-utils'
import { submitVerifiableSignature } from '@/utils/postSignature'
import { useAccount, useSignTypedData, useWaitForTransaction } from 'wagmi'
import { NextRouter } from 'next/router'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { getWiki, useGetWikiQuery } from '@/services/wikis'
import { PageTemplate } from '@/data/pageTemplate'
import { store } from '@/store/store'
import { logEvent } from './googleAnalytics'

export const initialEditorValue = ` `
export const initialMsg =
  'Your Wiki is being processed. It will be available on the blockchain soon.'
export const errorMessage = 'Oops, An Error Occurred. Wiki could not be created'
export const successMessage = 'Wiki has been created successfully.'

export const domain = {
  name: 'EP',
  version: '1',
  chainId: config.chainId,
  verifyingContract: config.wikiContractAddress,
}

export const types = {
  SignedPost: [
    { name: 'ipfs', type: 'string' },
    { name: 'user', type: 'address' },
    { name: 'deadline', type: 'uint256' },
  ],
}

export const MINIMUM_WORDS = 150

export const saveImage = async (image: Image) => {
  const formData = new FormData()
  const blob = new Blob([image.type], {
    type: 'image/jpeg', // TODO: find proper type for now its forced to bypass API enforcements
  })

  formData.append('operations', POST_IMG)
  const map = `{"0": ["variables.file"]}`
  formData.append('map', map)
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

export const useCreateWikiEffects = (
  wiki: Wiki,
  prevEditedWiki: React.MutableRefObject<{
    wiki?: Wiki | undefined
    isPublished: boolean
  }>,
) => {
  const {
    slug,
    wikiData,
    activeStep,
    setIsNewCreateWiki,

    dispatch,
    isLoadingWiki,
  } = useCreateWikiContext()

  useEffect(() => {
    if (activeStep === 3) {
      prevEditedWiki.current.isPublished = true
    }
  }, [activeStep, prevEditedWiki])

  // Reset the State to new wiki if there is no slug
  useEffect(() => {
    if (!slug) {
      setIsNewCreateWiki(true)
      dispatch({ type: 'wiki/reset' })
      dispatch({ type: 'wiki/setContent', payload: initialEditorValue })
    } else {
      setIsNewCreateWiki(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, slug])

  useEffect(() => {
    if (isLoadingWiki === false && !wikiData)
      dispatch({ type: 'wiki/setContent', payload: initialEditorValue })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingWiki, wikiData])

  const updatePageTypeTemplate = useCallback(() => {
    const meta = [
      getWikiMetadataById(wiki, CommonMetaIds.PAGE_TYPE),
      getWikiMetadataById(wiki, CommonMetaIds.TWITTER_PROFILE),
    ]
    const pageType = PageTemplate.find(p => p.type === meta[0]?.value)

    dispatch({
      type: 'wiki/setContent',
      payload: String(pageType?.templateText),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wiki.metadata])

  // update the page type template when the page type changes
  const presentPageType = useMemo(
    () =>
      wiki?.metadata?.find((m: MData) => m.id === CommonMetaIds.PAGE_TYPE)
        ?.value,
    [wiki?.metadata],
  )
  useEffect(() => {
    if (presentPageType) {
      let isMdPageTemplate = false
      PageTemplate.forEach(p => {
        if (p.templateText === wiki.content) isMdPageTemplate = true
      })
      if (isMdPageTemplate || wiki.content === ' ') updatePageTypeTemplate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presentPageType])
}

export const useGetSignedHash = (deadline: number) => {
  const {
    setWikiHash,
    wikiHash,
    setMsg,
    setIsLoading,
    setTxHash,
    setActiveStep,
    txHash,
  } = useCreateWikiContext()

  const { data: accountData } = useAccount()

  const {
    data,
    error,
    isLoading: signing,
    signTypedDataAsync,
  } = useSignTypedData()

  const { refetch } = useWaitForTransaction({ hash: txHash })

  const saveHashInTheBlockchain = async (ipfs: string, wikiSlug: string) => {
    setWikiHash(ipfs)

    signTypedDataAsync({
      domain,
      types,
      value: {
        ipfs,
        user: accountData?.address,
        deadline,
      },
    })
      .then(response => {
        if (response) {
          setActiveStep(1)
        } else {
          setIsLoading('error')
          setMsg(errorMessage)
          logEvent({
            action: 'SUBMIT_WIKI_ERROR',
            params: {
              reason: 'SIGN_TRANSACTION_ERROR',
              address: accountData?.address,
              slug: wikiSlug,
            },
          })
        }
      })
      .catch(() => {
        setIsLoading('error')
        setMsg(errorMessage)
        logEvent({
          action: 'SUBMIT_WIKI_ERROR',
          params: {
            reason: 'SIGN_TRANSACTION_ERROR',
            address: accountData?.address,
            slug: wikiSlug,
          },
        })
      })
  }

  const verifyTrxHash = useCallback(
    async (wikiSlug: string) => {
      const timer = setInterval(() => {
        try {
          const checkTrx = async () => {
            const trx = await refetch()
            if (trx.error || trx.data?.status === 0) {
              setIsLoading('error')
              setMsg(errorMessage)
              logEvent({
                action: 'SUBMIT_WIKI_ERROR',
                params: {
                  reason: 'TRANSACTION_VERIFICATION_ERROR',
                  address: accountData?.address,
                  slug: wikiSlug,
                },
              })
              clearInterval(timer)
            }
            if (
              trx &&
              trx.data &&
              trx.data.status === 1 &&
              trx.data.confirmations > 1
            ) {
              setIsLoading(undefined)
              setActiveStep(3)
              setMsg(successMessage)
              clearInterval(timer)
            }
          }
          checkTrx()
        } catch (err) {
          setIsLoading('error')
          setMsg(errorMessage)
          logEvent({
            action: 'SUBMIT_WIKI_ERROR',
            params: {
              reason: 'TRANSACTION_VERIFICATION_ERROR',
              address: accountData?.address,
              slug: wikiSlug,
            },
          })
          clearInterval(timer)
        }
      }, 3000)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [refetch],
  )

  useEffect(() => {
    const getSignedTxHash = async () => {
      if (data && wikiHash && accountData && accountData.address) {
        if (error) {
          setMsg(errorMessage)
          setIsLoading('error')
          return
        }
        try {
          const hash = await submitVerifiableSignature(
            data,
            wikiHash,
            accountData?.address,
            deadline,
          )
          if (hash) {
            setTxHash(hash)
            setActiveStep(2)
          }
        } catch (err) {
          setIsLoading('error')
          setMsg(errorMessage)
          logEvent({
            action: 'SUBMIT_WIKI_ERROR',
            params: {
              reason: 'VERIFIABLE_SIGNATURE_SUBMISSION_ERROR',
              address: accountData?.address,
              data,
            },
          })
        }
      }
    }
    getSignedTxHash()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error])

  return { signing, saveHashInTheBlockchain, verifyTrxHash }
}

export const useCreateWikiState = (router: NextRouter) => {
  const { isLoading: isLoadingWiki, data: wikiData } = useGetWikiQuery(
    typeof router.query.slug === 'string' ? router.query.slug : skipToken,
    {
      skip: router.isFallback,
    },
  )
  const { slug } = router.query
  const [openTxDetailsDialog, setOpenTxDetailsDialog] = useState<boolean>(false)
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
    dispatch,
    slug,
    openTxDetailsDialog,
    setOpenTxDetailsDialog,
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

export const calculateEditInfo = (
  prevWiki: Wiki,
  currWiki: Wiki,
  dispatch: ReturnType<typeof useAppDispatch>,
) => {
  const calculateContentChanged = () => {
    // check if content has changed
    const prevContent = prevWiki?.content
    const currContent = currWiki?.content

    // calculate percent changed and number of words changed in prevContent and currContent
    let contentAdded = 0
    let contentRemoved = 0
    let contentUnchanged = 0

    let wordsAdded = 0
    let wordsRemoved = 0

    diff(prevContent, currContent).forEach(part => {
      if (part[0] === 1) {
        contentAdded += part[1].length
        wordsAdded += getWordCount(part[1])
      }
      if (part[0] === -1) {
        contentRemoved += part[1].length
        wordsRemoved += getWordCount(part[1])
      }
      if (part[0] === 0) {
        contentUnchanged += part[1].length
      }
    })

    const percentChanged =
      ((contentAdded + contentRemoved) / contentUnchanged) * 100
    const wordsChanged = wordsAdded + wordsRemoved

    // update metadata in redux state
    dispatch({
      type: 'wiki/updateMetadata',
      payload: {
        id: EditSpecificMetaIds.WORDS_CHANGED,
        value: wordsChanged.toString(),
      },
    })

    dispatch({
      type: 'wiki/updateMetadata',
      payload: {
        id: EditSpecificMetaIds.PERCENT_CHANGED,
        value: percentChanged.toFixed(2),
      },
    })
  }

  // calculate which blocks have changed
  const blocksChanged = []

  // root level block changes
  if (prevWiki.content !== currWiki.content) {
    blocksChanged.push(WikiRootBlocks.CONTENT)
    calculateContentChanged()
  }
  if (prevWiki.title !== currWiki.title)
    blocksChanged.push(WikiRootBlocks.TITLE)
  if (prevWiki.categories !== currWiki.categories)
    blocksChanged.push('categories')
  if (prevWiki.tags !== currWiki.tags) blocksChanged.push(WikiRootBlocks.TAGS)
  if (prevWiki.summary !== currWiki.summary)
    blocksChanged.push(WikiRootBlocks.SUMMARY)
  const prevImgId = prevWiki.images && prevWiki.images[0].id
  const currImgId = currWiki.images && currWiki.images[0].id
  if (prevImgId !== currImgId) blocksChanged.push(WikiRootBlocks.WIKI_IMAGE)

  // common metadata changes
  Object.values(CommonMetaIds).forEach(id => {
    if (
      getWikiMetadataById(prevWiki, id)?.value !==
      getWikiMetadataById(currWiki, id)?.value
    )
      blocksChanged.push(id)
  })

  // update blocks changed metadata in redux state
  dispatch({
    type: 'wiki/updateMetadata',
    payload: {
      id: EditSpecificMetaIds.BLOCKS_CHANGED,
      value: blocksChanged.join(','),
    },
  })
}

export const isVerifiedContentLinks = (content: string) => {
  const whitelistedDomains = [
    'youtube.com/watch',
    'youtu.be',
    'vimeo.com',
    'alpha.everipedia.org/wiki',
    'ipfs.everipedia.org/ipfs',
  ]
  const markdownLinks = content.match(/\[(.*?)\]\((.*?)\)/g)
  let isValid = true
  markdownLinks?.every(link => {
    const url = link.match(/\((.*?)\)/g)?.[0].replace(/\(|\)/g, '')
    if (url && url.charAt(0) !== '#') {
      // check if url is of whitelisted domains
      const validURLRecognizer = new RegExp(
        `^https?://(www\\.)?(${whitelistedDomains.join('|')})`,
      )
      isValid = validURLRecognizer.test(url)
      return isValid
    }
    return true
  })
  return isValid
}

export const isWikiExists = async (
  slug: string,
  setExistingWikiData: (data: Wiki) => void,
) => {
  const { data, isError } = await store.dispatch(getWiki.initiate(slug))
  if (isError) return false
  if (data) setExistingWikiData(data)
  return true
}
