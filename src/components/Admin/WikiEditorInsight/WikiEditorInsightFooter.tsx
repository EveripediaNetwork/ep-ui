import React from 'react'
import { Button, Flex } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Editors } from '@/types/admin'

type WikiEditorInsightFooterProps = {
  searchKeyWord: string
  activatePrevious: ConstrainBoolean
  editorsData?: Editors[]
  scrolltoTableTop: () => void
  increasePagination: () => void
  decreasePagination: () => void
  setActivatePrevious: (activatePrev: boolean) => void
}

const WikiEditorInsightFooter = ({
  searchKeyWord,
  activatePrevious,
  editorsData,
  scrolltoTableTop,
  increasePagination,
  setActivatePrevious,
  decreasePagination,
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
        }}
      >
        Previous
      </Button>
      <Button
        disabled={!editorsData || editorsData.length === 0}
        rightIcon={<ArrowForwardIcon />}
        variant="outline"
        onClick={() => {
          scrolltoTableTop()
          increasePagination()

          if (editorsData && editorsData?.length >= 7) {
            setActivatePrevious(true)
          }
        }}
      >
        Next
      </Button>
    </Flex>
  )
}

export default WikiEditorInsightFooter
