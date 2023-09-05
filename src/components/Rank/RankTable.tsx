import React from 'react'
import { Table, TableContainer, Th, Thead, Tr, Flex } from '@chakra-ui/react'
import { RankingListHead } from '@/data/RankingListData'
import RankPagination from './RankPagination'
import { RankTableProps } from '@/types/RankDataTypes'
import { OnClickMap } from '@/types/RankDataTypes'

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

interface RankTableHeadProps {
  onClickMap: OnClickMap
}

export const RankTableHead = ({ onClickMap }: RankTableHeadProps) => {
  return (
    <Thead h="45px" bg="rankingListTableHead">
      <Tr>
        {RankingListHead.map((item, i) => {
          const onClick = onClickMap?.[item.label]
          return (
            <Th
              key={i}
              fontWeight={500}
              fontSize="12px"
              textTransform="capitalize"
              color="rankingListTableHeading"
            >
              <Flex
                alignItems="center"
                gap={2}
                as={onClick ? 'button' : 'div'}
                onClick={onClick}
              >
                {item.label}
                {item.Icon && <item.Icon size={18} />}
              </Flex>
            </Th>
          )
        })}
      </Tr>
    </Thead>
  )
}
