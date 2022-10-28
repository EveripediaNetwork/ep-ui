import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Stack, Text, chakra, Box, useDisclosure } from '@chakra-ui/react'
import * as tagsInput from '@zag-js/tags-input'
import { mergeProps, useMachine, useSetup } from '@zag-js/react'

import { useAppDispatch, useAppSelector } from '@/store/hook'
import { tagsInputStyle } from '@/components/Layout/Editor/Highlights/HighlightsModal/styles'
import { useTagSearch } from '@/services/search/utils'
import { TagsSuggestions } from '@/data/TagsSuggestions'

const MAX_LENGTH = 20

const Tags = () => {
  const dispatch = useAppDispatch()
  const [tagState, setTagState] = useState({ invalid: false, msg: '' })
  const { setQuery, results } = useTagSearch()
  const [editTagIndex, setEditTagIndex] = useState<number>(-1)
  const currentWiki = useAppSelector(state => state.wiki)
  const [suggestionSelectionId, setSuggestionSelectionId] = useState<number>(-1)
  const {
    isOpen: isOpenSuggestions,
    onOpen: onOpenSuggestions,
    onClose: onCloseSuggestions,
  } = useDisclosure()

  const [state, send] = useMachine(
    tagsInput.machine({
      value: currentWiki.tags.map(ta => ta.id),
      max: 5,
      delimiter: '',
      allowEditTag: false,
      validate(opts) {
        console.log(TagsSuggestions)
        console.log(opts.inputValue)
        if (!TagsSuggestions.includes(opts.inputValue)) {
          return false
        }
        if (opts.inputValue.indexOf(' ') >= 0) {
          setTagState({
            msg: "Name can't contain blank spaces",
            invalid: true,
          })
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
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleKeyPress = useCallback(
    (e: { key: string | number; preventDefault: () => void }) => {
      const keyMap: Record<string, () => void> = {
        ArrowDown() {
          console.log('jdjdjdjdjdjd')
          if (suggestionSelectionId < results.length - 1)
            setSuggestionSelectionId(p => p + 1)
        },
        ArrowUp() {
          if (suggestionSelectionId > 0) setSuggestionSelectionId(p => p - 1)
        },
        Enter() {
          setQuery('')
          inputRef.current?.focus()
          if (suggestionSelectionId === -1) return
          if (editTagIndex === -1)
            api.setValue([...api.value, results[suggestionSelectionId]?.id])
          else {
            api.setValue(
              api.value.map((_, index) =>
                index === editTagIndex
                  ? results[suggestionSelectionId]?.id
                  : api.value[index],
              ),
            )
          }
          setSuggestionSelectionId(-1)
        },
      }
      const exec = keyMap[e.key]
      if (exec) {
        e.preventDefault()
        exec()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [results, suggestionSelectionId, editTagIndex, setQuery],
  )

  useEffect(() => {
    if (results.length > 0) {
      window.addEventListener('keydown', handleKeyPress)
      onOpenSuggestions()
    } else {
      window.removeEventListener('keydown', handleKeyPress)
      onCloseSuggestions()
    }
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [results, handleKeyPress, onOpenSuggestions, onCloseSuggestions])

  const InputProps = mergeProps(api.inputProps, {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setSuggestionSelectionId(-1)
      setEditTagIndex(-1)
      setQuery(e.target.value)
    },
    onBlur: () => {
      setTimeout(() => {
        setSuggestionSelectionId(-1)
        onCloseSuggestions()
      }, 100)
    },
  })

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
        <chakra.div
          ref={ref}
          display="flex"
          alignItems="center"
          {...api.rootProps}
          sx={{ ...tagsInputStyle }}
        >
          {api.value.map((value, index) => (
            <chakra.span key={index} whiteSpace="nowrap">
              <div {...api.getTagProps({ index, value })}>
                <span>{value} </span>
                <button
                  type="button"
                  {...api.getTagDeleteButtonProps({ index, value })}
                >
                  &#x2715;
                </button>
              </div>
            </chakra.span>
          ))}
          {api.value.length < 5 && (
            <input placeholder="Add tag..." {...InputProps} ref={inputRef} />
          )}
        </chakra.div>
        {tagState.invalid ? (
          <Text fontSize="xs" color="red.300">
            {tagState.msg}
          </Text>
        ) : null}
        {isOpenSuggestions && (
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
                key={tag.id}
                onClick={() => {
                  if (editTagIndex === -1) api.addValue(tag.id)
                  else
                    api.setValue(
                      api.value.map((_, index) =>
                        index === editTagIndex ? tag.id : api.value[index],
                      ),
                    )
                  setQuery('')
                  setSuggestionSelectionId(-1)
                  inputRef.current?.focus()
                }}
                bgColor={
                  suggestionSelectionId === i ? 'hoverBg' : 'transparent'
                }
                w="full"
                textAlign="left"
                p={2}
                borderTopWidth={i > 0 ? 1 : 0}
                cursor="pointer"
                sx={{
                  '&:hover, &:focus, &:active': {
                    bg: 'hoverBg',
                    outline: 'none',
                  },
                }}
              >
                <Text color="linkColor">{tag.id}</Text>
              </Box>
            ))}
          </Box>
        )}
      </chakra.div>
    </Stack>
  )
}

export default memo(Tags)
