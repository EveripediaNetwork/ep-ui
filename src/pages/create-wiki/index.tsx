import React, {
  useContext,
  useEffect,
  useRef,
  memo,
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
  useToast,
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
} from '@chakra-ui/react'
import {
  getRunningOperationPromises,
  getWiki,
  postWiki,
} from '@/services/wikis'
import { useRouter } from 'next/router'
import { store } from '@/store/store'
import { GetServerSideProps } from 'next'
import { useAccount } from 'wagmi'
import { MdTitle } from 'react-icons/md'
import slugify from 'slugify'

import Highlights from '@/components/Layout/Editor/Highlights/Highlights'
import { useAppSelector } from '@/store/hook'
import { getWikiMetadataById } from '@/utils/getWikiFields'
import { getDeadline } from '@/utils/getDeadline'
import { ImageContext, ImageKey, ImageStateType } from '@/context/image.context'
import { authenticatedRoute } from '@/components/AuthenticatedRoute'
import WikiProcessModal from '@/components/Elements/Modal/WikiProcessModal'
import { getWordCount } from '@/utils/getWordCount'
import { Wiki, CommonMetaIds, EditSpecificMetaIds } from '@/types/Wiki'
import { logEvent } from '@/utils/googleAnalytics'
import {
  initialMsg,
  MINIMUM_WORDS,
  useCreateWikiState,
  saveImage,
  calculateEditInfo,
  CreateWikiProvider,
  useGetSignedHash,
  useCreateWikiEffects,
} from '@/utils/create-wiki'

const Editor = dynamic(() => import('@/components/Layout/Editor/Editor'), {
  ssr: false,
})

const deadline = getDeadline()

