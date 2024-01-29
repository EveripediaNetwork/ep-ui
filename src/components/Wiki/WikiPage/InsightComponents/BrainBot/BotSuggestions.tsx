import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import QuestionMarkIcon from '@/components/Icons/questionMarkIcon'
import Image from 'next/image'
import { Wiki } from '@everipedia/iq-utils'
import useStream from '@/hooks/useStream'
import { useTranslation } from 'next-i18next'
import useQueryTranslation, {
  QueryType,
} from '@/hooks/useStream/useQueryTranslation'

export const BrainBotSuggestion = ({
  question,
  icon,
  wiki,
  setOpen,
}: {
  question: string
  icon: ReactNode
  wiki: Wiki
  setOpen?: (state: boolean) => void
}) => {
  const { askQuestion } = useStream()
  const translatedQuery = useQueryTranslation(question, wiki)

  return (
    <HStack
      gap={'8px'}
      border={'1px'}
      borderColor={'iqgptAdCardBorder'}
      padding={'6px'}
      borderRadius={'4px'}
      cursor={'pointer'}
      onClick={() => {
        if (setOpen) {
          setOpen(true)
        }
        askQuestion({ question, query: translatedQuery })
      }}
      _hover={{
        bgColor: 'brand.50',
      }}
      _dark={{
        _hover: {
          bgColor: 'gray.700',
        },
      }}
    >
      <Text color={'emptyNotificationText'} fontSize={'12px'}>
        {question}
      </Text>
      {icon}
    </HStack>
  )
}

const BotSuggestions = ({ wiki }: { wiki: Wiki }) => {
  const { t } = useTranslation('wiki')
  return (
    <Box paddingBlock={'14px'}>
      <Text
        color={'fadedText'}
        maxW={'350px'}
        fontSize={'14px'}
        textAlign={'center'}
      >
        {t('chatBotIntroMessage')}
      </Text>
      <VStack marginTop={'12px'}>
        <BrainBotSuggestion
          question={t(QueryType.AdditionalInfo)}
          icon={<QuestionMarkIcon style={{ marginInlineStart: '0px' }} />}
          wiki={wiki}
        />
        <BrainBotSuggestion
          question={t(QueryType.ContentPageSummary)}
          icon={
            <Image
              src={'/summary.svg'}
              alt="Sun icon"
              width={12}
              height={20}
              style={{ marginInlineStart: '0px' }}
            />
          }
          wiki={wiki}
        />
        <HStack gap={'8px'}>
          <BrainBotSuggestion
            question={t('chatBotSuggestion1')}
            icon={
              <Image
                src={'/sun.svg'}
                alt="Sun icon"
                width={12}
                height={20}
                style={{ marginInlineStart: '0px' }}
              />
            }
            wiki={wiki}
          />
          <BrainBotSuggestion
            question={'ELI5'}
            icon={
              <Image
                src={'/eli.svg'}
                alt="eli icon"
                width={14}
                height={20}
                style={{ marginInlineStart: '0px' }}
              />
            }
            wiki={wiki}
          />
        </HStack>
      </VStack>
    </Box>
  )
}

export default BotSuggestions
