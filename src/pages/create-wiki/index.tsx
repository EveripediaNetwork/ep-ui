import React, {
  useEffect,
  useRef,
  memo,
  useState,
  ChangeEvent,
  useMemo,
} from 'react'
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
  Input,
  InputLeftElement,
  InputGroup,
  Icon,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Tag,
  Text,
  Tooltip,
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
import { MdTitle } from 'react-icons/md'
import ReactCanvasConfetti from 'react-canvas-confetti'

import Highlights from '@/components/Layout/Editor/Highlights/Highlights'
import { useAppSelector } from '@/store/hook'
import { getWikiMetadataById } from '@/utils/getWikiFields'
import { getDeadline } from '@/utils/getDeadline'
import { authenticatedRoute } from '@/components/WrapperRoutes/AuthenticatedRoute'
import WikiProcessModal from '@/components/Elements/Modal/WikiProcessModal'
import { getWordCount } from '@/utils/getWordCount'
import {
  Wiki,
  CommonMetaIds,
  EditSpecificMetaIds,
  EditorContentOverride,
  CreateNewWikiSlug,
} from '@/types/Wiki'
import { logEvent } from '@/utils/googleAnalytics'
import {
  initialMsg,
  MINIMUM_WORDS,
  useCreateWikiState,
  CreateWikiProvider,
  useGetSignedHash,
  useCreateWikiEffects,
  useCreateWikiContext,
  defaultErrorMessage,
  isVerifiedContentLinks,
  isWikiExists,
  ValidationErrorMessage,
} from '@/utils/create-wiki'
import { useTranslation } from 'react-i18next'
import { slugifyText } from '@/utils/slugify'
import OverrideExistingWikiDialog from '@/components/Elements/Modal/OverrideExistingWikiDialog'
import {
  getDraftFromLocalStorage,
  removeDraftFromLocalStorage,
} from '@/store/slices/wiki.slice'
import useConfetti from '@/hooks/useConfetti'
import WikiScoreIndicator from '@/components/Layout/Editor/WikiScoreIndicator'
import { useWhiteListValidator } from '@/hooks/useWhiteListValidator'
import { MEDIA_POST_DEFAULT_ID, WIKI_SUMMARY_LIMIT } from '@/data/Constants'
import CreateWikiPageHeader from '@/components/SEO/CreateWikiPage'

type PageWithoutFooter = NextPage & {
  noFooter?: boolean
}

const Editor = dynamic(() => import('@/components/Layout/Editor/Editor'), {
  ssr: false,
})

const deadline = getDeadline()

