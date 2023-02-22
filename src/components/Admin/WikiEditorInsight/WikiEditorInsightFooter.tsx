import React from 'react'
import { Button, Flex } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { EditorsTable } from '@/types/admin'

type WikiEditorInsightFooterProps = {
  searchKeyWord: string
  paginateOffset: number
  activatePrevious: boolean
  allowNext: boolean
  editorsData?: EditorsTable[]
  scrolltoTableTop: () => void
  increasePagination: () => void
  decreasePagination: () => void
  setActivatePrevious: (activatePrev: boolean) => void
  setAllowNext: (allowNext: boolean) => void
}

const WikiEditorInsightFooter = ({
  searchKeyWord,
  paginateOffset,
  activatePrevious,
  editorsData,
  scrolltoTableTop,
  increasePagination,
  allowNext,
  setActivatePrevious,
  decreasePagination,
  setAllowNext,
}: WikiEditorInsightFooterProps) => {
  return (
    <Flex
      justify="space-between"
      w="95%"
      m="0 auto"
      display={searchKeyWord.length > 0 ? 'none' : 'flex'}
    >
      <Button
        leftIcon={<ArrowBackIcon />}
        variant="outline"
        disabled={!activatePrevious}
        onClick={() => {
          scrolltoTableTop()
          decreasePagination()
          if (paginateOffset === 0) {
            setActivatePrevious(false)
          }
        }}
      >
        Previous
      </Button>
      <Button
        disabled={!editorsData || editorsData.length === 0}
        rightIcon={<ArrowForwardIcon />}
        variant="outline"
        onClick={() => {
          if (allowNext) {
            scrolltoTableTop()
            increasePagination()
          }

          setAllowNext(true)
          if (editorsData && editorsData?.length >= 7) {
            setActivatePrevious(true)
          }
        }}
        cursor={
          !allowNext && editorsData && editorsData?.length >= 7
            ? 'wait'
            : 'pointer'
        }
      >
        Next
      </Button>
    </Flex>
  )
}

export default WikiEditorInsightFooter
