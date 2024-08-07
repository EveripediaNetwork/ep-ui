import config from '@/config'
import networkMap from '@/data/NetworkMap'
import useConfetti from '@/hooks/useConfetti'
import { useCreateWikiContext } from '@/hooks/useCreateWikiState'
import { useGetSignedHash } from '@/hooks/useGetSignedHash'
import useWhiteListValidator from '@/hooks/useWhiteListValidator'
import { postWiki, useGetWikiQuery } from '@/services/wikis'
import { useAppSelector } from '@/store/hook'
import { store } from '@/store/store'
import { ProviderDataType } from '@/types/ProviderDataType'
import {
  ValidationErrorMessage,
  defaultErrorMessage,
  initialMsg,
} from '@/utils/CreateWikiUtils/createWikiMessages'
import { getWikiSlug } from '@/utils/CreateWikiUtils/getWikiSlug'
import { isValidWiki } from '@/utils/CreateWikiUtils/isValidWiki'
import { isWikiExists } from '@/utils/CreateWikiUtils/isWikiExist'
import { sanitizeContentToPublish } from '@/utils/CreateWikiUtils/sanitizeContentToPublish'
import { getWikiMetadataById } from '@/utils/WikiUtils/getWikiFields'
import {
  Button,
  Tooltip,
  useBoolean,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import {
  CreateNewWikiSlug,
  EditSpecificMetaIds,
  Wiki,
} from '@everipedia/iq-utils'
import detectEthereumProvider from '@metamask/detect-provider'
import { SerializedError } from '@reduxjs/toolkit'
import { ClientError } from 'graphql-request'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import ReactCanvasConfetti from 'react-canvas-confetti'
import OverrideExistingWikiDialog from '../../EditorModals/OverrideExistingWikiDialog'
import WikiProcessModal from '../../EditorModals/WikiProcessModal'
import { PublishWithCommitMessage } from './WikiPublishWithCommitMessage'
import { useAccount } from 'wagmi'
import isWikiEdited from '@/utils/CreateWikiUtils/isWikiEdited'
import { usePostHog } from 'posthog-js/react'

const NetworkErrorNotification = dynamic(
  () => import('@/components/Layout/Network/NetworkErrorNotification'),
)

export type TGraphQLError = {
  error?: SerializedError | Pick<ClientError, 'name' | 'message' | 'stack'>
}

export const WikiPublishButton = () => {
  const wiki = useAppSelector((state) => state.wiki)
  const { data } = useGetWikiQuery(wiki?.id || '')

  const [submittingWiki, setSubmittingWiki] = useBoolean()
  const { address: userAddress, isConnected: isUserConnected } = useAccount()
  const posthog = usePostHog()

  const { userCanEdit } = useWhiteListValidator()
  const [connectedChainId, setConnectedChainId] = useState<string>()

  const { chainId } = config.isProduction
    ? networkMap.POLYGON_MAINNET
    : networkMap.IQ_TESTNET

  const [detectedProvider, setDetectedProvider] =
    useState<ProviderDataType | null>(null)
  const {
    isOpen: isOverrideModalOpen,
    onOpen: onOverrideModalOpen,
    onClose: onOverrideModalClose,
  } = useDisclosure()
  const {
    isOpen: isWikiProcessModalOpen,
    onOpen: onWikiProcessModalOpen,
    onClose: onWikiProcessModalClose,
  } = useDisclosure()

  const [networkSwitchAttempted, setNetworkSwitchAttempted] = useState(false)
  const showModal = connectedChainId !== chainId && !networkSwitchAttempted
  const [showNetworkModal, setShowNetworkModal] = useState(showModal)

  const { t } = useTranslation('wiki')
  const toast = useToast()

  const {
    dispatch,
    wikiHash,
    revision,
    isNewCreateWiki,
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
    wikiData,
    isLoadingWiki,
  } = useCreateWikiContext()

  const prevEditedWiki = useRef<{ wiki?: Wiki; isPublished: boolean }>({
    wiki: wikiData,
    isPublished: false,
  })

  const { saveHashInTheBlockchain, verifyTrxHash, signing, txHash } =
    useGetSignedHash()

  const isPublishDisabled =
    submittingWiki || !userAddress || signing || isLoadingWiki || !userCanEdit

  const { fireConfetti, confettiProps } = useConfetti()

  useEffect(() => {
    const getConnectedChain = async (provider: ProviderDataType) => {
      const connectedChainId = await provider.request({
        method: 'eth_chainId',
      })
      setConnectedChainId(connectedChainId)
    }

    const getDetectedProvider = async () => {
      const provider = (await detectEthereumProvider({
        silent: true,
      })) as ProviderDataType
      setDetectedProvider(provider)
      if (provider) getConnectedChain(provider)
    }

    if (!detectedProvider) {
      getDetectedProvider()
    } else {
      getConnectedChain(detectedProvider)
      detectedProvider.on('chainChanged', (newlyConnectedChain) =>
        setConnectedChainId(newlyConnectedChain),
      )
    }

    return () => {
      if (detectedProvider) {
        detectedProvider.removeListener(
          'chainChanged',
          (newlyConnectedChain) => setConnectedChainId(newlyConnectedChain),
        )
      }
    }
  }, [detectedProvider, userAddress])

  useEffect(() => {
    const handleAsync = async () => {
      if (activeStep === 3) {
        const currentDate = new Date().toDateString()
        const lastUpdatedDate = new Date(wiki.updated ?? '').toDateString()

        if (currentDate !== lastUpdatedDate) {
          posthog.capture('submit_wiki', {
            wiki_slug: await getWikiSlug(wiki),
            isEdit: !isNewCreateWiki,
          })
        }
        prevEditedWiki.current.isPublished = true
        fireConfetti()
      }
    }
    handleAsync()
  }, [activeStep, fireConfetti])

  useEffect(() => {
    async function verifyTransactionHash() {
      if (txHash) verifyTrxHash()
    }
    verifyTransactionHash()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txHash, verifyTrxHash])

  const processWikiPublishError = async (wikiResult: TGraphQLError) => {
    setIsLoading('error')
    let logReason = 'NO_IPFS'
    if (wikiResult && 'error' in wikiResult) {
      const rawErrMsg = wikiResult.error?.message
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
    posthog.capture('submit_wiki_error', {
      wiki_slug: await getWikiSlug(wiki),
      error: logReason,
    })
  }

  const updateCommitMessage = (override: boolean) => {
    let wikiCommitMessage = getWikiMetadataById(
      wiki,
      EditSpecificMetaIds.COMMIT_MESSAGE,
    )?.value

    if (isNewCreateWiki) {
      if (override) {
        wikiCommitMessage = 'Wiki Overridden 🔄'
      } else if (revision) {
        wikiCommitMessage = `Reverted to revision ${revision} ⏪`
      } else {
        wikiCommitMessage = 'New Wiki Created 🎉'
      }
    }

    dispatch({
      type: 'wiki/updateMetadata',
      payload: {
        id: EditSpecificMetaIds.COMMIT_MESSAGE,
        value: wikiCommitMessage,
      },
    })
  }

  const handleWikiPublish = async (override?: boolean) => {
    if (!isValidWiki(toast, wiki)) return

    if (data && wiki) {
      if (isWikiEdited(data, wiki)) {
        toast({
          title: 'You are yet to make any changes to the current wiki',
          status: 'error',
          duration: 30000,
        })
        return
      }
    }

    if (userAddress) {
      const ifWikiExists =
        isNewCreateWiki &&
        !override &&
        (await isWikiExists(await getWikiSlug(wiki), setExistingWikiData))

      if (ifWikiExists) {
        onOverrideModalOpen()
        return
      }

      updateCommitMessage(!!override)

      onWikiProcessModalOpen()

      setSubmittingWiki.on()

      const finalWiki = {
        ...wiki,
        user: { id: userAddress },
        content: sanitizeContentToPublish(String(wiki.content)),
        metadata: wiki.metadata.filter((m) => m.value),
      }

      if (finalWiki.id === CreateNewWikiSlug)
        finalWiki.id = await getWikiSlug(wiki)

      setWikiId(finalWiki.id)

      prevEditedWiki.current = { wiki: finalWiki, isPublished: false }

      const wikiResult = await store.dispatch(
        postWiki.initiate({ data: finalWiki }),
      )

      if (wikiResult && 'data' in wikiResult) {
        saveHashInTheBlockchain(String(wikiResult.data))
      } else {
        await processWikiPublishError(wikiResult as TGraphQLError)
      }

      setSubmittingWiki.off()
    }
  }

  const handlePopupClose = () => {
    setMsg(initialMsg)
    setIsLoading('loading')
    setActiveStep(0)
    onWikiProcessModalClose()
  }

  return (
    <>
      <Tooltip
        isDisabled={(userCanEdit as boolean) && isUserConnected}
        p={2}
        rounded="md"
        placement="bottom-start"
        shouldWrapChildren
        color="white"
        bg="toolTipBg"
        hasArrow
        label={
          !isUserConnected
            ? 'Your Metamask is locked'
            : 'Your address is not yet whitelisted'
        }
        mt="3"
      >
        {!isNewCreateWiki ? (
          <PublishWithCommitMessage
            handleWikiPublish={() => handleWikiPublish()}
            isPublishDisabled={isPublishDisabled}
            submittingWiki={false}
          />
        ) : (
          <Button
            onClick={() => handleWikiPublish()}
            isDisabled={isPublishDisabled}
            _disabled={{
              opacity: isPublishDisabled ? 0.5 : undefined,
              _hover: { bgColor: 'grey !important', cursor: 'not-allowed' },
            }}
          >
            {t('publish')}
          </Button>
        )}
      </Tooltip>
      <OverrideExistingWikiDialog
        isOpen={isOverrideModalOpen}
        publish={() => {
          onOverrideModalClose()
          handleWikiPublish(true)
        }}
        onClose={onOverrideModalClose}
        getSlug={() => getWikiSlug(wiki)}
        existingWikiData={existingWikiData}
      />
      <WikiProcessModal
        wikiId={wikiId}
        msg={msg}
        txHash={txHash}
        wikiHash={wikiHash}
        activeStep={activeStep}
        isNewWiki={isNewCreateWiki}
        state={loadingState}
        isOpen={isWikiProcessModalOpen}
        onClose={handlePopupClose}
      />
      <ReactCanvasConfetti {...confettiProps} />
      {showModal && (
        <NetworkErrorNotification
          modalState={showNetworkModal}
          setModalState={(state: boolean) => setShowNetworkModal(state)}
          setNetworkSwitchAttempted={setNetworkSwitchAttempted}
        />
      )}
    </>
  )
}
