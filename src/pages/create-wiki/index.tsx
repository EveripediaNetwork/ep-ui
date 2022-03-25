import React, { useContext, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import {
  Grid,
  GridItem,
  Flex,
  Button,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Center,
} from '@chakra-ui/react'
import { useAccount, useSignTypedData } from 'wagmi'
import {
  getRunningOperationPromises,
  getWiki,
  useGetWikiQuery,
} from '@/services/wikis'
import { useRouter } from 'next/router'
import { store } from '@/store/store'
import { GetServerSideProps } from 'next'
import { skipToken } from '@reduxjs/toolkit/query'
import slugify from 'slugify'
import axios from 'axios'

import Highlights from '@/components/Layout/Editor/Highlights/Highlights'
import config from '@/config'
import { Modal } from '@/components/Elements'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { getWikiMetadataById } from '@/utils/getWikiFields'
import { PageTemplate } from '@/constant/pageTemplate'
import { getDeadline } from '@/utils/getDeadline'
import { submitVerifiableSignature } from '@/utils/postSignature'
import { ImageContext, ImageKey, ImageStateType } from '@/context/image.context'

const Editor = dynamic(() => import('@/components/Layout/Editor/Editor'), {
  ssr: false,
})

const initialEditorValue = `# Place name\n**Place_name** is a place ...\n## History\n**Place_name** is known for ...\n## Features\n**Place_name** offers ...
`

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

const CreateWiki = () => {
  const wiki = useAppSelector(state => state.wiki)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { slug } = router.query
  const result = useGetWikiQuery(typeof slug === 'string' ? slug : skipToken, {
    skip: router.isFallback,
  })
  const { image, ipfsHash, updateImageState } =
    useContext<ImageStateType>(ImageContext)
  const [{ data: accountData }] = useAccount()
  const [md, setMd] = useState<string>()
  const [openTxDetailsDialog, setOpenTxDetailsDialog] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>()
  const [submittingWiki, setSubmittingWiki] = useState(false)
  const [wikiHash, setWikiHash] = useState<string>()
  const { isLoading: isLoadingWiki, data: wikiData } = result
  const [txError, setTxError] = useState({
    title: '',
    description: '',
    opened: false,
  })

  const [{ data, error, loading: signing }, signTypedData] = useSignTypedData(
    {},
  )

  const saveImage = async () => {
    const formData = new FormData()
    const blob = new Blob([image.type], {
      type: 'multipart/form-data',
    })

    formData.append('file', blob)
    formData.append('name', image.id)

    const {
      data: { ipfs },
    } = await axios.post('/api/ipfs-image', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    })

    return ipfs
  }

  const saveHashInTheBlockchain = async (ipfs: string) => {
    setWikiHash(ipfs)
    await signTypedData({
      domain,
      types,
      value: {
        ipfs,
        user: accountData?.address || '',
        deadline,
      },
    })
  }

  const saveOnIpfs = async () => {
    if (accountData) {
      setSubmittingWiki(true)
      const imageHash = await saveImage()

      let tmp = { ...wiki }

      // otherwise the wiki is being edited
      if (tmp.id === '') tmp.id = slugify(String(wiki.title).toLowerCase())

      tmp = {
        ...tmp,
        content: String(md),
        user: {
          id: accountData.address,
        },
        images: [{ id: imageHash, type: 'image/jpeg, image/png' }],
      }

      const {
        data: { ipfs },
      } = await axios.post('/api/ipfs', tmp)

      if (ipfs) saveHashInTheBlockchain(ipfs)

      setSubmittingWiki(false)
    }
  }

  const disableSaveButton = () =>
    // wiki.images.length === 0 ||
    submittingWiki || !accountData?.address || signing || isLoadingWiki

  const handleOnEditorChanges = (val: string | undefined) => {
    if (val) setMd(val)
  }

  useEffect(() => {
    if (wiki) {
      const meta = getWikiMetadataById(wiki, 'page-type')
      const pageType = PageTemplate.find(p => p.type === meta?.value)

      setMd(String(pageType?.templateText))
    }
  }, [wiki])

  useEffect(() => {
    setMd(initialEditorValue)
  }, [])

  useEffect(() => {
    const getSignedTxHash = async () => {
      if (data && error && wikiHash && accountData) {
        if (error) {
          // TODO: show in the UI a msg
          console.error(error)
          return
        }

        const { data: relayerData }: any = await submitVerifiableSignature(
          data,
          wikiHash,
          accountData?.address,
          deadline,
        )

        console.log(relayerData.signedTxHash)

        if (relayerData.signedTxHash) {
          setTxHash(relayerData.signedTxHash)
          setOpenTxDetailsDialog(true)
        }
      }
    }

    getSignedTxHash()
  }, [data, error])

  useEffect(() => {
    if (wikiData && wikiData.content && wikiData.images) {
      setMd(String(wikiData.content))

      updateImageState(ImageKey.IPFS_HASH, String(wikiData.images[0].id))

      const { id, title, content, tags, categories } = wikiData

      dispatch({
        type: 'wiki/setCurrentWiki',
        payload: { id, title, content, tags, categories },
      })
    }
  }, [wikiData])

  console.log(ipfsHash)

  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      templateRows="repeat(3, 1fr)"
      gap={4}
      h={['1350px', '1450px', '1450px', '1100px']}
      my="15px"
    >
      <GridItem rowSpan={[2, 1, 1, 2]} colSpan={[3, 3, 3, 2, 2]} maxH="690px">
        <Editor
          markdown={md || ''}
          initialValue={initialEditorValue}
          onChange={handleOnEditorChanges}
        />
      </GridItem>
      <GridItem rowSpan={[1, 2, 2, 2]} colSpan={[3, 3, 3, 1, 1]}>
        <Center>
          <Highlights initialImage={ipfsHash} />
        </Center>
      </GridItem>
      <GridItem mt="3" rowSpan={1} colSpan={3}>
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
          <Button
            isLoading={submittingWiki}
            loadingText="Loading"
            disabled={disableSaveButton()}
            onClick={saveOnIpfs}
          >
            Publish Wiki
          </Button>
        </Flex>
      </GridItem>
      <Modal
        title="Transaction details"
        enableBottomCloseButton
        isOpen={openTxDetailsDialog}
        onClose={() => setOpenTxDetailsDialog(false)}
        isCentered
        SecondaryButton={
          <Button
            onClick={() =>
              window.open(`${config.blockExplorerUrl}tx/${txHash}`)
            }
            variant="outline"
          >
            View in Block Explorer
          </Button>
        }
      >
        <Text align="center">
          The wiki was successfully posted on the Polygon blockchain!
        </Text>
        <Center mt="4">
          <Button
            as="a"
            href={`${config.pinataBaseUrl}${wikiHash}`}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            variant="outline"
          >
            See in IPFS
          </Button>
        </Center>
      </Modal>
    </Grid>
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

export default CreateWiki
