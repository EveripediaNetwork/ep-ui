import React from 'react'
import { Table, TableContainer, Th, Thead, Tr } from '@chakra-ui/react'
import { RankingListHead } from '@/data/RankingListData'
import RankPagination from './RankPagination'
import { RankTableProps } from '@/types/RankDataTypes'

export const RankTable = ({
  children,
  hasPagination,
  onPageChange,
  totalCount = 0,
  siblingCount = 0,
  currentPage = 1,
  pageSize = 10,
}: RankTableProps) => {
  return (
    <TableContainer
      w="full"
      boxShadow="md"
      borderRadius="8px"
      bg="rankingListTableBg"
      border="1px solid"
      borderColor="rankingListBorder"
      borderBottom="none"
    >
      <Table variant="simple">{children}</Table>
      {hasPagination && onPageChange && (
        <RankPagination
          onPageChange={onPageChange}
          totalCount={totalCount}
          siblingCount={siblingCount}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      )}
    </TableContainer>
  )
}

export const RankTableHead = () => {
  return (
    <Thead h="45px" bg="rankingListTableHead">
      <Tr>
        {RankingListHead.map((item, i) => (
          <Th
            key={i}
            fontWeight={500}
            fontSize="12px"
            textTransform="capitalize"
            color="rankingListTableHeading"
          >
            {item.label}
          </Th>
        ))}
      </Tr>
    </Thead>
  )
}
