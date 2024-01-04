import usePagination, { DOTS } from '@/hooks/usePagination'
import { RankpaginationProps } from '@/types/RankDataTypes'
import { Button, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { useTranslation } from 'next-i18next'

const RankPagination = (props: RankpaginationProps) => {
  const router = useRouter()
  const { query, pathname } = router
  const { t } = useTranslation('rank')

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

  const handlePageChange = (direction: number) => {
    const pageNumber = currentPage + 1 * direction
    const updatedQuery = {
      pathname,
      query: {
        ...query,
        p: pageNumber,
      },
    }
    onPageChange(pageNumber)
    router.push(updatedQuery)
  }

  const handlePaginationBtnClick = (pageNumber: number) => {
    const updatedQuery = {
      pathname,
      query: {
        ...query,
        p: pageNumber,
      },
    }
    onPageChange(pageNumber)
    router.push(updatedQuery)
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <Flex
      w={{ base: '1140px', md: 'full' }}
      justifyContent="space-between"
      px="6"
      py="4"
      alignItems="center"
      whiteSpace="nowrap"
      overflowX="auto"
    >
      <Button
        py="3 !important"
        px="4 !important"
        border="1px solid"
        borderColor="rankPageButtonBorder"
        leftIcon={<AiOutlineArrowLeft />}
        _hover={{ bg: 'transparent' }}
        p="0"
        bg="transparent"
        _active={{ bg: 'transparent' }}
        color="rankPageButtonText"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(-1)}
      >
        {t('Previous')}
      </Button>
      <Flex gap="3">
        {paginationRange.map((pageNumber, index) =>
          pageNumber === DOTS ? (
            <Button
              key={DOTS + index}
              w="40px"
              h="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              variant="unstyled"
              fontWeight={600}
              color="paginationButtonDefault"
            >
              &#8230;
            </Button>
          ) : (
            <Button
              key={pageNumber}
              w="40px"
              h="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              variant="unstyled"
              fontWeight={600}
              bg={
                pageNumber === currentPage
                  ? 'paginationButtonActiveBg'
                  : 'transparent'
              }
              color={
                pageNumber === currentPage
                  ? 'paginationButtonActive'
                  : 'paginationButtonDefault'
              }
              onClick={() => handlePaginationBtnClick(pageNumber as number)}
            >
              {pageNumber}
            </Button>
          ),
        )}
      </Flex>
      <Button
        py="3 !important"
        px="4 !important"
        border="1px solid"
        borderColor="rankPageButtonBorder"
        rightIcon={<AiOutlineArrowRight />}
        _hover={{ bg: 'transparent' }}
        p="0"
        bg="transparent"
        color="rankPageButtonText"
        _active={{ bg: 'transparent' }}
        disabled={currentPage === lastPage}
        onClick={() => handlePageChange(1)}
      >
        {t('Next')}
      </Button>
    </Flex>
  )
}

export default RankPagination
