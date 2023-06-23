import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Icon,
  Flex,
  useToast,
} from '@chakra-ui/react'
import { useSteps } from 'chakra-ui-steps'
import { RiCloseLine } from 'react-icons/ri'
import {
  useGetSearchedWikisByTitleQuery,
  usePostPromotedWikiMutation,
  useGetAllPromotedWikiCountQuery,
} from '@/services/admin'
import { PromoteCreatedWikisModalProps } from '@/types/admin'
import { getWikiIdUsingLevel } from '@/utils/AdminUtils/dataUpdate'
import { PromoteModalContent } from './PromotedWikiContent'

export const PromoteCreatedWikisModal = (
  props: PromoteCreatedWikisModalProps,
) => {
  const {
    onClose = () => {},
    isOpen = false,
    wikiChosenTitle,
    wikiChosenId,
    hideFunc,
    ...rest
  } = props
  const [buttonOne, setbuttonOne] = useState('Cancel')
  const [buttonTwo, setbuttonTwo] = useState('Continue')
  const [initGetSearchedWikis, setInitGetSearchedWikis] =
    useState<boolean>(true)
  const { data: promotedWikis } = useGetAllPromotedWikiCountQuery(0)
  const arrs = () => {
    const arr = []
    const data = promotedWikis || []
    for (let index = 1; index < data?.length; index += 1) {
      arr.push(data[index].promoted)
    }
  }

  const { data: wiki } = useGetSearchedWikisByTitleQuery(wikiChosenTitle, {
    skip: initGetSearchedWikis,
  })
  const [value, setValue] = useState('1')
  const toast = useToast()
  const ModalData = wiki?.filter(
    (item) => item.id === wikiChosenId && item.title === wikiChosenTitle,
  )
  const Data = ModalData?.[0]
  const { nextStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })

  const steps = [
    { label: 'STEP 1', description: 'Promote to Featured wiki section' },
    { label: 'STEP 2', description: 'Select promotion slot' },
    { label: 'STEP 3', description: 'Promotion confirmation' },
  ]
  const [promoteWiki, { error: posTPromoteWikiError }] =
    usePostPromotedWikiMutation()

  const Close = () => {
    setbuttonOne('Cancel')
    setbuttonTwo('Continue')
    reset()
    onClose()
  }
  const handlePromoteWiki = async ({
    id,
    level,
    isModal,
  }: {
    id: string
    level: number
    isModal: boolean
  }) => {
    await promoteWiki({
      id,
      level,
    })
    if (isModal) {
      let toastTitle = 'Wiki Successfully Promoted to Trending wikis'
      let toastMessage =
        'The selected wiki has been promoted to the trending wikis.'
      let toastType: 'success' | 'error' = 'success'
      if (posTPromoteWikiError) {
        toastTitle = 'Wiki Archive Failed'
        toastMessage = "We couldn't save your wiki changes."
        toastType = 'error'
      }
      toast({
        title: toastTitle,
        description: toastMessage,
        status: toastType,
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const TrendingwikiSelected = async () => {
    if (activeStep === 0) {
      arrs()
      nextStep()
      setInitGetSearchedWikis(false)
      setbuttonOne('Cancel')
      setbuttonTwo('Apply')
    } else if (activeStep === 1) {
      nextStep()
      setbuttonOne('Cancel')
      setbuttonTwo('Promote')
    } else if (activeStep === 2) {
      await promoteWiki({
        id: wikiChosenId,
        level: Number(value),
      })
      handlePromoteWiki({
        id: wikiChosenId,
        level: Number(value),
        isModal: true,
      })
      const id = getWikiIdUsingLevel(Number(value), promotedWikis)
      if (id) {
        handlePromoteWiki({ id, level: 0, isModal: false })
      }
      hideFunc()
      Close()
    }
  }

  if (!isOpen) return null

  return (
    <Modal
      onClose={Close}
      isOpen={isOpen}
      isCentered
      size={{ lg: '3xl', base: 'xl' }}
      {...rest}
    >
      <ModalOverlay />
      <ModalContent
        _dark={{
          bg: 'gray.800',
        }}
      >
        <ModalBody>
          <Flex w="full" justify="flex-end" m={0} pt="2">
            <Icon
              cursor="pointer"
              fontSize="2xl"
              fontWeight={600}
              as={RiCloseLine}
              onClick={Close}
              alignSelf="center"
            />
          </Flex>
          <PromoteModalContent
            activeStep={activeStep}
            steps={steps}
            Close={() => Close()}
            buttonOne={buttonOne}
            buttonTwo={buttonTwo}
            promotedWikis={promotedWikis}
            Data={Data}
            value={value}
            setValue={setValue}
            TrendingwikiSelected={TrendingwikiSelected}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
