import React, { useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import {
  Flex,
  Button,
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
import WikiDetailsSidebar from '@/components/CreateWiki/WikiDetailsSidebar'
import { useAppSelector } from '@/store/hook'
import {
  Wiki,
  CommonMetaIds,
  EditSpecificMetaIds,
  EditorContentOverride,
  CreateNewWikiSlug,
} from '@everipedia/iq-utils'
import {
  getDraftFromLocalStorage,
  removeDraftFromLocalStorage,
} from '@/store/slices/wiki.slice'
import CreateWikiPageHeader from '@/components/SEO/CreateWikiPage'
import { getWikiMetadataById } from '@/utils/WikiUtils/getWikiFields'
import {
  CreateWikiProvider,
  useCreateWikiContext,
  useCreateWikiState,
} from '@/hooks/useCreateWikiState'
import { useCreateWikiEffects } from '@/hooks/useCreateWikiEffects'
import TxErrorAlert from '@/components/CreateWiki/TxError'
import { CreateWikiTopBar } from '../../components/CreateWiki/CreateWikiTopBar/index'
import { authenticatedRoute } from '@/components/WrapperRoutes/AuthenticatedRoute'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { WagmiWrapper } from '@/components/Layout/WagmiWrapper'
import isDeepEqual from '@everipedia/iq-utils/build/main/lib/isDeepEqual'

type PageWithoutFooter = NextPage & {
  noFooter?: boolean
}

const Editor = dynamic(() => import('@/components/CreateWiki/Editor'), {
  ssr: false,
})

const CreateWikiContent = () => {
  const wiki = useAppSelector(state => state.wiki)

  const {
    isLoadingWiki,
    wikiData,
    setCommitMessage,
    dispatch,
    toast,
    revision,
    isNewCreateWiki,
    txError,
    setTxError,
  } = useCreateWikiContext()

  const handleOnEditorChanges = (
    val: string | undefined,
    isInitSet?: boolean,
  ) => {
    if (isInitSet)
      dispatch({
        type: 'wiki/setInitialWikiState',
        payload: {
          content: val ?? ' ',
        },
      })
    else
      dispatch({
        type: 'wiki/setContent',
        payload: val ?? ' ',
      })
  }

  useCreateWikiEffects()

  useEffect(() => {
    let draft: Wiki | undefined

    // Load the draft from local storage if creating a new wiki or if wiki data exists
    if (isNewCreateWiki || wikiData) {
      draft = getDraftFromLocalStorage()
    }

    // Use the isDeepEqual function to compare the loaded draft and current wiki data
    const isDraftDifferent = draft && !isDeepEqual(draft, wikiData)

    if (!toast.isActive('draft-loaded') && draft && isDraftDifferent) {
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
      initWikiData?.content?.length > 0 &&
      initWikiData?.images &&
      initWikiData?.images?.length > 0
    ) {
      let { metadata } = initWikiData

      // fetch the currently stored meta data of page that are not edit specific
      // (commonMetaIds) and append edit specific meta data (editMetaIds) with empty values
      const wikiDt = initWikiData
      metadata = [
        ...Object.values(CommonMetaIds).map(mId => {
          const meta = getWikiMetadataById(wikiDt, mId)
          return { id: mId, value: meta?.value ?? '' }
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

  return (
    <>
      <CreateWikiPageHeader />
      <Box scrollBehavior="auto" maxW="1900px" mx="auto">
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
        </Flex>
        <Skeleton isLoaded={!isLoadingWiki} w="full" h="full">
          <TxErrorAlert txError={txError} setTxError={setTxError} />
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
    <WagmiWrapper>
      <CreateWikiProvider value={providerValue}>
        <CreateWikiContent />
      </CreateWikiProvider>
    </WagmiWrapper>
  )
}

const Page: PageWithoutFooter = authenticatedRoute(
  CreateWiki as () => JSX.Element,
)

Page.noFooter = true

export const getServerSideProps: GetServerSideProps = async context => {
  const slug = context.params?.slug
  if (typeof slug === 'string') {
    store.dispatch(getWiki.initiate(slug))
    await Promise.all(store.dispatch(wikiApi.util.getRunningQueriesThunk()))
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? 'en', [
        'common',
        'wiki',
      ])),
    },
  }
}

export default Page
