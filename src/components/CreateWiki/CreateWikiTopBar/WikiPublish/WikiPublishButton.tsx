import React from 'react'
import { Button, Tooltip } from '@chakra-ui/react'
import { PublishWithCommitMessage } from './WikiPublishWithCommitMessage'

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
