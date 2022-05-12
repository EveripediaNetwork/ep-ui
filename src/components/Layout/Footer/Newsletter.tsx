import React from 'react'
import { Button, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const Newsletter = () => {
  const { t } = useTranslation()
  return (
    <Stack align={{ base: 'center', lg: 'flex-start' }} spacing={4}>
      <Text fontSize="xl" fontWeight="bold" py={2}>
        {`${t('updatesFooterHeading')}`}
      </Text>
      <Text align={{ base: 'center', lg: 'start' }} maxW="600px">
        {`${t('updatesFooterText')}`}
      </Text>
      <Button
        onClick={() =>
          window.open(
            'https://www.getdrip.com/forms/505929689/submissions/new',
            '_blank',
          )
        }
        size="lg"
        variant="solid"
      >
        {`${t('subScribeFooterBttn')}`}
      </Button>
    </Stack>
  )
}

export default Newsletter
