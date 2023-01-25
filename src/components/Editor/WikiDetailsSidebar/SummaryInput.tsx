import { WIKI_SUMMARY_LIMIT } from '@/data/Constants'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { logEvent } from '@/utils/googleAnalytics'
import { shortenText } from '@/utils/shortenText'
import { Box, HStack, Tag, Text, Textarea, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import AIGenerateButton from './AIGenerateButton'

const SummaryInput = () => {
  const wiki = useAppSelector(state => state.wiki)
  const [showRed, setShowRed] = React.useState(false)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [isGenerating, setIsGenerating] = React.useState(false)
  const toast = useToast()

  React.useEffect(() => {}, [])

  const handleAIGenerate = React.useCallback(async () => {
    setIsGenerating(true)

    try {
      const { data, headers } = await axios.post('/api/summary-generate', {
        title: wiki.title,
        content: wiki.content,
        isAboutPerson: !!wiki.categories.find(i => i.id === 'person'),
      })

      console.log(headers['x-ratelimit-remaining'])
      if (headers['x-ratelimit-remaining'] === '1') {
        localStorage.setItem(
          'AI_SUMMARY_GENERATE_RATE_LIMITED',
          new Date().toISOString(),
        )
      }

      dispatch({
        type: 'wiki/setCurrentWiki',
        payload: { summary: shortenText(data.trim(), WIKI_SUMMARY_LIMIT) },
      })

      logEvent({
        action: 'GENERATE_SUMMARY',
        label: wiki.id,
        category: 'summary-generate',
        value: 1,
      })
    } catch (error) {
      setShowRed(true)
      setTimeout(() => {
        setShowRed(false)
      }, 3000)
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

    setIsGenerating(false)
  }, [dispatch, toast, wiki.categories, wiki.content, wiki.id, wiki.title])

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
