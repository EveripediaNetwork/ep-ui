import { Box, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import { WikiInsightsProps } from '../../WikiInsights'
import ChatBot from './ChatBot'
import { BrainBotSuggestion } from './BotSuggestions'
import QuestionMarkIcon from '@/components/Icons/questionMarkIcon'
import Image from 'next/image'
import IQGPTIcon from '@/components/Elements/icons/IQGPTIcon'
import { QueryType } from '@/utils/BotUtils'
import { useTranslation } from 'next-i18next'

const BrainBot = ({ wiki }: WikiInsightsProps) => {
  const { t } = useTranslation('wiki')
  const [open, setOpen] = useState(true)

  return (
    <>
      {open ? (
        <ChatBot wiki={wiki} setOpen={setOpen} />
      ) : (
        <Box
          display={'flex'}
          justifyContent={'center'}
          flexDirection={'column'}
          alignItems={'center'}
          w={'full'}
          paddingBlock={'20px'}
          paddingInline={'10px'}
          borderRadius={8}
          borderColor="rankingListBorder"
          backgroundColor={'btnBgColor'}
          borderWidth={1}
        >
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            gap={'4px'}
          >
            <Box
              bgColor={'brainBotAIBorder'}
              borderRadius={'4px'}
              w={'30px'}
              h={'30px'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              flexShrink={0}
            >
              <IQGPTIcon width={'18px'} height={'18px'} />
            </Box>
            <Text
              color={'fadedText'}
              fontSize={'14px'}
              fontWeight={'500'}
              textAlign={'center'}
              maxW={'300px'}
            >
              {t('brainBotTitle')}
            </Text>
          </Box>

          <Box
            display={'flex'}
            flexDirection={'column'}
            gap={'8px'}
            marginTop={'14px'}
            alignItems={'center'}
          >
            <BrainBotSuggestion
              question={t(QueryType.AdditionalInfo)}
              icon={<QuestionMarkIcon style={{ marginInlineStart: '0px' }} />}
              wiki={wiki}
              setOpen={setOpen}
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
              setOpen={setOpen}
            />
            <Text color={'homeDescriptionColor'} fontSize={'12px'}>
              {t('more')}
            </Text>
            <Box color={'brandLinkColor'}>
              <RiArrowDownSLine
                size={'28px'}
                onClick={() => setOpen(true)}
                style={{ flexShrink: 0, cursor: 'pointer' }}
              />
            </Box>
          </Box>
        </Box>
      )}
    </>
  )
}

export default BrainBot
