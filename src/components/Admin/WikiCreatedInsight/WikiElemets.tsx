import { WikiCreatedFooterProps, WikiTableColProps } from '@/types/admin'
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

  const _IsNextCanGo = () => {}

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
            color={item.hidden ? 'tetiaryGray' : 'brand.500'}
            _dark={{
              color: item.hidden ? 'davyGray' : 'brand.800',
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
              color="tetiaryGray"
              _dark={{
                color: item.hidden ? 'davyGray' : 'denceGray',
              }}
              cursor={item.hidden ? 'not-allowed' : 'pointer'}
            >
              Promote
            </Text>
            <Icon
              fontSize="20px"
              cursor="pointer"
              color="electricPink"
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
            <Text color="unArchiveWiki" cursor="pointer">
              Unarchive
            </Text>
            <Icon
              fontSize="20px"
              cursor="pointer"
              color="electricPink"
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
    <HStack color="primaryGray" _dark={{ color: 'white' }}>
      <Text>
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
        _dark={{ color: 'white' }}
        alignSelf="center"
        as={BsDot}
        justifySelf="center"
      />
      <Text textTransform="lowercase">
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
