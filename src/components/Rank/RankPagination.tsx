import usePagination from '@/hooks/usePagination'
import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

export type RankpaginationProps = {
  onPageChange: (currentPage: number) => void
  totalCount: number
  siblingCount: number
  currentPage: number
  pageSize: number
}

const RankPagination = (props: RankpaginationProps) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props

  console.log(currentPage)

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <Flex justifyContent="space-between" px="6" py="4" alignItems="center">
      <Button
        py="3 !important"
        px="4 !important"
        border="1px solid"
        borderColor="#D0D5DD"
        leftIcon={<AiOutlineArrowLeft />}
        _hover={{ bg: 'transparent' }}
        p="0"
        bg="transparent"
        _active={{ bg: 'transparent' }}
        color="gray.700"
        disabled={currentPage === 1}
        onClick={() => {
          onPrevious()
        }}
      >
        Prev
      </Button>
      <Button
        py="3 !important"
        px="4 !important"
        border="1px solid"
        borderColor="#D0D5DD"
        rightIcon={<AiOutlineArrowRight />}
        _hover={{ bg: 'transparent' }}
        p="0"
        bg="transparent"
        color="gray.700"
        _active={{ bg: 'transparent' }}
        disabled={currentPage === lastPage}
        onClick={() => {
          onNext()
        }}
      >
        Next
      </Button>
    </Flex>
  )
}

export default RankPagination
