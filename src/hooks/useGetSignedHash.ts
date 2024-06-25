import {
  useAccount,
  useEstimateFeesPerGas,
  useSignTypedData,
  useWaitForTransactionReceipt,
} from 'wagmi'
import { submitVerifiableSignature } from '@/utils/WalletUtils/postSignature'
import { removeDraftFromLocalStorage } from '@/store/slices/wiki.slice'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { getDeadline } from '@/utils/DataTransform/getDeadline'
import {
  defaultErrorMessage,
  successMessage,
  editedMessage,
} from '@/utils/CreateWikiUtils/createWikiMessages'
import { Dict } from '@chakra-ui/utils'
import { EditSpecificMetaIds } from '@everipedia/iq-utils'
import { domain, types } from '@/utils/CreateWikiUtils/domainType'
import { useCreateWikiContext } from './useCreateWikiState'
import config from '@/config'
import { usePostHog } from 'posthog-js/react'

export const useGetSignedHash = () => {
  const {
    setWikiHash,
    wikiHash,
    isNewCreateWiki,
    setMsg,
    setIsLoading,
    setTxHash,
    setActiveStep,
    txHash,
    setCommitMessage,
    dispatch,
  } = useCreateWikiContext()
  const posthog = usePostHog()

  const { address: userAddress, isConnected: isUserConnected } = useAccount()
  const deadline = useRef(0)

  const {
    data: signData,
    error: signError,
    status,
    signTypedDataAsync,
  } = useSignTypedData()

  const signing = status === 'pending'

  const { refetch } = useWaitForTransactionReceipt({
    hash: txHash as `0x${string}`,
    chainId: Number(config.chainId),
    confirmations: config.isProduction ? 2 : 1,
  })

  const { data: feeData } = useEstimateFeesPerGas({
    formatUnits: 'gwei',
  })

  const gasPrice = useMemo(
    () => parseFloat(feeData?.formatted.gasPrice ?? '0'),
    [feeData],
  )

  const saveHashInTheBlockchain = async (ipfs: string) => {
    deadline.current = getDeadline()
    setWikiHash(ipfs)
    signTypedDataAsync({
      primaryType: 'SignedPost',
      domain,
      types,
      message: {
        ipfs,
        user: userAddress,
        deadline: deadline.current,
      },
    })
      .then((response) => {
        if (response) {
          setActiveStep(1)
        } else {
          setIsLoading('error')
          setMsg(defaultErrorMessage)
        }
      })
      .catch((err) => {
        setIsLoading('error')
        console.log(err)
        setMsg(err.message || defaultErrorMessage)
        posthog.capture('submit_wiki_error', {
          error: err.message,
        })
      })
  }

  const verifyTrxHash = useCallback(
    async () => {
      let timePassed = 0
      const _timer = setInterval(() => {
        if (timePassed >= 60 * 1000 && gasPrice > 250) {
          setMsg(`A little congestion on the polygon chain is causing a delay in the
          creation of your wiki.This would be resolved in a little while.`)
        }
        try {
          const checkTrx = async () => {
            const trx = await refetch()
            if (trx.error) {
              setIsLoading('error')
              setMsg(defaultErrorMessage)
              posthog.capture('submit_wiki_error', {
                error: 'TRANSACTION_VERIFICATION_ERROR',
              })
              clearInterval(_timer)
            }
            if (trx?.data && trx.status === 'success') {
              setIsLoading(undefined)
              setActiveStep(3)
              setMsg(isNewCreateWiki ? successMessage : editedMessage)
              // clear all edit based metadata from redux state
              Object.values(EditSpecificMetaIds).forEach((id) => {
                dispatch({
                  type: 'wiki/updateMetadata',
                  payload: {
                    id,
                    value: '',
                  },
                })
              })
              setCommitMessage('')
              removeDraftFromLocalStorage()
              clearInterval(_timer)
            }
          }
          checkTrx()
        } catch (err) {
          const errorObject = err as Dict
          setIsLoading('error')
          setMsg(defaultErrorMessage)
          posthog.capture('submit_wiki_error', {
            error: errorObject.message,
          })
          clearInterval(_timer)
        }
        timePassed += 3000
      }, 3000)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refetch],
  )

  useEffect(() => {
    const getSignedTxHash = async () => {
      if (signData && wikiHash && isUserConnected && userAddress) {
        if (signError) {
          setMsg(defaultErrorMessage)
          setIsLoading('error')
          return
        }
        try {
          const hash = await submitVerifiableSignature(
            signData,
            wikiHash,
            userAddress,
            deadline.current,
          )
          if (hash) {
            setTxHash(hash)
            setActiveStep(2)
          }
        } catch (err) {
          const errorObject = err as Dict
          setIsLoading('error')
          setMsg(errorObject.response.errors[0].extensions.exception.reason)

          posthog.capture('submit_wiki_error', {
            error: errorObject.response.errors[0].extensions.exception.reason,
          })
        }
      }
    }
    getSignedTxHash()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signData, signError])

  return { signing, saveHashInTheBlockchain, verifyTrxHash, txHash }
}
