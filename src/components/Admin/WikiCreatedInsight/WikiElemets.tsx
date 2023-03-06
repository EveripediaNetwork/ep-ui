import { WikiCreatedFooterProps, Wikis } from '@/types/admin'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Flex, Button, HStack, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { BsDot } from 'react-icons/bs'
import { RiQuestionLine } from 'react-icons/ri'

export const WikiCreatedFooter = (props: WikiCreatedFooterProps) => {
  const {
    activatePrevious,
    scrolltoTableTop,
    paginateOffset,
    setActivatePrevious,
    setPaginateOffset,
    wikis,
    nextBtnDisabled,
  } = props

  const increasePagination = () => {
    return (
      wikis && wikis?.length >= 10 && setPaginateOffset(paginateOffset + 10)
    )
  }

  const decreasePagination = () => {
    return (
      wikis && wikis?.length >= 10 && setPaginateOffset(paginateOffset - 10)
    )
  }

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

type WikiTableColProps = {
  item: Wikis
  PromoteClickOne: () => void
  PromoteClickTwo: () => void
  ArchiveClickOne: () => void
  ArchiveClickTwo: () => void
}
export const WikiTableCol = (props: WikiTableColProps) => {
  const {
    item,
    PromoteClickOne,
    PromoteClickTwo,
    ArchiveClickOne,
    ArchiveClickTwo,
  } = props
  return (
    <Flex w="100%" gap={2} alignItems="center" justifyContent="flex-end" pr={5}>
      <HStack spacing={5}>
        {!item.promoted ? (
          <Text
            color={item.hidden ? '#E2E8F0' : '#FF5CAA'}
            _dark={{
              color: item.hidden ? '#51565F' : '#FF1A88',
            }}
            cursor={item.hidden ? 'not-allowed' : 'pointer'}
            fontWeight="semibold"
            onClick={PromoteClickOne}
          >
            Promote
          </Text>
        ) : (
          <HStack spacing={2} onClick={PromoteClickTwo}>
            <Text
              color="#E2E8F0"
              _dark={{
                color: item.hidden ? '#51565F' : '#495a68',
              }}
              cursor={item.hidden ? 'not-allowed' : 'pointer'}
            >
              Promote
            </Text>
            <Icon
              fontSize="20px"
              cursor="pointer"
              color="#F11a82"
              as={RiQuestionLine}
            />
          </HStack>
        )}

        {!item.hidden ? (
          <Text
            cursor={item.hidden ? 'not-allowed' : 'pointer'}
            fontWeight="medium"
            onClick={ArchiveClickOne}
          >
            Archive
          </Text>
        ) : (
          <HStack spacing={2} onClick={ArchiveClickTwo}>
            <Text color="#F11a82" _dark={{ color: '#FF1A88' }} cursor="pointer">
              Unarchive
            </Text>
            <Icon
              fontSize="20px"
              cursor="pointer"
              color="#F11a82"
              as={RiQuestionLine}
            />
          </HStack>
        )}
      </HStack>
    </Flex>
  )
}

export const WikiColDate = ({ colDate }: { colDate: string | undefined }) => {
  return (
    <HStack>
      <Text color="#718096">
        {colDate
          ? new Date(colDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : '-'}
      </Text>
      <Icon
        fontSize="20px"
        cursor="pointer"
        color="black"
        alignSelf="center"
        as={BsDot}
        justifySelf="center"
      />
      <Text color="#718096" textTransform="lowercase">
        {colDate
          ? new Date(colDate).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
            })
          : '-'}
      </Text>
    </HStack>
  )
}
