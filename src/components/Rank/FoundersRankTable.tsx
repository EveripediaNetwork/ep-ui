import React from 'react'
import {
  Table,
  TableContainer,
  Th,
  Thead,
  Tr,
  Flex,
  TableContainerProps,
} from '@chakra-ui/react'
import { FoundersRankingListHead } from '@/data/RankingListData'
import RankPagination from './RankPagination'
import { RankTableProps } from '@/types/RankDataTypes'
import { OnClickMap } from '@/types/RankDataTypes'

export const FoundersRankTable = ({
  children,
  hasPagination,
  onPageChange,
  totalCount = 0,
  siblingCount = 0,
  currentPage = 1,
  pageSize = 10,
  ...rest
}: RankTableProps & TableContainerProps) => {
  return (
    <TableContainer
      w="100%"
      boxShadow="3xl"
      borderRadius="8px"
      bg="rankingListTableBg"
      border="1px solid"
      borderColor="rankingListBorder"
      _dark={{ boxShadow: '0px 25px 50px -12px rgba(16, 16, 17, 0.25)' }}
      borderBottom="none"
      {...rest}
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

interface FoundersRankTableHeadProps {
  onClickMap: OnClickMap
}

export const FoundersRankTableHead = ({
  onClickMap,
}: FoundersRankTableHeadProps) => {
  return (
    <Thead h="45px" bg="rankingListTableHead">
      <Tr>
        {FoundersRankingListHead.map((item, i) => {
          const onClick = onClickMap?.[item.id]
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
