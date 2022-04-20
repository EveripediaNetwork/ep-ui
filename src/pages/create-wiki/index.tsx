import React, {
  useContext,
  useEffect,
  useState,
  memo,
  useCallback,
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
  useGetWikiQuery,
} from '@/services/wikis'
import { useRouter } from 'next/router'
import { store } from '@/store/store'
import { GetServerSideProps } from 'next'
import { skipToken } from '@reduxjs/toolkit/query'
import { useAccount, useSignTypedData, useWaitForTransaction } from 'wagmi'
import { MdTitle } from 'react-icons/md'
import slugify from 'slugify'
import axios from 'axios'

import Highlights from '@/components/Layout/Editor/Highlights/Highlights'
import config from '@/config'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { getWikiMetadataById } from '@/utils/getWikiFields'
import { PageTemplate } from '@/data/pageTemplate'
import { getDeadline } from '@/utils/getDeadline'
import { submitVerifiableSignature } from '@/utils/postSignature'
import { ImageContext, ImageKey, ImageStateType } from '@/context/image.context'
import { authenticatedRoute } from '@/components/AuthenticatedRoute'
import WikiProcessModal from '@/components/Elements/Modal/WikiProcessModal'
import { getWordCount } from '@/utils/getWordCount'
import { POST_IMG } from '@/services/wikis/queries'

const Editor = dynamic(() => import('@/components/Layout/Editor/Editor'), {
  ssr: false,
})

const initialEditorValue = `# Place name\n**Place_name** is a place ...\n## History\n**Place_name** is known for ...\n## Features\n**Place_name** offers ...`
const initialMsg =
  'Your Wiki is being processed. It will be available on the blockchain soon.'
const errorMessage = 'Oops, An Error Occurred. Wiki could not be created'
const successMessage = 'Wiki has been created successfully.'

const deadline = getDeadline()

const domain = {
  name: 'EP',
  version: '1',
  chainId: config.chainId,
  verifyingContract: config.wikiContractAddress,
}

const types = {
  SignedPost: [
    { name: 'ipfs', type: 'string' },
    { name: 'user', type: 'address' },
    { name: 'deadline', type: 'uint256' },
  ],
}

const MINIMUM_WORDS = 150

