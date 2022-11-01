import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Stack, Text, chakra, Box, useDisclosure } from '@chakra-ui/react'
import * as tagsInput from '@zag-js/tags-input'
import { mergeProps, useMachine, useSetup } from '@zag-js/react'

import { useAppDispatch, useAppSelector } from '@/store/hook'
import { tagsInputStyle } from '@/components/Layout/Editor/Highlights/HighlightsModal/styles'
import { useTagSearch } from '@/services/search/utils'
import { TagsSuggestions, TagsSuggestionsValues } from '@/data/TagsSuggestions'
import { Select, components, MultiValue } from 'chakra-react-select'

type TagValue = MultiValue<{
  label: string;
  value: string;
}>

const Tags = () => {
  const dispatch = useAppDispatch()
  const currentWiki = useAppSelector(state => state.wiki)
  const [value, setValue] = useState<TagValue>(currentWiki.tags.map(ta => ({label: ta.id, value: ta.id})))
console.log(currentWiki.tags)
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
          options={TagsSuggestionsValues}
          onChange={(item)=>handleOnchange(item)}
          defaultValue={currentWiki.tags.map(ta => ({label: ta.id, value: ta.id}))}
        />
      </chakra.div>
    </Stack>
  )
}

export default memo(Tags)
