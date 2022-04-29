import config from '@/config'
import axios from 'axios'
import { useState } from 'react'
import { POST_IMG } from '@/services/wikis/queries'
import { Image } from '@/types/Wiki'

export const initialEditorValue = ` `
export const initialMsg =
  'Your Wiki is being processed. It will be available on the blockchain soon.'
export const errorMessage = 'Oops, An Error Occurred. Wiki could not be created'
export const successMessage = 'Wiki has been created successfully.'

export const domain = {
  name: 'EP',
  version: '1',
  chainId: config.chainId,
  verifyingContract: config.wikiContractAddress,
}

export const types = {
  SignedPost: [
    { name: 'ipfs', type: 'string' },
    { name: 'user', type: 'address' },
    { name: 'deadline', type: 'uint256' },
  ],
}

export const MINIMUM_WORDS = 150

export const saveImage = async (image: Image) => {
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

export const useCreateWikiState = () => {
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

  return {
    md,
    setMd,
    openTxDetailsDialog,
    setOpenTxDetailsDialog,
    isWritingCommitMsg,
    setIsWritingCommitMsg,
    txHash,
    setTxHash,
    submittingWiki,
    setSubmittingWiki,
    wikiHash,
    setWikiHash,
    isNewCreateWiki,
    setIsNewCreateWiki,
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
  }
}
