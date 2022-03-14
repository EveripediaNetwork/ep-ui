import React, { useEffect, useState } from 'react'
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
import { useAccount, useContractWrite } from 'wagmi'
import slugify from 'slugify'
import axios from 'axios'

import Highlights from '@/components/Layout/Editor/Highlights/Highlights'
import config from '@/config'
import { Modal } from '@/components/Elements'
import { useAppSelector } from '@/store/hook'
import { authenticatedRoute } from '@/components/AuthenticatedRoute'
import { getWikiMetadataById } from '@/utils/getWikiFields'
import { PageTemplate } from '@/constant/pageTemplate'
import shortenAccount from '@/utils/shortenAccount'
import { WikiAbi } from '../../abi/Wiki.abi'

const Editor = dynamic(() => import('@/components/Layout/Editor/Editor'), {
  ssr: false,
})

const initialEditorValue = `# Place name\n**Place_name** is a place ...\n## History\n**Place_name** is known for ...\n## Features\n**Place_name** offers ...
`
const CreateWiki = () => {
  const wiki = useAppSelector(state => state.wiki)
  const [{ data: accountData }] = useAccount()
  const [md, setMd] = useState<string>()
  const [openTxDetailsDialog, setOpenTxDetailsDialog] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>()
  const [submittingWiki, setSubmittingWiki] = useState(false)
  const [wikiHash, setWikiHash] = useState<string>()
  const [triggerUpdate, setTriggerUpdate] = useState('')
  const [txError, setTxError] = useState({
    title: '',
    description: '',
    opened: false,
  })

  const [, write] = useContractWrite(
    {
      addressOrName: config.wikiContractAddress,
      contractInterface: WikiAbi,
    },
    'post',
  )

  const saveImage = async () => {
    const formData = new FormData()
    const blob = new Blob([wiki.content.images[0].type as ArrayBuffer], {
      type: 'multipart/form-data',
    })

    formData.append('rawImg', blob)

    const {
      data: { ipfs },
    } = await axios.post('/api/ipfs', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    })

    return ipfs
  }

  const saveHashInTheBlockchain = async (hash: string) => {
    const result = await write({ args: [hash] })
    await result.data?.wait(2)

    setSubmittingWiki(false)

    if (!result.error) {
      setOpenTxDetailsDialog(true)
      setTxHash(result.data?.hash)
      setWikiHash(hash)
      return
    }

    setTxError({
      title: 'Error!',
      description: result.error.message,
      opened: true,
    })
  }

  const saveOnIpfs = async () => {
    if (accountData) {
      setSubmittingWiki(true)
      const imageHash = await saveImage()

      let tmp = { ...wiki }

      tmp.id = slugify(String(wiki.content.title).toLowerCase())
      tmp = {
        ...tmp,
        content: {
          ...tmp.content,
          content: String(md),
          user: {
            id: accountData.ens
              ? accountData.ens.name
              : shortenAccount(accountData.address),
          },
          images: [{ id: imageHash, type: 'image/jpeg, image/png' }],
        },
      }

      const {
        data: { ipfs },
      } = await axios.post('/api/ipfs', tmp)

      if (ipfs) saveHashInTheBlockchain(ipfs)
    }
  }

  const disableSaveButton = () =>
    wiki.content.images.length === 0 || submittingWiki || !accountData?.address

  const handleOnEditorChanges = (val: string | undefined) => {
    if (val) setMd(val)
  }

  useEffect(() => {
    if (wiki) {
      const meta = getWikiMetadataById(wiki, 'page-type')
      const pageType = PageTemplate.find(p => p.type === meta?.value)

      setTriggerUpdate(String(pageType?.templateText))
    }
  }, [wiki?.content?.metadata])

  useEffect(() => {
    setMd(initialEditorValue)
  }, [])

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
          markdown={triggerUpdate}
          initialValue={initialEditorValue}
          onChange={handleOnEditorChanges}
        />
      </GridItem>
      <GridItem rowSpan={[1, 2, 2, 2]} colSpan={[3, 3, 3, 1, 1]}>
        <Center>
          <Highlights />
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

export default authenticatedRoute(CreateWiki)
