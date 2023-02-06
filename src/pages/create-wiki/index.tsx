import React, { useEffect, useRef, memo, useMemo } from 'react'
import dynamic from 'next/dynamic'
import {
  Flex,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Center,
  Skeleton,
  Box,
  HStack,
  Text,
} from '@chakra-ui/react'
import {
  getIsWikiSlugValid,
  getWiki,
  postWiki,
  wikiApi,
} from '@/services/wikis'
import { useRouter } from 'next/router'
import { store } from '@/store/store'
import { GetServerSideProps, NextPage } from 'next'
import { useAccount } from 'wagmi'
import ReactCanvasConfetti from 'react-canvas-confetti'

import WikiDetailsSidebar from '@/components/CreateWiki/WikiDetailsSidebar'
import { useAppSelector } from '@/store/hook'
import { authenticatedRoute } from '@/components/WrapperRoutes/AuthenticatedRoute'
import WikiProcessModal from '@/components/CreateWiki/EditorModals/WikiProcessModal'
import {
  Wiki,
  CommonMetaIds,
  EditSpecificMetaIds,
  EditorContentOverride,
  CreateNewWikiSlug,
} from '@everipedia/iq-utils'
import { logEvent } from '@/utils/googleAnalytics'
import {
  initialMsg,
  useCreateWikiState,
  CreateWikiProvider,
  useGetSignedHash,
  useCreateWikiEffects,
  useCreateWikiContext,
  defaultErrorMessage,
  isWikiExists,
  ValidationErrorMessage,
  sanitizeContentToPublish,
} from '@/utils/CreateWikiUtils/createWiki'
import { slugifyText } from '@/utils/textUtils'
import OverrideExistingWikiDialog from '@/components/CreateWiki/EditorModals/OverrideExistingWikiDialog'
import {
  getDraftFromLocalStorage,
  removeDraftFromLocalStorage,
} from '@/store/slices/wiki.slice'
import useConfetti from '@/hooks/useConfetti'
import { useWhiteListValidator } from '@/hooks/useWhiteListValidator'
import CreateWikiPageHeader from '@/components/SEO/CreateWikiPage'
import { getWikiMetadataById } from '@/utils/WikiUtils/getWikiFields'
import { isValidWiki } from '@/utils/CreateWikiUtils/isValidWiki'
import { CreateWikiTopBar } from '../../components/CreateWiki/CreateWikiTopBar/index'

type PageWithoutFooter = NextPage & {
  noFooter?: boolean
}

const Editor = dynamic(() => import('@/components/CreateWiki/Editor'), {
  ssr: false,
})

