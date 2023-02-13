import React, { ChangeEvent } from 'react'
import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { MdTitle } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/store/hook'

export const WikiTitleInput = () => {
  const dispatch = useDispatch()
  const title = useAppSelector(state => state.wiki.title)
  const { t } = useTranslation()

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <Icon as={MdTitle} color="gray.400" fontSize="25px" />
      </InputLeftElement>
      <Input
        fontWeight="500"
        color="wikiTitleInputText"
        borderColor="transparent"
        fontSize="18px"
        variant="flushed"
        maxW="max(50%, 300px)"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          dispatch({
            type: 'wiki/setCurrentWiki',
            payload: {
              title: event.target.value,
            },
          })
        }}
        value={title}
        placeholder={`${t('wikiTitlePlaceholder')}`}
        _placeholder={{
          color: 'wikiTitleInputText',
        }}
      />
    </InputGroup>
  )
}
