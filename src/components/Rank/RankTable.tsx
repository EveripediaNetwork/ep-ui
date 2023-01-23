import React from 'react'
import { Table, TableContainer, Th, Thead, Tr } from '@chakra-ui/react'
import { RankingListHead } from '@/data/RankingListData'
import RankPagination from './RankPagination'

export const RankTable = ({
  children,
  hasPagination,
}: {
  children: React.ReactNode
  hasPagination?: boolean
}) => {
  return (
    <TableContainer
      w="full"
      boxShadow="md"
      borderRadius="8px"
      bg="rankingListTableBg"
      border="1px solid"
      borderColor="rankingListBorder"
    >
      <Table variant="simple">{children}</Table>
      {hasPagination && <RankPagination />}
    </TableContainer>
  )
}

export const RankTableHead = () => {
  return (
    <Thead h="45px" bg="rankingListTableHead">
      <Tr>
        {RankingListHead.map(item => (
          <Th
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
