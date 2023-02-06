import React, { useState } from 'react'
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Tooltip,
} from '@chakra-ui/react'
import {
  CommitMessageInput,
  CommitMessagePopOverFooter,
} from './CommitMessageInput'

const PublishWithCommitMessage = ({
  handleWikiPublish,
  isPublishDisabled,
  submittingWiki,
}: {
  handleWikiPublish: () => void
  isPublishDisabled: boolean
  submittingWiki: boolean
}) => {
  const [isWritingCommitMsg, setIsWritingCommitMsg] = useState(false)

  return (
    <Popover
      isOpen={isWritingCommitMsg}
      onClose={() => setIsWritingCommitMsg(false)}
    >
      <PopoverTrigger>
        <Button
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
          onClick={() => setIsWritingCommitMsg(true)}
        >
          Publish
        </Button>
      </PopoverTrigger>
      <PopoverContent m={4}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          Commit Message <small>(Optional)</small>{' '}
        </PopoverHeader>
        <PopoverBody>
          <CommitMessageInput />
        </PopoverBody>
        <PopoverFooter>
          <CommitMessagePopOverFooter handleSubmitWiki={handleWikiPublish} />
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export const WikiPublishButton = () => {
  const handleWikiPublish = () => {}
  const isPublishDisabled = false
  const isNewWiki = false
  const userCanEdit = true

  return (
    <Tooltip
      isDisabled={userCanEdit}
      p={2}
      rounded="md"
      placement="bottom-start"
      shouldWrapChildren
      color="white"
      bg="toolTipBg"
      hasArrow
      label="Your address is not yet whitelisted"
      mt="3"
    >
      {isNewWiki ? (
        <PublishWithCommitMessage
          handleWikiPublish={handleWikiPublish}
          isPublishDisabled={isPublishDisabled}
          submittingWiki={false}
        />
      ) : (
        <Button
          onClick={handleWikiPublish}
          disabled={!userCanEdit}
          _disabled={{
            opacity: isPublishDisabled ? 0.5 : undefined,
            _hover: { bgColor: 'grey !important', cursor: 'not-allowed' },
          }}
        >
          Publish
        </Button>
      )}
    </Tooltip>
  )
}
