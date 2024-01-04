import React from 'react'
import CareersHero from '@/components/Careers/CareersHero'
import { CareersHeader } from '@/components/SEO/Static'
import { AllCareers } from '@/data/CareersData'
import NoCareersPage from '@/components/Careers/NoCareersHero'
import { SimpleGrid } from '@chakra-ui/react'
import CareerCard from '@/components/Careers/CareersCard'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const OurCareers = () => {
  const { t } = useTranslation('careers')
  return (
    <main>
      <CareersHero title={t('heroTitle')} description={t('heroDescription')} />
      <SimpleGrid
        maxW={{ base: '100%', md: '95%', '2xl': '1280px' }}
        py={{ base: 8, lg: 16 }}
        mx="auto"
        px={{ base: '5', md: 0 }}
        gap={{ base: 10, md: '15' }}
      >
        {AllCareers.map((career, i) => (
          <CareerCard
            key={i}
            title={career.title}
            location={career.location}
            description={career.description}
            link={career.link}
          />
        ))}
      </SimpleGrid>
    </main>
  )
}

const Careers = () => {
  return (
    <>
      <CareersHeader />
      {AllCareers.length !== 0 ? <OurCareers /> : <NoCareersPage />}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['careers', 'common'])),
    },
  }
}

export default Careers
