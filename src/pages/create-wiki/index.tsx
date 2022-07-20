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
} from '@chakra-ui/react'
import {
  getRunningOperationPromises,
  getWiki,
  postWiki,
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
import { authenticatedRoute } from '@/components/AuthenticatedRoute'
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
  calculateEditInfo,
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

type PageWithoutFooter = NextPage & {
  noFooter?: boolean
}

const Editor = dynamic(() => import('@/components/Layout/Editor/Editor'), {
  ssr: false,
})

const deadline = getDeadline()

const CreateWikiContent = () => {
  const wiki = useAppSelector(state => state.wiki)
  const { data: accountData } = useAccount()
  const [commitMessageLimitAlert, setCommitMessageLimitAlert] = useState(false)
  const [commitMessage, setCommitMessage] = useState('')
  const { fireConfetti, confettiProps } = useConfetti()

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

  const getWikiSlug = () => slugifyText(String(wiki.title))

  const isValidWiki = () => {
    if (!wiki.title) {
      toast({
        title: `Add a Title at the top for this Wiki to continue `,
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

    return true
  }

  const saveOnIpfs = async (override?: boolean) => {
    if (!isValidWiki()) return

    logEvent({
      action: 'SUBMIT_WIKI',
      params: { address: accountData?.address, slug: getWikiSlug() },
    })

    if (accountData) {
      if (
        isNewCreateWiki &&
        !override &&
        (await isWikiExists(getWikiSlug(), setExistingWikiData))
      ) {
        setOpenOverrideExistingWikiDialog(true)
        return
      }
      if (isNewCreateWiki) {
        dispatch({
          type: 'wiki/updateMetadata',
          payload: {
            id: EditSpecificMetaIds.COMMIT_MESSAGE,
            value: override ? 'Wiki Overridden 🔄' : 'New Wiki Created 🎉',
          },
        })
      }

      setOpenTxDetailsDialog(true)
      setSubmittingWiki(true)

      let interWiki = { ...wiki }
      if (interWiki.id === CreateNewWikiSlug) interWiki.id = getWikiSlug()
      setWikiId(interWiki.id)

      if (accountData.address) {
        interWiki = {
          ...interWiki,
          user: {
            id: accountData.address,
          },
          content: String(wiki.content).replace(/\n/gm, '  \n'),
        }
      }

      if (!isNewCreateWiki) {
        // calculate edit info for current wiki and previous wiki
        // previous wiki varies if editor is trying to publish
        // more than two edits to chain in same session

        if (prevEditedWiki.current.isPublished && prevEditedWiki.current.wiki) {
          calculateEditInfo(prevEditedWiki.current.wiki, interWiki, dispatch)
        } else if (wikiData) {
          calculateEditInfo(wikiData, interWiki, dispatch)
        }
      }

      // Build the wiki object after edit info has been calculated
      const finalWiki = {
        ...interWiki,
        metadata: store.getState().wiki.metadata.filter(meta => {
          return meta.value !== '' || meta.id === CommonMetaIds.REFERENCES
        }),
      }

      prevEditedWiki.current = { wiki: finalWiki, isPublished: false }

      const wikiResult = await store.dispatch(
        postWiki.initiate({ data: finalWiki }),
      )

      if (wikiResult && 'data' in wikiResult) {
        saveHashInTheBlockchain(String(wikiResult.data), getWikiSlug())
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
          params: {
            reason: logReason,
            address: accountData?.address,
            slug: getWikiSlug(),
          },
        })
      }

      // clear all edit based metadata from redux state
      Object.values(EditSpecificMetaIds).forEach(id => {
        dispatch({
          type: 'wiki/updateMetadata',
          payload: {
            id,
            value: '',
          },
        })
      })

      setSubmittingWiki(false)
    }
  }

  const disableSaveButton = () =>
    isWritingCommitMsg ||
    submittingWiki ||
    !accountData?.address ||
    signing ||
    isLoadingWiki

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
              {draft?.id === CreateNewWikiSlug ? 'Reset State' : 'Fetch Latest'}
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

      dispatch({
        type: 'wiki/setInitialWikiState',
        payload: {
          ...initWikiData,
          content:
            EditorContentOverride.KEYWORD +
            initWikiData.content.replace(/ {2}\n/gm, '\n'),
          metadata,
        },
      })
    }
  }, [dispatch, toast, wikiData])

  useEffect(() => {
    if (txHash) verifyTrxHash(getWikiSlug())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txHash, verifyTrxHash])

  const handlePopupClose = () => {
    setMsg(initialMsg)
    setIsLoading('loading')
    setActiveStep(0)
    setOpenTxDetailsDialog(false)
  }
  const { t } = useTranslation()

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
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
            color="linkColor"
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
          />
        </InputGroup>
        {!isNewCreateWiki ? (
          // Publish button with commit message for wiki edit
          <Popover onClose={() => setIsWritingCommitMsg(false)}>
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
                mb={24}
              >
                Publish
              </Button>
            </PopoverTrigger>
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
                      dispatch({
                        type: 'wiki/updateMetadata',
                        payload: {
                          id: EditSpecificMetaIds.COMMIT_MESSAGE,
                          value: e.target.value,
                        },
                      })
                    } else {
                      setCommitMessageLimitAlert(true)
                      setTimeout(() => setCommitMessageLimitAlert(false), 2000)
                    }
                  }}
                />
              </PopoverBody>
              <PopoverFooter>
                <HStack spacing={2} justify="right">
                  <Button
                    onClick={() => {
                      dispatch({
                        type: 'wiki/updateMetadata',
                        payload: {
                          id: EditSpecificMetaIds.COMMIT_MESSAGE,
                          value: '',
                        },
                      })
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
          <Button
            onClick={() => {
              saveOnIpfs()
            }}
          >
            Publish
          </Button>
        )}
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
            <Editor markdown={wiki.content} onChange={handleOnEditorChanges} />
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
          slug={getWikiSlug()}
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
  }
  await Promise.all(getRunningOperationPromises())
  return {
    props: {},
  }
}

export default Page
