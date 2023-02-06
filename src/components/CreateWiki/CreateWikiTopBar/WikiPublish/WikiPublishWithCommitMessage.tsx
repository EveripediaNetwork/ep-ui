import { PopoverButton } from '@/components/Elements/Popover/Popover'
import { Button, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { EditSpecificMetaIds } from '@everipedia/iq-utils'
import { CommitMessageInput } from './CommitMessageInput'

const CommitMessagePopOverFooter = ({
  handleSubmitWiki,
}: {
  handleSubmitWiki: () => void
}) => {
  const dispatch = useDispatch()
  return (
    <HStack spacing={2} justify="right">
      <Button
        onClick={() => {
          dispatch({
            type: 'wiki/updateMetadata',
            payload: {
              id: EditSpecificMetaIds.COMMIT_MESSAGE,
              value: '',
            },
          })
          handleSubmitWiki()
        }}
        float="right"
        variant="outline"
      >
        Skip
      </Button>
      <Button onClick={handleSubmitWiki}>Submit</Button>
    </HStack>
  )
}

export const PublishWithCommitMessage = ({
  handleWikiPublish,
  isPublishDisabled,
  submittingWiki,
}: {
  handleWikiPublish: () => void
  isPublishDisabled: boolean
  submittingWiki: boolean
}) => {
  return (
    <PopoverButton
      header={
        <Text fontSize="sm" fontWeight="bold">
          Commit Message <small>(Optional)</small>
        </Text>
      }
      footer={
        <CommitMessagePopOverFooter handleSubmitWiki={handleWikiPublish} />
      }
      buttonContents="Publish"
      isLoading={submittingWiki}
      _disabled={{
        opacity: isPublishDisabled ? 0.5 : undefined,
        _hover: {
          bgColor: 'grey !important',
          cursor: 'not-allowed',
        },
      }}
      loadingText="Loading"
      disabled={isPublishDisabled}
    >
      <CommitMessageInput />
    </PopoverButton>
  )
}
