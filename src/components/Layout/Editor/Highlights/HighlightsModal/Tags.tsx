import React, { memo, useRef, useState } from 'react'
import { Stack, Text, chakra, Box } from '@chakra-ui/react'
import * as tagsInput from '@zag-js/tags-input'
import { mergeProps, useMachine, useSetup } from '@zag-js/react'

import { useAppDispatch, useAppSelector } from '@/store/hook'
import { tagsInputStyle } from '@/components/Layout/Editor/Highlights/HighlightsModal/styles'
import { useTagSearch } from '@/services/search/utils'

const MAX_LENGTH = 15

const Tags = () => {
  const dispatch = useAppDispatch()
  const [tagState, setTagState] = useState({ invalid: false, msg: '' })
  const { setQuery, results } = useTagSearch()
  const currentWiki = useAppSelector(state => state.wiki)

  const [state, send] = useMachine(
    tagsInput.machine({
      value: currentWiki.tags.map(ta => ta.id),
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

  const InputProps = mergeProps(api.inputProps, {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value)
    },
  })

  const inputRef = useRef<HTMLInputElement>(null)

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
        p={3}
        pos="relative"
      >
        <chakra.div
          ref={ref}
          display="flex"
          alignItems="center"
          {...api.rootProps}
          sx={{ ...tagsInputStyle }}
        >
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
          <input placeholder="Add tag..." {...InputProps} ref={inputRef} />
        </chakra.div>
        {tagState.invalid ? (
          <Text fontSize="xs" color="red">
            {tagState.msg}
          </Text>
        ) : null}
        {results.length > 0 && (
          <Box
            pos="absolute"
            zIndex={2}
            top="110%"
            left={0}
            right={0}
            borderRadius={4}
            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
            bgColor="cardBg"
            borderWidth={1}
            borderColor="borderColor"
          >
            {results.map((tag, i) => (
              <Box
                as="button"
                key={tag.id}
                onClick={() => {
                  api.addValue(tag.id)
                  setQuery('')
                  inputRef.current?.focus()
                }}
                w="full"
                textAlign="left"
                p={2}
                borderTopWidth={i > 0 ? 1 : 0}
                sx={{
                  '&:hover, &:focus, &:active': {
                    bg: 'hoverBg',
                    outline: 'none',
                  },
                }}
              >
                <Text>{tag.id}</Text>
              </Box>
            ))}
          </Box>
        )}
      </chakra.div>
    </Stack>
  )
}

export default memo(Tags)
