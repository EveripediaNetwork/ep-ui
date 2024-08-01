import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Flex, Center, Skeleton, Box } from '@chakra-ui/react'
import { getWiki, wikiApi } from '@/services/wikis'
import { useRouter } from 'next/router'
import { store } from '@/store/store'
import type { GetServerSideProps, NextPage } from 'next'
import WikiDetailsSidebar from '@/components/CreateWiki/WikiDetailsSidebar'
import { useAppSelector } from '@/store/hook'
import CreateWikiPageHeader from '@/components/SEO/CreateWikiPage'
import {
  CreateWikiProvider,
  useCreateWikiContext,
  useCreateWikiState,
} from '@/hooks/useCreateWikiState'
import TxErrorAlert from '@/components/CreateWiki/TxError'
import { CreateWikiTopBar } from '../../components/CreateWiki/CreateWikiTopBar/index'
import { authenticatedRoute } from '@/components/WrapperRoutes/AuthenticatedRoute'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import useCreateWikiSetup from '@/hooks/createWiki/useCreateWikiSetup'
import useDraftNotifications from '@/hooks/createWiki/useDraftNotification'

type PageWithoutFooter = NextPage & {
  noFooter?: boolean
}

const Editor = dynamic(() => import('@/components/CreateWiki/Editor'), {
  ssr: false,
})

const CreateWikiContent = () => {
  const wiki = useAppSelector((state) => state.wiki)

  const { isLoadingWiki, isNewCreateWiki, txError, setTxError } =
    useCreateWikiContext()

  const { handleOnEditorChanges } = useCreateWikiSetup()

  useDraftNotifications()

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
    <CreateWikiProvider value={providerValue}>
      <CreateWikiContent />
    </CreateWikiProvider>
  )
}

const Page: PageWithoutFooter = authenticatedRoute(
  CreateWiki as () => JSX.Element,
)

Page.noFooter = true

export const getServerSideProps: GetServerSideProps = async (context) => {
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
