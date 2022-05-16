import React, { memo, useState } from 'react'
import { Stack, Text, chakra } from '@chakra-ui/react'
import * as tagsInput from '@zag-js/tags-input'
import { useMachine, useSetup } from '@zag-js/react'

import { useAppDispatch } from '@/store/hook'
import { tagsInputStyle } from '@/components/Layout/Editor/Highlights/HighlightsModal/styles'

const MAX_LENGTH = 15

const Tags = () => {
  const dispatch = useAppDispatch()
  const [tagState, setTagState] = useState({ invalid: false, msg: '' })

  const [state, send] = useMachine(
    tagsInput.machine({
      max: 5,
      validate(opts) {
        if (opts.inputValue.indexOf(' ') >= 0) {
          setTagState({ msg: "Name can't contain blank spaces", invalid: true })
          return false
        }
        if (opts.inputValue.length >= MAX_LENGTH) {
          setTagState({ msg: `Max length is ${MAX_LENGTH}`, invalid: true })
          return false
        }
        if (opts.values.includes(opts.inputValue)) {
          setTagState({ msg: 'Tag already added', invalid: true })
          return false
        }
        return true
      },
      onChange(tags) {
        setTagState({ msg: '', invalid: false })
        dispatch({
          type: 'wiki/setTags',
          payload: tags.values.map(ta => ({ id: ta })),
        })
      },
    }),
  )
  const ref = useSetup({ send, id: '1' })
  const api = tagsInput.connect(state, send)

  return (
    <Stack spacing="4">
      <Text fontWeight="semibold">
        Tags <chakra.span opacity={0.4}>(Add up to 5)</chakra.span>
      </Text>
      <chakra.div
        rounded="md"
        border="solid 1px"
        borderColor="gray.300"
        _dark={{ borderColor: 'whiteAlpha.300', bg: 'gray.700' }}
        p="5"
      >
        <chakra.div ref={ref} {...api.rootProps} sx={{ ...tagsInputStyle }}>
          {api.value.map((value, index) => (
            <span key={index}>
              <div {...api.getTagProps({ index, value })}>
                <span>{value} </span>
                <button
                  type="button"
                  {...api.getTagDeleteButtonProps({ index, value })}
                >
                  &#x2715;
                </button>
              </div>
              <input {...api.getTagInputProps({ index, value })} />
            </span>
          ))}
          <input placeholder="Add tag..." {...api.inputProps} />
        </chakra.div>
        {tagState.invalid ? (
          <Text fontSize="xs" color="red">
            {tagState.msg}
          </Text>
        ) : null}
      </chakra.div>
    </Stack>
  )
}

export default memo(Tags)