const CreateWiki = () => {
  const wiki = useAppSelector(state => state.wiki)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const toast = useToast()
  const { slug } = router.query
  const { isLoading: isLoadingWiki, data: wikiData } = useGetWikiQuery(
    typeof slug === 'string' ? slug : skipToken,
    {
      skip: router.isFallback,
    },
  )
  const { image, ipfsHash, updateImageState, isWikiBeingEdited } =
    useContext<ImageStateType>(ImageContext)
  const [{ data: accountData }] = useAccount()
  const [md, setMd] = useState<string>()
  const [openTxDetailsDialog, setOpenTxDetailsDialog] = useState<boolean>(false)
  const [isWritingCommitMsg, setIsWritingCommitMsg] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>()
  const [submittingWiki, setSubmittingWiki] = useState(false)
  const [wikiHash, setWikiHash] = useState<string>()
  const [isNewCreateWiki, setIsNewCreateWiki] = useState<boolean>(false)
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
  const [{ data, error, loading: signing }, signTypedData] = useSignTypedData(
    {},
  )
  const [, wait] = useWaitForTransaction()

  const saveImage = async () => {
    const formData = new FormData()
    const blob = new Blob([image.type], {
      type: 'multipart/form-data',
    })

    formData.append('operations', POST_IMG)
    const map = `{"0": ["variables.file"]}`
    formData.append('map', map)
    formData.append('0', blob)

    const {
      data: {
        data: {
          pinImage: { IpfsHash },
        },
      },
    } = await axios.post(config.graphqlUrl, formData, {})

    return IpfsHash
  }

  const saveHashInTheBlockchain = async (ipfs: string) => {
    setWikiHash(ipfs)
    signTypedData({
      domain,
      types,
      value: {
        ipfs,
        user: accountData?.address || '',
        deadline,
      },
    }).then(response => {
      if (response.data) {
        setActiveStep(1)
      }
      if (response.error) {
        setIsLoading('error')
        setMsg(errorMessage)
      }
    })
  }

  const getImageHash = async () => (isWikiBeingEdited ? ipfsHash : saveImage())

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
        title: 'Add a main image to continue',
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

    if (getWikiMetadataById(wiki, 'page-type')?.value === null) {
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

    if (accountData) {
      setOpenTxDetailsDialog(true)
      setSubmittingWiki(true)
      const imageHash = await getImageHash()

      let tmp = { ...wiki }
      if (tmp.id === '') tmp.id = getWikiSlug()
      setWikiId(tmp.id)

      tmp = {
        ...tmp,
        content: String(md),
        user: {
          id: accountData.address,
        },
        images: [{ id: imageHash, type: 'image/jpeg, image/png' }],
      }

      const wikiResult: any = await store.dispatch(
        postWiki.initiate({ data: tmp }),
      )

      if (wikiResult) saveHashInTheBlockchain(String(wikiResult.data))

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

  const updatePageTypeTemplate = useCallback(() => {
    const meta = [
      getWikiMetadataById(wiki, 'page-type'),
      getWikiMetadataById(wiki, 'twitter-profile'),
    ]
    const pageType = PageTemplate.find(p => p.type === meta[0]?.value)

    setMd(String(pageType?.templateText))
  }, [wiki])

  const verifyTrxHash = useCallback(
    async (trxHash: string) => {
      const timer = setInterval(() => {
        try {
          const checkTrx = async () => {
            const trx = await wait({
              hash: trxHash,
            })
            if (trx.error) {
              setIsLoading('error')
              setMsg(errorMessage)
              clearInterval(timer)
            } else if (trx.data.confirmations > 1) {
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
          clearInterval(timer)
        }
      }, 3000)
    },
    [wait],
  )

  // Reset the State to new wiki if there is no slug
  useEffect(() => {
    if (!slug) {
      setIsNewCreateWiki(true)
      dispatch({ type: 'wiki/reset' })
      setMd(initialEditorValue)
    } else {
      setIsNewCreateWiki(false)
    }
  }, [dispatch, slug])

  useEffect(() => {
    if (isLoadingWiki === false && !wikiData) setMd(initialEditorValue)
  }, [isLoadingWiki, wikiData])

  // update the page type template when the page type changes
  const presentPageType = useMemo(
    () => wiki?.metadata?.find(m => m.id === 'page-type')?.value,
    [wiki?.metadata],
  )
  useEffect(() => {
    if (presentPageType) {
      let isMdPageTemplate = false
      PageTemplate.forEach(p => {
        if (p.templateText === md) isMdPageTemplate = true
      })
      if (isMdPageTemplate || md === ' ') updatePageTypeTemplate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presentPageType])

  useEffect(() => {
    const getSignedTxHash = async () => {
      if (data && wikiHash && accountData) {
        if (error) {
          setMsg(errorMessage)
          setIsLoading('error')
          return
        }
        try {
          const { data: relayerData }: any = await submitVerifiableSignature(
            data,
            wikiHash,
            accountData?.address,
            deadline,
          )

          if (relayerData && relayerData.hash) {
            setTxHash(relayerData.hash)
            setActiveStep(2)
          }
        } catch (err) {
          setIsLoading('error')
          setMsg(errorMessage)
        }
      }
    }
    getSignedTxHash()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error])

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
      metadata = metadata[1]?.value
        ? [...metadata, { id: 'commit-message', value: '' }]
        : [
            ...metadata,
            { id: 'twitter-profile', value: '' },
            { id: 'commit-message', value: '' },
          ]

      dispatch({
        type: 'wiki/setCurrentWiki',
        payload: { id, title, summary, content, tags, categories, metadata },
      })

      setMd(String(wikiData.content))
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
                        id: 'commit-message',
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
                          id: 'commit-message',
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
                payload: { id: 'commit-message', value: 'New Wiki Created 🎉' },
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
