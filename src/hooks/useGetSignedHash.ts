import {
  useAccount,
  useEstimateFeesPerGas,
  useSignTypedData,
  useTransaction,
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
import { logEvent } from '@/utils/googleAnalytics'
import { Dict } from '@chakra-ui/utils'
import { EditSpecificMetaIds } from '@everipedia/iq-utils'
import { domain, types } from '@/utils/CreateWikiUtils/domainType'
import { useCreateWikiContext } from './useCreateWikiState'

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

  const { address: userAddress, isConnected: isUserConnected } = useAccount()
  const deadline = useRef(0)

  const {
    data: signData,
    error: signError,
    signTypedDataAsync,
    status,
  } = useSignTypedData()

  const signing = status === 'pending'

  const { refetch } = useTransaction({
    hash: txHash as `0x${string}`,
  })

  const { data: feeData } = useEstimateFeesPerGas({
    formatUnits: 'gwei',
  })

  const gasPrice = useMemo(
    () => parseFloat(feeData?.formatted.gasPrice || '0'),
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
        setMsg(err.message || defaultErrorMessage)
        logEvent({
          action: 'SUBMIT_WIKI_ERROR',
          label: err.message,
          category: 'wiki_error',
          value: 1,
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
              logEvent({
                action: 'SUBMIT_WIKI_ERROR',
                label: 'TRANSACTION_VERIFICATION_ERROR',
                category: 'wiki_error',
                value: 1,
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
          logEvent({
            action: 'SUBMIT_WIKI_ERROR',
            label: errorObject.message,
            category: 'wiki_error',
            value: 1,
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
          logEvent({
            action: 'SUBMIT_WIKI_ERROR',
            label: errorObject.response.errors[0].extensions.exception.reason,
            category: 'wiki_error',
            value: 1,
          })
        }
      }
    }
    getSignedTxHash()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signData, signError])

  return { signing, saveHashInTheBlockchain, verifyTrxHash, txHash }
}
