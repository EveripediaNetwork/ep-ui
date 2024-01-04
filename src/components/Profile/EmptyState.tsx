import { ProfileEmptyState } from '@/components/Elements/icons/ProfileEmptyState'
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { LinkButton } from '../Elements'
import { useTranslation } from 'next-i18next'

export const EmptyState = ({
  title,
  body,
}: {
  title: string
  body: string
}) => {
  const { t } = useTranslation('account')
  return (
    <Flex flexDir="column" textAlign="center" align="center">
      <ProfileEmptyState maxBlockSize="40vw" />
      <Text fontWeight="bold" fontSize="3xl" mt="8">
        {title}
      </Text>
      <Text color="fadedText2">{body}</Text>

      <LinkButton href="/create-wiki" px="16" w="fit-content" mt="16">
        {t('createWikiBtn')}
      </LinkButton>
    </Flex>
  )
}
