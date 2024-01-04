import { WIKI_SUMMARY_LIMIT } from '@/data/Constants'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { logEvent } from '@/utils/googleAnalytics'
import { Box, HStack, Tag, Text, Textarea, useToast } from '@chakra-ui/react'
import axios, { AxiosError } from 'axios'
import React, { ChangeEvent, useCallback } from 'react'
import { useTranslation } from 'next-i18next'
import { Image } from '@/components/Elements/Image/Image'
import AIGenerateButton from './AIGenerateButton'

const sleep = (ms: number) =>
  new Promise((r) => {
    setTimeout(r, ms)
  })

const SummaryInput = () => {
  const wiki = useAppSelector((state) => state.wiki)
  const [showRed, setShowRed] = React.useState(false)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [reserveSummaries, setReserveSummaries] = React.useState<string[]>([])
  const toast = useToast()

  const failedToGenerateSummary = useCallback(() => {
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
  }, [toast, wiki.id])

  const rateLimitReached = () => {
    localStorage.setItem(
      'AI_SUMMARY_GENERATE_RATE_LIMITED',
      new Date().toISOString(),
    )
  }

  const fetchFromReserveSummary = useCallback(async () => {
    const summary = reserveSummaries[0]
    await sleep(3000) // Makes it look like it's generating :D
    if (summary) {
      dispatch({
        type: 'wiki/setCurrentWiki',
        payload: { summary },
      })
    }
    setIsGenerating(false)
    setReserveSummaries((r) => r.slice(1))
  }, [dispatch, reserveSummaries])

  const handleAIGenerate = useCallback(async () => {
    setIsGenerating(true)

    if (reserveSummaries.length > 0) {
      fetchFromReserveSummary()
      return
    }

    try {
      const { data, headers } = await axios.post('/api/summary-generate', {
        title: wiki.title,
        content: wiki.content,
        isAboutPerson: !!wiki.categories.find((i) => i.id === 'person'),
      })

      if (headers['x-ratelimit-remaining'] === '1') rateLimitReached()

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
      if (response?.status === 429) rateLimitReached()
      else failedToGenerateSummary()
    }

    setIsGenerating(false)
  }, [
    dispatch,
    failedToGenerateSummary,
    fetchFromReserveSummary,
    reserveSummaries.length,
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
      <Box position="relative" h="85px">
        <Textarea
          disabled={isGenerating}
          fontSize="sm"
          bgColor={showRed ? '#d406082a' : 'transparent'}
          color="wikiSummaryInputText"
          _focus={{
            borderColor: showRed ? '#ff787c' : '#63b3ed',
            boxShadow: showRed ? '0 0 0 1px #ff787c' : '0 0 0 1px #63b3ed',
          }}
          h="100%"
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
        {isGenerating && (
          <Image
            alt="loading animation - robot flying"
            src="/images/backgrounds/robot.gif"
            position="absolute"
            top="-100%"
            left="50%"
            transform="translateX(-50%)"
            width="100px"
            height="100px"
          />
        )}
      </Box>
    </Box>
  )
}

export default SummaryInput
