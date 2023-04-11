import React, { useEffect, useRef } from 'react'
import { Button, Tooltip, useBoolean, useDisclosure } from '@chakra-ui/react'
import { isValidWiki } from '@/utils/CreateWikiUtils/isValidWiki'
import { useAppSelector } from '@/store/hook'
import { logEvent } from '@/utils/googleAnalytics'
import { getWikiMetadataById } from '@/utils/WikiUtils/getWikiFields'
import {
  CreateNewWikiSlug,
  EditSpecificMetaIds,
  Wiki,
} from '@everipedia/iq-utils'
import { useAccount } from 'wagmi'
import { getWikiSlug } from '@/utils/CreateWikiUtils/getWikiSlug'
import { useWhiteListValidator } from '@/hooks/useWhiteListValidator'
import { store } from '@/store/store'
import { postWiki } from '@/services/wikis'
import { ClientError } from 'graphql-request'
import { SerializedError } from '@reduxjs/toolkit'
import { sanitizeContentToPublish } from '@/utils/CreateWikiUtils/sanitizeContentToPublish'
import {
  ValidationErrorMessage,
  defaultErrorMessage,
  initialMsg,
} from '@/utils/CreateWikiUtils/createWikiMessages'
import ReactCanvasConfetti from 'react-canvas-confetti'
import useConfetti from '@/hooks/useConfetti'
import { isWikiExists } from '@/utils/CreateWikiUtils/isWikiExist'
import { useGetSignedHash } from '@/hooks/useGetSignedHash'
import { useCreateWikiContext } from '@/hooks/useCreateWikiState'
import OverrideExistingWikiDialog from '../../EditorModals/OverrideExistingWikiDialog'
import WikiProcessModal from '../../EditorModals/WikiProcessModal'
import { PublishWithCommitMessage } from './WikiPublishWithCommitMessage'

export const WikiPublishButton = () => {
  const wiki = useAppSelector((state) => state.wiki)
  const [submittingWiki, setSubmittingWiki] = useBoolean()
  const { address: userAddress, isConnected: isUserConnected } = useAccount()
  const { userCanEdit } = useWhiteListValidator(userAddress)
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

  const {
    dispatch,
    toast,
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
    if (activeStep === 3) {
      prevEditedWiki.current.isPublished = true
      fireConfetti()
    }
  }, [activeStep, fireConfetti])

  useEffect(() => {
    async function verifyTransactionHash() {
      if (txHash) verifyTrxHash()
    }
    verifyTransactionHash()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txHash, verifyTrxHash])

  const processWikiPublishError = async (wikiResult: {
    error: Pick<ClientError, 'name' | 'message' | 'stack'> | SerializedError
  }) => {
    setIsLoading('error')
    let logReason = 'NO_IPFS'
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
      label: await getWikiSlug(wiki),
      category: 'wiki_error',
      value: 1,
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

    logEvent({
      action: 'SUBMIT_WIKI',
      label: await getWikiSlug(wiki),
      category: 'wiki_title',
      value: 1,
    })

    if (isUserConnected && userAddress) {
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
        await processWikiPublishError(wikiResult)
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
        isDisabled={!!userCanEdit}
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
        {!isNewCreateWiki ? (
          <PublishWithCommitMessage
            handleWikiPublish={() => handleWikiPublish()}
            isPublishDisabled={isPublishDisabled}
            submittingWiki={false}
          />
        ) : (
          <Button
            onClick={() => handleWikiPublish()}
            disabled={!userCanEdit}
            _disabled={{
              opacity: isPublishDisabled ? 0.5 : undefined,
              _hover: { bgColor: 'grey !important', cursor: 'not-allowed' },
            }}
          >
            Publish
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
        state={loadingState}
        isOpen={isWikiProcessModalOpen}
        onClose={handlePopupClose}
      />
      <ReactCanvasConfetti {...confettiProps} />
    </>
  )
}
