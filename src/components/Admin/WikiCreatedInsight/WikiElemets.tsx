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

  const handlePagination = (increment: number) => {
    if (wikis && wikis.length >= 10) {
      setPaginateOffset((prevOffset) => prevOffset + 10 * increment)
    }
  }

  return (
    <Flex justify="space-between" w="95%" m="0 auto">
      <Button
        leftIcon={<ArrowBackIcon />}
        variant="outline"
        disabled={!activatePrevious}
        onClick={() => {
          scrolltoTableTop()
          handlePagination(-1)
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
          handlePagination(1)
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
            color={item.hidden ? 'divider' : 'brandAssetDownloadBttnColor'}
            cursor={item.hidden ? 'not-allowed' : 'pointer'}
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

        <HStack spacing={2}>
          <Text
            cursor={'pointer'}
            fontWeight="normal"
            onClick={item.hidden ? ArchiveClickTwo : ArchiveClickOne}
            color={'wikiFlagTextColor'}
          >
            {item.hidden ? 'Unarchive' : 'Archive'}
          </Text>
          {item.hidden && (
            <Icon
              fontSize="20px"
              cursor="pointer"
              color="electricPink"
              as={RiQuestionLine}
              onClick={ArchiveClickTwo}
            />
          )}
        </HStack>
      </HStack>
    </Flex>
  )
}

export const WikiColDate = ({ colDate }: { colDate: string | undefined }) => {
  return (
    <HStack>
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
