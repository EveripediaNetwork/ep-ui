import NoOpenings from '@/components/Careers/NoOpeningsCard'
import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Careers = () => {
  const { t } = useTranslation()
  const [openings] = React.useState<Array<any> | null>()
  console.log(openings)

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
          fontSize={{ lg: '6xl', md: '4xl', base: '2xl' }}
          letterSpacing="wide"
        >
          {t('careerHeading')}
        </Heading>
        <Flex direction="column" align="center" justify="center">
          {openings ? 'List of openings here' : <NoOpenings />}
        </Flex>

        <Flex
          align="center"
          justify="center"
          direction="column"
          gap={{ base: 3 }}
        >
          <Text
            fontSize={{ lg: 'xl', base: 'md' }}
            opacity="0.4"
            textAlign="center"
          >
            {`${t('careerSubscribeText')}`}
          </Text>
          <Button
            size="lg"
            variant="solid"
            onClick={() =>
              window.open(
                'https://www.getdrip.com/forms/505929689/submissions/new',
                '_blank',
              )
            }
          >
            {`${t('subScribeFooterBttn')}`}
          </Button>
        </Flex>
      </Flex>
    </main>
  )
}

export default Careers
