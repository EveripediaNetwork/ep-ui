import { WIKI_SUMMARY_LIMIT } from '@/data/Constants'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { logEvent } from '@/utils/googleAnalytics'
import { Box, HStack, Tag, Text, Textarea, useToast } from '@chakra-ui/react'
import axios, { AxiosError } from 'axios'
import React, { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import AIGenerateButton from './AIGenerateButton'

const sleep = (ms: number) =>
  new Promise(r => {
    setTimeout(r, ms)
  })

const SummaryInput = () => {
  const wiki = useAppSelector(state => state.wiki)
  const [showRed, setShowRed] = React.useState(false)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [reserveSummaries, setReserveSummaries] = React.useState<string[]>([])
  const toast = useToast()

  const handleAIGenerate = React.useCallback(async () => {
    setIsGenerating(true)

    if (reserveSummaries.length > 0) {
      const summary = reserveSummaries[0]
      await sleep(3000) // Makes it look like it's generating :D
      if (summary) {
        dispatch({
          type: 'wiki/setCurrentWiki',
          payload: { summary },
        })
      }
      setIsGenerating(false)
      setReserveSummaries(r => r.slice(1))
      return
    }

    try {
      const { data, headers } = await axios.post('/api/summary-generate', {
        title: wiki.title,
        content: wiki.content,
        isAboutPerson: !!wiki.categories.find(i => i.id === 'person'),
      })

      if (headers['x-ratelimit-remaining'] === '1') {
        localStorage.setItem(
          'AI_SUMMARY_GENERATE_RATE_LIMITED',
          new Date().toISOString(),
        )
      }

      dispatch({
        type: 'wiki/setCurrentWiki',
        payload: { summary: data[0] },
      })
      if (data.length > 1) setReserveSummaries(data.slice(1))

      logEvent({
        action: 'GENERATE_SUMMARY',
        label: wiki.id,
        category: 'summary-generate',
        value: 1,
      })
    } catch (error) {
      const { response } = error as AxiosError
      if (response?.status === 429) {
        localStorage.setItem(
          'AI_SUMMARY_GENERATE_RATE_LIMITED',
          new Date().toISOString(),
        )
      } else {
        setShowRed(true)
        setTimeout(() => setShowRed(false), 3000)
        toast({
          title: 'Error generating summary.',
          description: 'Please try again later.',
          status: 'error',
        })
        logEvent({
          action: 'GENERATE_SUMMARY',
          label: wiki.id,
          category: 'summary-generate',
          value: 0,
        })
      }
    }

    setIsGenerating(false)
  }, [
    dispatch,
    reserveSummaries,
    toast,
    wiki.categories,
    wiki.content,
    wiki.id,
    wiki.title,
  ])

  const summaryLimitTagColor = () => {
    if (showRed) {
      return 'red'
    }
    if ((wiki?.summary?.length || 0) > (WIKI_SUMMARY_LIMIT * 2) / 3)
      return 'green'
    return 'yellow'
  }

  return (
    <Box>
      <HStack mb={2} justify="space-between" align="center">
        <Text color="wikiSummaryLabel">{`${t('wikiSummaryLabel')}`}</Text>
        <HStack>
          <Tag variant="solid" colorScheme={summaryLimitTagColor()}>
            {wiki?.summary?.length || 0}/{WIKI_SUMMARY_LIMIT}
          </Tag>
          <AIGenerateButton
            handleAIGenerate={handleAIGenerate}
            isGenerating={isGenerating}
          />
        </HStack>
      </HStack>
      <Textarea
        disabled={isGenerating}
        fontSize="sm"
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
      />
    </Box>
  )
}

export default SummaryInput
