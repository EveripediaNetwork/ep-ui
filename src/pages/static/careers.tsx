import NoOpenings from '@/components/Careers/NoOpeningsCard'
import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Careers = () => {
  const { t } = useTranslation()
  const [openings] = React.useState<Array<any> | null>()

  return (
    <main>
      <Flex
        mb={{ lg: 24, md: 20, base: 10 }}
        direction="column"
        w="90%"
        mx="auto"
      >
        <Heading
          mt={8}
          mb={4}
          as="h1"
          fontSize={{ lg: '4xl', md: '4xl', base: '2xl' }}
          letterSpacing="wide"
        >
          {t('careerHeading')}
        </Heading>
        <Flex direction="column" align="center" justify="center">
          {openings ? 'List of openings here' : <NoOpenings />}
        </Flex>
      </Flex>
    </main>
  )
}

export default Careers
