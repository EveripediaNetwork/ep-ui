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
import { getAccount } from '@/utils/getAccount'
import { Modal } from '@/components/Elements'
import { useAppSelector } from '@/store/hook'
import { WikiAbi } from '../abi/Wiki.abi'

const Editor = dynamic(() => import('@/components/Layout/Editor/Editor'), {
  ssr: false,
})

const initialEditorValue = `
  # Hello Web3 World.
  **Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.**
  ***
  *Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.*

  ~~Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo~~

  > a quote


| table title | a title |
| --- | --- |
| tb body | tb body |

  1. Numbered list item
  2. An item
  3. third item

  - Bullet list item
  - item
  - yep, an item
`

const CreateWiki = () => {
  const wiki = useAppSelector(state => state.wiki)
  const [{ data: accountData }] = useAccount()
  const [md, setMd] = useState<string>()
  const [openTxDetailsDialog, setOpenTxDetailsDialog] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>()
  const [submittingWiki, setSubmittingWiki] = useState(false)
  const [wikiHash, setWikiHash] = useState<string>()
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
          id: getAccount(accountData),
        },
        images: [{ id: imageHash, type: 'image/jpeg, image/png' }],
      },
    }

    const {
      data: { ipfs },
    } = await axios.post('/api/ipfs', tmp)

    if (ipfs) saveHashInTheBlockchain(ipfs)
  }

  const disableSaveButton = () =>
    wiki.content.images.length === 0 || submittingWiki || !accountData?.address

  const handleOnEditorChanges = (val: string) => {
    if (val) setMd(val)
  }

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
          initialValue={initialEditorValue}
          onChange={handleOnEditorChanges}
        />
      </GridItem>
      <GridItem rowSpan={[1, 2, 2, 2]} colSpan={[3, 3, 3, 1, 1]}>
        <Center>
          <Highlights />
        </Center>
      </GridItem>
      <GridItem rowSpan={1} colSpan={3}>
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
            Save
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

export default CreateWiki