const CreateWikiContent = () => {
  const wiki = useAppSelector(state => state.wiki)
  const { address: userAddress, isConnected: isUserConnected } = useAccount()
  const [commitMessageLimitAlert, setCommitMessageLimitAlert] = useState(false)
  const { fireConfetti, confettiProps } = useConfetti()
  const { userCanEdit } = useWhiteListValidator(userAddress)

  const commitMessageLimitAlertStyle = {
    sx: {
      bgColor: '#d406082a',
      '&:focus': {
        borderColor: '#ff787c',
        boxShadow: '0 0 0 1px #ff787c',
      },
    },
  }

  const baseStyle = {
    sx: {
      bgColor: 'transparent',
      '&:focus': {
        borderColor: '#63b3ed',
        boxShadow: '0 0 0 1px #63b3ed',
      },
    },
  }

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

  const { saveHashInTheBlockchain, signing, verifyTrxHash } =
    useGetSignedHash(deadline)

  const getWikiSlug = async () => {
    const slug = slugifyText(String(wiki.title))
    const { data: result } = await store.dispatch(
      getIsWikiSlugValid.initiate(slug),
    )
    if (result?.id) return result.id
    return slug
  }

  const isValidWiki = () => {
    if (!wiki.title) {
      toast({
        title: `Add a Title at the top for this Wiki to continue `,
        status: 'error',
        duration: 3000,
      })
      return false
    }

    if (wiki.title.length > 60) {
      toast({
        title: `Title should be less than 60 characters`,
        status: 'error',
        duration: 3000,
      })
      return false
    }

    const words = getWordCount(wiki.content || '')

    if (words < MINIMUM_WORDS) {
      toast({
        title: `Add a minimum of ${MINIMUM_WORDS} words in the content section to continue, you have written ${words}`,
        status: 'error',
        duration: 3000,
      })
      return false
    }

    if (!isVerifiedContentLinks(wiki.content)) {
      toast({
        title: 'Please remove all external links from the content',
        status: 'error',
        duration: 3000,
      })
      return false
    }

    if (!wiki.images?.length) {
      toast({
        title: 'Add a main image on the right column to continue',
        status: 'error',
        duration: 3000,
      })
      return false
    }

    if (wiki.categories.length === 0) {
      toast({
        title: 'Add one category to continue',
        status: 'error',
        duration: 3000,
      })
      return false
    }

    if (!wiki.media?.every(m => !m.id.endsWith(MEDIA_POST_DEFAULT_ID))) {
      toast({
        title: 'Some of media are still uploading, please wait',
        status: 'error',
        duration: 3000,
      })
      return false
    }

    if (wiki.summary && wiki.summary.length > WIKI_SUMMARY_LIMIT) {
      toast({
        title: `Summary exceeds maximum limit of ${WIKI_SUMMARY_LIMIT}`,
        status: 'error',
        duration: 3000,
      })
    }
    return true
  }

  const saveOnIpfs = async (override?: boolean) => {
    if (!isValidWiki()) return

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
        content: String(wiki.content)
          .replace(/\n/gm, '  \n')
          .replace(EditorContentOverride, '')
          .replace(/<\/?em>/gm, '*')
          .replace(/<\/?strong>/gm, '**')
          .replace(/<\/?del>/gm, '~~')
          .replace(/^(#+\s)(\*\*)(.+)(\*\*)/gm, '$1$3'),
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
  const { t } = useTranslation()

  return (
    <>
      <CreateWikiPageHeader />
      <Box scrollBehavior="auto" maxW="1900px" mx="auto">
        <ReactCanvasConfetti {...confettiProps} />
        <HStack
          boxShadow="sm"
          borderRadius={4}
          borderWidth="1px"
          p={3}
          justifyContent="space-between"
          mx="auto"
          mb={3}
          mt={2}
          w="96%"
        >
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={MdTitle} color="gray.400" fontSize="25px" />
            </InputLeftElement>
            <Input
              fontWeight="500"
              color="wikiTitleInputText"
              borderColor="transparent"
              fontSize="18px"
              variant="flushed"
              maxW="max(50%, 300px)"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                dispatch({
                  type: 'wiki/setCurrentWiki',
                  payload: { title: event.target.value },
                })
              }}
              value={wiki.title}
              placeholder={`${t('wikiTitlePlaceholder')}`}
              _placeholder={{ color: 'wikiTitleInputText' }}
            />
          </InputGroup>

          <HStack gap={5}>
            <WikiScoreIndicator wiki={wiki} />
            {!isNewCreateWiki ? (
              // Publish button with commit message for wiki edit
              <Popover onClose={() => setIsWritingCommitMsg(false)}>
                <Tooltip
                  display={!userCanEdit ? 'block' : 'none'}
                  p={2}
                  rounded="md"
                  placement="bottom-start"
                  shouldWrapChildren
                  color="white"
                  bg="toolTipBg"
                  hasArrow
                  label="Your address is not yet whitelisted"
                  mt="3"
                >
                  <Box display="inline-block">
                    <PopoverTrigger>
                      <Button
                        isLoading={submittingWiki}
                        _disabled={{
                          opacity: disableSaveButton() ? 0.5 : undefined,
                          _hover: {
                            bgColor: 'grey !important',
                            cursor: 'not-allowed',
                          },
                        }}
                        loadingText="Loading"
                        disabled={disableSaveButton()}
                        onClick={() => setIsWritingCommitMsg(true)}
                      >
                        Publish
                      </Button>
                    </PopoverTrigger>
                  </Box>
                </Tooltip>
                <PopoverContent m={4}>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>
                    Commit Message <small>(Optional)</small>{' '}
                  </PopoverHeader>
                  <PopoverBody>
                    <Tag
                      mb={{ base: 2, lg: 2 }}
                      variant="solid"
                      colorScheme={
                        // eslint-disable-next-line no-nested-ternary
                        commitMessageLimitAlert
                          ? 'red'
                          : (commitMessage?.length || '') > 50
                          ? 'green'
                          : 'yellow'
                      }
                    >
                      {commitMessage?.length || 0}/128
                    </Tag>
                    <Textarea
                      value={commitMessage}
                      placeholder="Enter what changed..."
                      {...(commitMessageLimitAlert
                        ? commitMessageLimitAlertStyle
                        : baseStyle)}
                      onChange={(e: { target: { value: string } }) => {
                        if (e.target.value.length <= 128) {
                          setCommitMessage(e.target.value)
                        } else {
                          setCommitMessageLimitAlert(true)
                          setTimeout(
                            () => setCommitMessageLimitAlert(false),
                            2000,
                          )
                        }
                      }}
                    />
                  </PopoverBody>
                  <PopoverFooter>
                    <HStack spacing={2} justify="right">
                      <Button
                        onClick={() => {
                          setCommitMessage('')
                          setIsWritingCommitMsg(false)
                          saveOnIpfs()
                        }}
                        float="right"
                        variant="outline"
                      >
                        Skip
                      </Button>
                      <Button
                        onClick={() => {
                          setIsWritingCommitMsg(false)
                          saveOnIpfs()
                        }}
                      >
                        Submit
                      </Button>
                    </HStack>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
            ) : (
              // Publish button without commit message at new create wiki
              <Tooltip
                display={!userCanEdit ? 'block' : 'none'}
                p={2}
                rounded="md"
                placement="bottom-start"
                shouldWrapChildren
                color="white"
                bg="toolTipBg"
                hasArrow
                label="Your address is not yet whitelisted"
                mt="3"
              >
                <Button
                  onClick={() => {
                    saveOnIpfs()
                  }}
                  disabled={!userCanEdit}
                  _disabled={{
                    opacity: disableSaveButton() ? 0.5 : undefined,
                    _hover: {
                      bgColor: 'grey !important',
                      cursor: 'not-allowed',
                    },
                  }}
                >
                  Publish
                </Button>
              </Tooltip>
            )}
          </HStack>
        </HStack>
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
                <Highlights
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
