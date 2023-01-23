import { WIKI_SUMMARY_LIMIT } from '@/data/Constants'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { Box, Button, HStack, Tag, Text, Textarea } from '@chakra-ui/react'
import axios from 'axios'
import React, { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

const SummaryInput = () => {
  const wiki = useAppSelector(state => state.wiki)
  const [showRed, setShowRed] = React.useState(false)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [isGenerating, setIsGenerating] = React.useState(false)

  const handleAIGenerate = async () => {
    setIsGenerating(true)
    try {
      const { data } = await axios.post('/api/summary-generate', {
        title: wiki.title,
        content: wiki.content,
        isAboutPerson: !!wiki.categories.find(i => i.id === 'person'),
      })
      dispatch({
        type: 'wiki/setCurrentWiki',
        payload: { summary: data.trim() },
      })
    } catch (e) {
      console.error(e)
    }

    setIsGenerating(false)
  }

  return (
    <Box>
      <HStack mb={2} justify="space-between" align="center">
        <Text color="wikiSummaryLabel">{`${t('wikiSummaryLabel')}`}</Text>
        <HStack>
          <Tag
            variant="solid"
            colorScheme={
              // eslint-disable-next-line no-nested-ternary
              showRed
                ? 'red'
                : (wiki?.summary?.length || 0) > (WIKI_SUMMARY_LIMIT * 2) / 3
                ? 'green'
                : 'yellow'
            }
          >
            {wiki?.summary?.length || 0}/{WIKI_SUMMARY_LIMIT}
          </Tag>
          <Button
            size="xs"
            px={2}
            fontSize="xs"
            disabled={isGenerating}
            sx={{ _disabled: { backgroundColor: 'brand.500 !important' } }}
            isLoading={isGenerating}
            onClick={handleAIGenerate}
          >
            AI Generate
          </Button>
        </HStack>
      </HStack>
      <Textarea
        disabled={isGenerating}
        bgColor={showRed ? '#d406082a' : 'transparent'}
        color="wikiSummaryInputText"
        _focus={{
          borderColor: showRed ? '#ff787c' : '#63b3ed',
          boxShadow: showRed ? '0 0 0 1px #ff787c' : '0 0 0 1px #63b3ed',
        }}
        value={wiki.summary}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
          if (event.target.value.length <= WIKI_SUMMARY_LIMIT)
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
