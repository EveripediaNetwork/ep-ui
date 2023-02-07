import React from 'react'
import CareersHero from '@/components/Careers/CareersHero'
import { CareersHeader } from '@/components/SEO/Static'
import { AllCareers } from '@/data/CareersData'
import NoCareersPage from '@/components/Careers/NoCareersHero'
import { SimpleGrid } from '@chakra-ui/react'
import CareerCard from '@/components/Careers/CareersCard'

const OurCareers = () => {
  return (
    <main>
      <CareersHero />
      <SimpleGrid
        maxW={{ base: '100%', md: '95%', '2xl': '1280px' }}
        py={{ base: 8, lg: 16 }}
        mx="auto"
        px={{ base: '5', md: 0 }}
      >
        {AllCareers.map(career => (
          <CareerCard
            id={career.id}
            key={career.id}
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

export default Careers
