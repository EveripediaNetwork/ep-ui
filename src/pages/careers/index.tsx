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
      <CareersHero
        title="IQ.Wiki Careers"
        description="Do you wish to join our great team? we're looking for
          Intellectual Individuals who are committed to doing well by doing
          good. here is the list of our open positions."
      />
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

export default Careers
