import FaqAccordion from '@/components/Faq/FaqAccordion'
import FaqHeader from '@/components/Faq/FaqHeader'
import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { RiFlagFill, RiSettings2Fill } from 'react-icons/ri'
import { FaMousePointer } from 'react-icons/fa'

console.log(RiSettings2Fill)
const FAQ = () => {
  const { t } = useTranslation()
  const faqData = [
    {
      keyWord: t('faqSectionOne'),
      icon: RiFlagFill,
      data: [
        {
          header: t('faqOneHead'),
          body: t('faqOneBody'),
        },
        {
          header: t('faqOneHead'),
          body: t('faqOneBody'),
        },
        {
          header: t('faqOneHead'),
          body: t('faqOneBody'),
        },
      ],
    },
    {
      keyWord: t('faqSectionTwo'),
      icon: FaMousePointer,
      data: [
        {
          header: t('faqOneHead'),
          body: t('faqOneBody'),
        },
        {
          header: t('faqOneHead'),
          body: t('faqOneBody'),
        },
        {
          header: t('faqOneHead'),
          body: t('faqOneBody'),
        },
      ],
    },
    {
      keyWord: t('faqSectionThree'),
      icon: RiSettings2Fill,
      data: [
        {
          header: t('faqOneHead'),
          body: t('faqOneBody'),
        },
        {
          header: t('faqOneHead'),
          body: t('faqOneBody'),
        },
        {
          header: t('faqOneHead'),
          body: t('faqOneBody'),
        },
      ],
    },
  ]
  return (
    <main>
      <Flex direction="column" px={{ base: 6, lg: 16 }} py={{ lg: 20 }}>
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
    </main>
  )
}

export default FAQ
