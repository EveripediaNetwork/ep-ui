import usePagination from '@/hooks/usePagination'
import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai'

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
    <Flex justifyContent="space-between">
      <Button
        leftIcon={<AiOutlineDoubleLeft />}
        _hover={{ bg: 'transparent' }}
        p="0"
        bg="transparent"
        _active={{ bg: 'transparent' }}
        color="brand.500"
        _dark={{ color: 'brand.800' }}
        disabled={currentPage === 1}
        onClick={() => {
          onPrevious()
        }}
      >
        Prev
      </Button>
      <Button
        leftIcon={<AiOutlineDoubleRight />}
        _hover={{ bg: 'transparent' }}
        p="0"
        bg="transparent"
        _active={{ bg: 'transparent' }}
        color="brand.500"
        _dark={{ color: 'brand.800' }}
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
