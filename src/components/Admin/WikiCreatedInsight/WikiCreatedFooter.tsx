import { WikiCreatedFooterProps } from '@/types/admin'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Flex, Button } from '@chakra-ui/react'
import React from 'react'

export const WikiCreatedFooter = (props: WikiCreatedFooterProps) => {
  const {
    activatePrevious,
    scrolltoTableTop,
    decreasePagination,
    paginateOffset,
    setActivatePrevious,
    increasePagination,
    wikis,
    nextBtnDisabled,
  } = props

  return (
    <Flex justify="space-between" w="95%" m="0 auto">
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
        rightIcon={<ArrowForwardIcon />}
        variant="outline"
        onClick={() => {
          scrolltoTableTop()
          increasePagination()
          if (wikis && wikis?.length >= 10) {
            setActivatePrevious(true)
          }
        }}
        disabled={nextBtnDisabled}
      >
        Next
      </Button>
    </Flex>
  )
}
