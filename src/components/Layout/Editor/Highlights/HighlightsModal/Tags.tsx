import React, { memo, useRef, useState } from 'react'
import {
  Flex,
  Text,
  Badge,
  CloseButton,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  GridItem,
} from '@chakra-ui/react'

import { useAppDispatch, useAppSelector } from '@/store/hook'
import { Tag } from '@/types/Wiki'

const MAX_LENGTH = 15

const Tags = () => {
  const currentWiki = useAppSelector(state => state.wiki)
  const dispatch = useAppDispatch()
  const [tagState, setTagState] = useState({ invalid: false, msg: '' })
  const [addBtnDisabled, setAddBtnDisabled] = useState(true)
  const inputTagRef = useRef<HTMLInputElement>(null)

  const handleAddTag = (value: string) => {
    // update previous invalid state
    if (tagState.invalid) setTagState(prev => ({ ...prev, invalid: false }))

    if (currentWiki.tags.length === 5) {
      setTagState({ msg: "You can't add more than 5 tags", invalid: true })
      return
    }

    const tag = currentWiki.tags.find(t => t.id === value)

    if (tag) {
      setTagState({ msg: 'Tag already added', invalid: true })
      return
    }

    dispatch({
      type: 'wiki/addTag',
      payload: {
        id: value,
      },
    })
  }

  const handleDeleteTag = (value: string) => {
    const tags = currentWiki.tags.filter(t => t.id !== value)

    dispatch({
      type: 'wiki/setTags',
      payload: tags,
    })
  }

  const handleOnTagInputChanges = (value: string) => {
    if (value === '') setAddBtnDisabled(true)
    else if (value.indexOf(' ') >= 0) {
      setTagState({ msg: "Name can't contain blank spaces", invalid: true })
      setAddBtnDisabled(true)
    } else if (value.length >= MAX_LENGTH) {
      setTagState({ msg: `Max length is ${MAX_LENGTH}`, invalid: true })
      setAddBtnDisabled(true)
    } else {
      setTagState({ msg: '', invalid: false })
      setAddBtnDisabled(false)
    }
  }

  return (
    <>
      <GridItem colSpan={2}>
        <Flex direction="column" w="full">
          <Text align="center" mb="2">
            Add up to 5 tags
          </Text>
          <Flex
            mb="3"
            wrap="wrap"
            w="full"
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <InputGroup w="2xs" size="md">
              <Input
                ref={inputTagRef}
                isInvalid={tagState.invalid}
                onChange={event => handleOnTagInputChanges(event.target.value)}
                placeholder="Tag name"
              />
              <InputRightElement width="4.5rem">
                <Button
                  disabled={addBtnDisabled}
                  onClick={() => {
                    if (inputTagRef?.current?.value)
                      handleAddTag(inputTagRef.current.value)
                  }}
                  px="3"
                  h="1.75rem"
                  size="sm"
                  variant="outline"
                >
                  Add
                </Button>
              </InputRightElement>
            </InputGroup>
            {tagState.invalid ? (
              <Text fontSize="xs" color="red">
                {tagState.msg}
              </Text>
            ) : null}
          </Flex>
        </Flex>
      </GridItem>
      <GridItem colSpan={2}>
        <Flex
          flexDirection="row"
          wrap="wrap"
          justify="space-evenly"
          alignItems="center"
          gridColumn="1/3"
        >
          {currentWiki.tags?.map((c: Tag) => (
            <Badge
              variant="outline"
              display="flex"
              flexDirection="row"
              alignItems="center"
              m="1"
              key={c.id}
              justifyContent="space-between"
            >
              {c.id}
              <CloseButton
                size="sm"
                outline="none"
                onClick={() => handleDeleteTag(c.id)}
              />
            </Badge>
          ))}
        </Flex>
      </GridItem>
    </>
  )
}

export default memo(Tags)
