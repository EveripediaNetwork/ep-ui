import FaqAccordion from '@/components/Faq/FaqAccordion'
import FaqHeader from '@/components/Faq/FaqHeader'
import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { RiFlagFill, RiSettings2Fill } from 'react-icons/ri'
import { FaMousePointer } from 'react-icons/fa'
import { FaqDataItem } from '@/types/FaqDataItem'

const FAQ = () => {
  const { t } = useTranslation()
  const faqData: FaqDataItem[] = [
    {
      keyWord: t('faqSectionOne'),
      icon: RiFlagFill,
      data: [
        {
          header: t('getterStartedOneHead'),
          body: t('getterStartedOneBody'),
        },
        {
          header: t('getterStartedTwoHead'),
          body: t('getterStartedTwoBody'),
        },{
          header: t('getterStartedThreeHead'),
          body: t('getterStartedThreeBody'),
        },{
          header: t('getterStartedFourHead'),
          body: t('getterStartedFourBody'),
        },{
          header: t('getterStartedFiveHead'),
          body: t('getterStartedFiveBody'),
        },{
          header: t('getterStartedSixHead'),
          body: t('getterStartedSixBody'),
        },{
          header: t('getterStartedSevenHead'),
          body: t('getterStartedSevenBody'),
        },{
          header: t('getterStartedEightHead'),
          body: t('getterStartedEightBody'),
        },
        
      ],
    },
    {
      keyWord: t('faqSectionTwo'),
      icon: FaMousePointer,
      data: [
        {
          header: t('usingEveripediaOneHead'),
          body: t('usingEveripediaOneBody'),
        },
        {
          header: t('usingEveripediaTwoHead'),
          body: t('usingEveripediaTwoBody'),
        },{
          header: t('usingEveripediaThreeHead'),
          body: t('usingEveripediaThreeBody'),
        },{
          header: t('usingEveripediaFourHead'),
          body: t('usingEveripediaFourBody'),
        },{
          header: t('usingEveripediaFiveHead'),
          body: t('usingEveripediaFiveBody'),
        },{
          header: t('usingEveripediaSixHead'),
          body: t('usingEveripediaSixBody'),
        },
       
      ],
    },
    {
      keyWord: t('faqSectionThree'),
      icon: RiSettings2Fill,
      data: [
        {
          header: t('usingEveripediaFiveHead'),
          body: t('usingEveripediaFiveHead'),
        },
        {
          header: t('usingEveripediaFiveHead'),
          body: t('usingEveripediaFiveHead'),
        },
        {
          header: t('usingEveripediaFiveHead'),
          body: t('usingEveripediaFiveHead'),
        },
      ],
    },
  ]
  return (
    <Flex bgColor="pageBg">
      <Flex
        w="min(90%, 1100px)"
        mx="auto"
        direction="column"
        py={{ lg: 20 }}
        mb={{ base: 17, lg: 0 }}
      >
        <FaqHeader />
        <Flex direction="column">
          {faqData.map((item: any, index: any) => {
            return (
              <FaqAccordion
                faqData={item.data}
                key={index}
                heading={item.keyWord}
                icon={item.icon}
              />
            )
          })}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default FAQ