const CreateWikiContent = () => {
  const wiki = useAppSelector(state => state.wiki)
  const { address: userAddress, isConnected: isUserConnected } = useAccount()
  const { fireConfetti, confettiProps } = useConfetti()
  const { userCanEdit } = useWhiteListValidator(userAddress)

  const {
    isLoadingWiki,
    wikiData,
    commitMessage,
    setCommitMessage,
    dispatch,
    toast,
    openTxDetailsDialog,
    setOpenTxDetailsDialog,
    isWritingCommitMsg,
    setIsWritingCommitMsg,
    txHash,
    submittingWiki,
    setSubmittingWiki,
    wikiHash,
    revision,
    isNewCreateWiki,
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
  } = useCreateWikiContext()

  const prevEditedWiki = useRef<{ wiki?: Wiki; isPublished: boolean }>({
    wiki: wikiData,
    isPublished: false,
  })

  const { saveHashInTheBlockchain, signing, verifyTrxHash } = useGetSignedHash()

  const getWikiSlug = async () => {
    const slug = slugifyText(String(wiki.title))
    const { data: result } = await store.dispatch(
      getIsWikiSlugValid.initiate(slug),
    )
    if (result?.id) return result.id
    return slug
  }

  const saveOnIpfs = async (override?: boolean) => {
    if (!isValidWiki(toast, wiki)) return

    logEvent({
      action: 'SUBMIT_WIKI',
      label: await getWikiSlug(),
      category: 'wiki_title',
      value: 1,
    })

    let wikiCommitMessage = commitMessage || ''

    if (isUserConnected && userAddress) {
      if (
        isNewCreateWiki &&
        !override &&
        (await isWikiExists(await getWikiSlug(), setExistingWikiData))
      ) {
        setOpenOverrideExistingWikiDialog(true)
        return
      }

      if (isNewCreateWiki) {
        if (override) {
          wikiCommitMessage = 'Wiki Overridden 🔄'
        } else if (revision) {
          wikiCommitMessage = `Reverted to revision ${revision} ⏪`
        } else {
          wikiCommitMessage = 'New Wiki Created 🎉'
        }
      }

      setOpenTxDetailsDialog(true)
      setSubmittingWiki(true)

      const finalWiki = {
        ...wiki,
        user: { id: userAddress },
        content: sanitizeContentToPublish(String(wiki.content)),
        category: 'daos',
        metadata: [
          ...wiki.metadata.filter(
            m => m.id !== EditSpecificMetaIds.COMMIT_MESSAGE,
          ),
          { id: EditSpecificMetaIds.COMMIT_MESSAGE, value: wikiCommitMessage },
        ].filter(m => m.value),
      }

      if (finalWiki.id === CreateNewWikiSlug) finalWiki.id = await getWikiSlug()
      setWikiId(finalWiki.id)

      prevEditedWiki.current = { wiki: finalWiki, isPublished: false }

      const wikiResult = await store.dispatch(
        postWiki.initiate({ data: finalWiki }),
      )

      if (wikiResult && 'data' in wikiResult) {
        saveHashInTheBlockchain(String(wikiResult.data))
      } else {
        setIsLoading('error')
        let logReason = 'NO_IPFS'
        // get error message from wikiResult
        if (wikiResult && 'error' in wikiResult) {
          const rawErrMsg = wikiResult.error.message
          const prefix = 'Http Exception:'
          if (rawErrMsg?.startsWith(prefix)) {
            const errObjString = rawErrMsg.substring(prefix.length)
            const errObj = JSON.parse(errObjString)
            // eslint-disable-next-line no-console
            console.error({ ...errObj })
            const wikiError =
              errObj.response.errors[0].extensions.exception.response
            logReason = wikiError.error
            setMsg(ValidationErrorMessage(logReason))
          } else {
            setMsg(defaultErrorMessage)
          }
        }
        logEvent({
          action: 'SUBMIT_WIKI_ERROR',
          label: await getWikiSlug(),
          category: 'wiki_error',
          value: 1,
        })
      }

      setSubmittingWiki(false)
    }
  }

  const disableSaveButton = () =>
    isWritingCommitMsg ||
    submittingWiki ||
    !userAddress ||
    signing ||
    isLoadingWiki ||
    !userCanEdit

  const handleOnEditorChanges = (
    val: string | undefined,
    isInitSet?: boolean,
  ) => {
    if (isInitSet)
      dispatch({
        type: 'wiki/setInitialWikiState',
        payload: {
          content: val || ' ',
        },
      })
    else
      dispatch({
        type: 'wiki/setContent',
        payload: val || ' ',
      })
  }

  useCreateWikiEffects(wiki, prevEditedWiki)

  useEffect(() => {
    if (activeStep === 3) {
      prevEditedWiki.current.isPublished = true
      fireConfetti()
    }
  }, [activeStep, fireConfetti])

  useEffect(() => {
    // get draft wiki if it exists
    let draft: Wiki | undefined
    if (isNewCreateWiki) draft = getDraftFromLocalStorage()
    else if (wikiData) draft = getDraftFromLocalStorage()

    if (!toast.isActive('draft-loaded') && draft) {
      toast({
        id: 'draft-loaded',
        title: (
          <HStack w="full" justify="space-between" align="center">
            <Text>Loaded from saved draft</Text>
            <Button
              size="xs"
              variant="outline"
              onClick={() => {
                removeDraftFromLocalStorage()
                // reload the page to remove the draft
                window.location.reload()
              }}
              sx={{
                '&:hover, &:focus, &:active': {
                  bgColor: '#0000002a',
                },
              }}
            >
              {draft?.id === CreateNewWikiSlug
                ? 'Reset State'
                : 'Reset to current wiki content'}
            </Button>
          </HStack>
        ),
        status: 'info',
        duration: 5000,
      })
    }
  }, [isNewCreateWiki, toast, wikiData])

  useEffect(() => {
    let initWikiData: Wiki | undefined
    if (wikiData) initWikiData = getDraftFromLocalStorage()

    // combine draft wiki data with existing wikidata images
    // if the draft doesn't modify the images
    if (initWikiData && wikiData && !initWikiData.images)
      if (wikiData.images && wikiData.images.length > 0)
        initWikiData.images = wikiData.images

    // if there is no draft stored, use fetched wiki data
    if (!initWikiData) initWikiData = wikiData

    if (
      initWikiData &&
      initWikiData.content.length > 0 &&
      initWikiData.images &&
      initWikiData.images.length > 0
    ) {
      let { metadata } = initWikiData

      // fetch the currently stored meta data of page that are not edit specific
      // (commonMetaIds) and append edit specific meta data (editMetaIds) with empty values
      const wikiDt = initWikiData
      metadata = [
        ...Object.values(CommonMetaIds).map(mId => {
          const meta = getWikiMetadataById(wikiDt, mId)
          return { id: mId, value: meta?.value || '' }
        }),
        ...Object.values(EditSpecificMetaIds).map(mId => ({
          id: mId,
          value: '',
        })),
      ]

      if (revision) {
        setCommitMessage(`Reverted to revision ${revision} ⏪`)
      }

      dispatch({
        type: 'wiki/setInitialWikiState',
        payload: {
          ...initWikiData,
          content:
            EditorContentOverride +
            initWikiData.content.replace(/ {2}\n/gm, '\n'),
          metadata,
        },
      })
    }
  }, [dispatch, revision, setCommitMessage, toast, wikiData])

  useEffect(() => {
    async function verifyTransactionHash() {
      if (txHash) verifyTrxHash()
    }
    verifyTransactionHash()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txHash, verifyTrxHash])

  const handlePopupClose = () => {
    setMsg(initialMsg)
    setIsLoading('loading')
    setActiveStep(0)
    setOpenTxDetailsDialog(false)
  }

  return (
    <>
      <CreateWikiPageHeader />
      <Box scrollBehavior="auto" maxW="1900px" mx="auto">
        <ReactCanvasConfetti {...confettiProps} />
        <CreateWikiTopBar />
        <Flex
          flexDirection={{ base: 'column', xl: 'row' }}
          justify="center"
          align="stretch"
          gap={4}
          px={{ base: 4, xl: 8 }}
        >
          <Box h="full" w="full" position={{ xl: 'sticky' }} top="90px">
            <Skeleton isLoaded={!isLoadingWiki} w="full" h="75vh">
              <Editor
                markdown={wiki.content}
                onChange={handleOnEditorChanges}
              />
            </Skeleton>
          </Box>
          <Box>
            <Skeleton isLoaded={!isLoadingWiki} w="full" h="full">
              <Center>
                <WikiDetailsSidebar
                  initialImage={wiki?.images?.length ? wiki.images[0].id : ''}
                  isToResetImage={isNewCreateWiki}
                />
              </Center>
            </Skeleton>
          </Box>
          <OverrideExistingWikiDialog
            isOpen={openOverrideExistingWikiDialog}
            publish={() => {
              setOpenOverrideExistingWikiDialog(false)
              saveOnIpfs(true)
            }}
            onClose={() => setOpenOverrideExistingWikiDialog(false)}
            getSlug={getWikiSlug}
            existingWikiData={existingWikiData}
          />
          <WikiProcessModal
            wikiId={wikiId}
            msg={msg}
            txHash={txHash}
            wikiHash={wikiHash}
            activeStep={activeStep}
            state={loadingState}
            isOpen={openTxDetailsDialog}
            onClose={() => handlePopupClose()}
          />
        </Flex>
        <Skeleton isLoaded={!isLoadingWiki} w="full" h="full">
          <Flex direction="column" justifyContent="center" alignItems="center">
            {txError.opened && (
              <Alert status="error" maxW="md" mb="3">
                <AlertIcon />
                <AlertTitle>{txError.title}</AlertTitle>
                <AlertDescription>{txError.description}</AlertDescription>
                <CloseButton
                  onClick={() =>
                    setTxError({
                      title: '',
                      description: '',
                      opened: false,
                    })
                  }
                  position="absolute"
                  right="5px"
                />
              </Alert>
            )}
          </Flex>
        </Skeleton>
      </Box>
    </>
  )
}

const CreateWiki = () => {
  const router = useRouter()
  const wikiState = useCreateWikiState(router)
  const providerValue = useMemo(() => wikiState, [wikiState])
  return (
    <CreateWikiProvider value={providerValue}>
      <CreateWikiContent />
    </CreateWikiProvider>
  )
}

const Page: PageWithoutFooter = authenticatedRoute(
  memo(CreateWiki) as unknown as () => JSX.Element,
)

Page.noFooter = true

export const getServerSideProps: GetServerSideProps = async context => {
  const slug = context.params?.slug
  if (typeof slug === 'string') {
    store.dispatch(getWiki.initiate(slug))
    await Promise.all(store.dispatch(wikiApi.util.getRunningQueriesThunk()))
  }
  return {
    props: {},
  }
}

export default Page
