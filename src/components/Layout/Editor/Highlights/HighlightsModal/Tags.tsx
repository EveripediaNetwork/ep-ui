import React, { memo, useState } from 'react'
import { Stack, Text, chakra } from '@chakra-ui/react'

import { useAppDispatch, useAppSelector } from '@/store/hook'
import { TagsSuggestions } from '@/data/TagsSuggestions'
import { Select, MultiValue } from 'chakra-react-select'

type TagValue = MultiValue<{
  label: string
  value: string
}>

const Tags = () => {
  const dispatch = useAppDispatch()
  const currentWiki = useAppSelector(state => state.wiki)
  const [value, setValue] = useState<TagValue>(
    currentWiki.tags.map(ta => ({ label: ta.id, value: ta.id })),
  )
  const handleOnchange = (item: TagValue) => {
    setValue(item)
    dispatch({
      type: 'wiki/setTags',
      payload: item.map(ta => ({ id: ta.value })),
    })
  }
  return (
    <Stack spacing="4">
      <Text fontWeight="semibold">
        Tags <chakra.span opacity={0.4}>(Add up to 5)</chakra.span>
      </Text>
      <chakra.div
        rounded="md"
        border="solid 1px"
        borderColor="borderColor"
        p={3}
        pos="relative"
      >
        <Select
          isOptionDisabled={() => value.length >= 5}
          placeholder="Add tags..."
          variant="unstyled"
          isMulti
          size="md"
          options={TagsSuggestions}
          onChange={item => handleOnchange(item)}
          defaultValue={currentWiki.tags.map(ta => ({
            label: ta.id,
            value: ta.id,
          }))}
        />
      </chakra.div>
    </Stack>
  )
}

export default memo(Tags)
