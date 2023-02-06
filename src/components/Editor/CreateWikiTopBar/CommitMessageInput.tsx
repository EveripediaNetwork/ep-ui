import { useAppSelector } from '@/store/hook'
import { Button, HStack, Tag, Textarea } from '@chakra-ui/react'
import { EditSpecificMetaIds } from '@everipedia/iq-utils'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const commitMessageLimitAlertStyle = {
  sx: {
    bgColor: '#d406082a',
    '&:focus': {
      borderColor: '#ff787c',
      boxShadow: '0 0 0 1px #ff787c',
    },
  },
}

const baseStyle = {
  sx: {
    bgColor: 'transparent',
    '&:focus': {
      borderColor: '#63b3ed',
      boxShadow: '0 0 0 1px #63b3ed',
    },
  },
}

export const CommitMessageInput = () => {
  const [commitMessageLimitAlert, setCommitMessageLimitAlert] = useState(false)
  const metadata = useAppSelector(state => state.wiki.metadata)
  const commitMessage = metadata.find(
    m => m.id === EditSpecificMetaIds.COMMIT_MESSAGE,
  )?.value

  const commitMsgCountColor = () => {
    let color = 'yellow'
    if (commitMessageLimitAlert) {
      color = 'red'
    }
    if ((commitMessage?.length || 0) > 50) color = 'green'
    return color
  }

  const dispatch = useDispatch()

  return (
    <>
      <Tag
        mb={{
          base: 2,
          lg: 2,
        }}
        variant="solid"
        colorScheme={commitMsgCountColor()}
      >
        {commitMessage?.length || 0}/128
      </Tag>
      <Textarea
        value={commitMessage}
        placeholder="Enter what changed..."
        {...(commitMessageLimitAlert
          ? commitMessageLimitAlertStyle
          : baseStyle)}
        onChange={(e: {
          target: {
            value: string
          }
        }) => {
          if (e.target.value.length <= 128) {
            dispatch({
              type: 'wiki/updateMetadata',
              payload: {
                id: EditSpecificMetaIds.COMMIT_MESSAGE,
                value: e.target.value,
              },
            })
          } else {
            setCommitMessageLimitAlert(true)
            setTimeout(() => setCommitMessageLimitAlert(false), 2000)
          }
        }}
      />
    </>
  )
}

export const CommitMessagePopOverFooter = ({
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
