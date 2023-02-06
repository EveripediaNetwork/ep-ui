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
import { getWiki, wikiApi } from '@/services/wikis'
import { useRouter } from 'next/router'
import { store } from '@/store/store'
import { GetServerSideProps, NextPage } from 'next'
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
import {
  initialMsg,
  useCreateWikiState,
  CreateWikiProvider,
  useCreateWikiEffects,
  useCreateWikiContext,
} from '@/utils/CreateWikiUtils/createWiki'
import {
  getDraftFromLocalStorage,
  removeDraftFromLocalStorage,
} from '@/store/slices/wiki.slice'
import useConfetti from '@/hooks/useConfetti'
import CreateWikiPageHeader from '@/components/SEO/CreateWikiPage'
import { getWikiMetadataById } from '@/utils/WikiUtils/getWikiFields'
import { CreateWikiTopBar } from '../../components/CreateWiki/CreateWikiTopBar/index'

type PageWithoutFooter = NextPage & {
  noFooter?: boolean
}

const Editor = dynamic(() => import('@/components/CreateWiki/Editor'), {
  ssr: false,
})

const CreateWikiContent = () => {
  const wiki = useAppSelector(state => state.wiki)
  const { fireConfetti, confettiProps } = useConfetti()

  const {
    isLoadingWiki,
    wikiData,
    setCommitMessage,
    dispatch,
    toast,
    openTxDetailsDialog,
    setOpenTxDetailsDialog,
    txHash,
    wikiHash,
    revision,
    isNewCreateWiki,

    activeStep,
    setActiveStep,
    loadingState,
    setIsLoading,
    wikiId,
    msg,
    setMsg,
    txError,
    setTxError,
  } = useCreateWikiContext()

  const prevEditedWiki = useRef<{ wiki?: Wiki; isPublished: boolean }>({
    wiki: wikiData,
    isPublished: false,
  })

  // const disableSaveButton = () =>
  //   submittingWiki || !userAddress || signing || isLoadingWiki || !userCanEdit

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
