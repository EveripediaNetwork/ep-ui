import React, { memo, useState } from 'react'
import { Stack, Text, chakra } from '@chakra-ui/react'

import { useAppDispatch } from '@/store/hook'
import { TagsSuggestions } from '@/data/TagsSuggestions'
import { Select, MultiValue } from 'chakra-react-select'
import { Wiki } from '@everipedia/iq-utils'
import { useTranslation } from 'next-i18next'

type TagValue = MultiValue<{
  label: string
  value: string
}>

const TagsInput = ({ wiki }: { wiki: Wiki }) => {
  const { t } = useTranslation('wiki')
  const dispatch = useAppDispatch()
  const [value, setValue] = useState<TagValue>(
    wiki.tags.map((ta) => ({ label: ta.id, value: ta.id })),
  )
  const handleOnchange = (item: TagValue) => {
    setValue(item)
    dispatch({
      type: 'wiki/setTags',
      payload: item.map((ta) => ({ id: ta.value })),
    })
  }

  return (
    <Stack spacing="4">
      <Text fontWeight="semibold">
        {t('tags')}{' '}
        <chakra.span opacity={0.4}>{`(${t('tagLimit')})`}</chakra.span>
      </Text>
      <chakra.div
        zIndex="999"
        rounded="md"
        borderWidth={1}
        p={2}
        pos="relative"
        maxH="max-content"
      >
        <Select
          isOptionDisabled={() => value.length >= 5}
          placeholder={t('addTagsPlaceholder')}
          variant="unstyled"
          isMulti
          size="sm"
          options={TagsSuggestions.map((suggestion) => {
            return { value: suggestion.value, label: t(suggestion.label) }
          })}
          onChange={(item) => handleOnchange(item)}
          defaultValue={wiki.tags.map((ta) => ({
            label: ta.id,
            value: ta.id,
          }))}
        />
      </chakra.div>
    </Stack>
  )
}

export default memo(TagsInput)
