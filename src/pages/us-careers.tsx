import React from 'react'
import CareersHero from '@/components/Careers/CareersHero'
import { CareersHeader } from '@/components/SEO/Static'
import { SimpleGrid } from '@chakra-ui/react'
import CareerCard from '@/components/Careers/CareersCard'

const OurCareers = () => {
  return (
    <main>
      <CareersHero
        title="IQ.Wiki US Careers"
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
        <CareerCard
          title="Manager, Web Traffic"
          location="Las Vegas, US"
          description="Distributed Machines, Inc., d/b/a Everipedia, seeks a Manager, Web Traffic, for our Las Vegas, NV office. May work from home from any location in the U.S. Requires a Bach. of Bus. Admin. & 2 years experience as a Management Analyst working in the blockchain technology industry for companies with their own cryptocurrency, including experience with knowledge projects such as Wikipedia, Quora, etc. Please submit your resume to jobs@everipedia.com."
        />
      </SimpleGrid>
    </main>
  )
}

const USCareers = () => {
  return (
    <>
      <CareersHeader />
      <OurCareers />
    </>
  )
}

export default USCareers