const CreateWiki = () => {
  const wiki = useAppSelector(state => state.wiki)
  const router = useRouter()
  const toast = useToast()

  const { image, ipfsHash, updateImageState, isWikiBeingEdited } =
    useContext<ImageStateType>(ImageContext)
  const [{ data: accountData }] = useAccount()

  const wikiState = useCreateWikiState(router)
  const {
    isLoadingWiki,
    wikiData,
    dispatch,
    md,
    setMd,
    openTxDetailsDialog,
    setOpenTxDetailsDialog,
    isWritingCommitMsg,
    setIsWritingCommitMsg,
    txHash,
    submittingWiki,
    setSubmittingWiki,
    wikiHash,
    isNewCreateWiki,
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
  } = wikiState

  const providerValue = useMemo(() => wikiState, [wikiState])

  const prevEditedWiki = useRef<{ wiki?: Wiki; isPublished: boolean }>({
    wiki: wikiData,
    isPublished: false,
  })

  const { saveHashInTheBlockchain, signing, verifyTrxHash } =
    useGetSignedHash(deadline)

  const getImageHash = async () =>
    isWikiBeingEdited ? ipfsHash : saveImage(image)

  const getWikiSlug = () => slugify(String(wiki.title).toLowerCase())

  const getImageArrayBufferLength = () =>
    (image.type as ArrayBuffer).byteLength === 0

  const isValidWiki = () => {
    if (
      isWikiBeingEdited === false &&
      (!image ||
        image.type === null ||
        image.type === undefined ||
        getImageArrayBufferLength())
    ) {
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

    const words = getWordCount(md || '')

    if (words < MINIMUM_WORDS) {
      toast({
        title: `Add a minimum of ${MINIMUM_WORDS} words to continue, you have written ${words}`,
        status: 'error',
        duration: 3000,
      })
      return false
    }

    if (getWikiMetadataById(wiki, CommonMetaIds.PAGE_TYPE)?.value === null) {
      toast({
        title: 'Add a page type to continue',
        status: 'error',
        duration: 3000,
      })
      return false
    }

    return true
  }

  const saveOnIpfs = async () => {
    if (!isValidWiki()) return

    logEvent({
      action: 'SUBMIT_WIKI',
      params: { address: accountData?.address, slug: getWikiSlug() },
    })

    if (accountData) {
      setOpenTxDetailsDialog(true)
      setSubmittingWiki(true)

      // Build the wiki object
      const imageHash = await getImageHash()

      let interWiki = { ...wiki }
      if (interWiki.id === '') interWiki.id = getWikiSlug()
      setWikiId(interWiki.id)

      interWiki = {
        ...interWiki,
        user: {
          id: accountData.address,
        },
        content: String(md).replace(/\n/gm, '  \n'),
        images: [{ id: imageHash, type: 'image/jpeg, image/png' }],
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
        metadata: store.getState().wiki.metadata,
      }

      prevEditedWiki.current = { wiki: finalWiki, isPublished: false }

      const wikiResult: any = await store.dispatch(
        postWiki.initiate({ data: finalWiki }),
      )

      if (wikiResult) saveHashInTheBlockchain(String(wikiResult.data))

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

  const handleOnEditorChanges = (val: string | undefined) => {
    setMd(val || ' ')
  }

  useCreateWikiEffects(wiki, prevEditedWiki)

  useEffect(() => {
    if (
      wikiData &&
      wikiData.content.length > 0 &&
      wikiData.images &&
      wikiData.images.length > 0
    ) {
      // update isWikiBeingEdited
      updateImageState(ImageKey.IS_WIKI_BEING_EDITED, true)
      // update image hash
      updateImageState(ImageKey.IPFS_HASH, String(wikiData?.images[0].id))

      const { id, title, summary, content, tags, categories } = wikiData
      let { metadata } = wikiData

      // fetch the currently stored meta data of page that are not edit specific
      // (commonMetaIds) and append edit specific meta data (editMetaIds) with empty values
      metadata = [
        ...Object.values(CommonMetaIds).map(mId => {
          const meta = getWikiMetadataById(wikiData, mId)
          return { id: mId, value: meta?.value || '' }
        }),
        ...Object.values(EditSpecificMetaIds).map(mId => ({
          id: mId,
          value: '',
        })),
      ]

      const transformedContent = content.replace(/ {2}\n/gm, '\n')
      dispatch({
        type: 'wiki/setCurrentWiki',
        payload: {
          id,
          title,
          summary,
          content: transformedContent,
          tags,
          categories,
          metadata,
        },
      })

      setMd(String(transformedContent))
    }
  }, [dispatch, updateImageState, wikiData])

  useEffect(() => {
    if (txHash) verifyTrxHash(txHash)
  }, [txHash, verifyTrxHash])

  const handlePopupClose = () => {
    setMsg(initialMsg)
    setIsLoading('loading')
    setActiveStep(0)
    setOpenTxDetailsDialog(false)
  }

  return (
    <CreateWikiProvider value={providerValue}>
      <Box maxW="1900px" mx="auto" mb={8}>
        <HStack
          boxShadow="sm"
          borderRadius={4}
          borderWidth="1px"
          p={3}
          justifyContent="space-between"
          mx="auto"
          mb={4}
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
              placeholder="Title goes here"
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
                  <Textarea
                    placeholder="Enter what changed..."
                    onChange={e =>
                      dispatch({
                        type: 'wiki/updateMetadata',
                        payload: {
                          id: EditSpecificMetaIds.COMMIT_MESSAGE,
                          value: e.target.value,
                        },
                      })
                    }
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
                dispatch({
                  type: 'wiki/updateMetadata',
                  payload: {
                    id: EditSpecificMetaIds.COMMIT_MESSAGE,
                    value: 'New Wiki Created 🎉',
                  },
                })
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
          gap={8}
          px={{ base: 4, xl: 8 }}
        >
          <Box h="635px" w="full">
            <Skeleton isLoaded={!isLoadingWiki} w="full" h="635px">
              <Editor markdown={md || ''} onChange={handleOnEditorChanges} />
            </Skeleton>
          </Box>
          <Box minH="635px">
            <Skeleton isLoaded={!isLoadingWiki} w="full" h="full">
              <Center>
                <Highlights
                  initialImage={ipfsHash}
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
    </CreateWikiProvider>
  )
}

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

export default authenticatedRoute(memo(CreateWiki))
