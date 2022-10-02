import { useAppDispatch, useAppSelector } from '@/store/hook'
import { Box, HStack, Tag, Text, Textarea } from '@chakra-ui/react'
import React, { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

const SummaryInput = () => {
  const wiki = useAppSelector(state => state.wiki)
  const [showRed, setShowRed] = React.useState(false)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  return (
    <Box>
      <HStack mb={2} justify="space-between" align="center">
        <Text color="wikiSummaryLabel">{`${t('wikiSummaryLabel')}`}</Text>
        <Tag
          variant="solid"
          colorScheme={
            // eslint-disable-next-line no-nested-ternary
            showRed
              ? 'red'
              : (wiki?.summary?.length || '') > 50
              ? 'green'
              : 'yellow'
          }
        >
          {wiki?.summary?.length || 0}/128
        </Tag>
      </HStack>
      <Textarea
        bgColor={showRed ? '#d406082a' : 'transparent'}
        color="wikiSummaryInputText"
        _focus={{
          borderColor: showRed ? '#ff787c' : '#63b3ed',
          boxShadow: showRed ? '0 0 0 1px #ff787c' : '0 0 0 1px #63b3ed',
        }}
        value={wiki.summary}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
          if (event.target.value.length <= 128)
            dispatch({
              type: 'wiki/setCurrentWiki',
              payload: { summary: event.target.value },
            })
          else {
            setShowRed(true)
            setTimeout(() => setShowRed(false), 2000)
          }
        }}
        placeholder={`${t('wikiSummaryPlaceholder')}`}
        _placeholder={{ color: 'wikiSummaryInputText' }}
      />
    </Box>
  )
}

export default SummaryInput
