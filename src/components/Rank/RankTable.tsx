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
import { RankingListHead } from '@/data/RankingListData'
import RankPagination from './RankPagination'
import { RankTableProps } from '@/types/RankDataTypes'
import { OnClickMap } from '@/types/RankDataTypes'
import { useTranslation } from 'next-i18next'

export const RankTable = ({
  children,
  hasPagination,
  onPageChange,
  totalCount = 0,
  siblingCount = 2,
  currentPage = 1,
  pageSize = 10,
  ...rest
}: RankTableProps & TableContainerProps) => {
  return (
    <TableContainer
      w="full"
      boxShadow="3xl"
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

interface RankTableHeadProps {
  onClickMap: OnClickMap
}

export const RankTableHead = ({ onClickMap }: RankTableHeadProps) => {
  const { t } = useTranslation(['rank', 'common'])

  return (
    <Thead h="45px">
      <Tr>
        {RankingListHead.map((item, i) => {
          const onClick = onClickMap?.[item.id]
          return (
            <Th
              key={i}
              fontWeight={500}
              fontSize="12px"
              textTransform="capitalize"
              color="rankingListTableHeading"
              px={{ base: item.label === '#' ? 3 : 2, md: '6' }}
            >
              <Flex
                alignItems="center"
                gap={{ base: 1, md: 2 }}
                as={onClick ? 'button' : 'div'}
                onClick={onClick}
              >
                {t(item.label)}
                {item.Icon && <item.Icon size={18} />}
              </Flex>
            </Th>
          )
        })}
      </Tr>
    </Thead>
  )
}
