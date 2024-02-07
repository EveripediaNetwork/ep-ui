import React, { useState } from 'react'
import { VStack, Text, Flex, Box, Divider } from '@chakra-ui/react'
import { VscSmiley } from 'react-icons/vsc'
import WikiAccordion from '../../WikiAccordion'
import { useTranslation } from 'next-i18next'
import WikiStarRating from './WikiStarRating'

const WikiRating = ({
  contentId,
  userId,
}: {
  contentId: string
  userId?: string
}) => {
  const [isRated, setIsRated] = useState<boolean>(false)

  const { t } = useTranslation('wiki')
  //TODO: get rating from backend
  const avgRating = 3.5
  const totalRatings = 100

  return (
    <VStack w="100%" spacing={4} borderRadius={2}>
      <WikiAccordion
        display="flex"
        withNoDarkBg
        flexDir="column"
        gap={2}
        title={t('feedback')}
        defaultOpen
      >
        <VStack bgColor="wikiCardItemBg" borderRadius={4} gap="2" p={3}>
          {!isRated ? (
            <VStack alignItems="center">
              <VStack alignItems="center">
                //TODO: translate
                <Text
                  fontWeight={'semibold'}
                  fontSize="lg"
                  textColor="fadedText"
                >
                  Average Rating
                </Text>
                //TODO: add average rating
                <Box
                  fontSize="xs"
                  rounded="2xl"
                  bgColor="brand.50"
                  _dark={{ bgColor: 'brand.200', textColor: 'brand.800' }}
                  textColor="brand.500"
                  px="3"
                >
                  {`Based on over ${totalRatings} ratings`}
                </Box>
                <WikiStarRating
                  contentId={contentId}
                  userId={userId}
                  setIsRated={setIsRated}
                  avgRating={avgRating}
                />
              </VStack>
              <Divider />
              <Text fontWeight={'semibold'} fontSize="lg" textColor="fadedText">
                How was your experience?
              </Text>
              <Text fontSize="sm" textColor="fadedText">
                Give this wiki a quick rating to let us know!
              </Text>
              <WikiStarRating
                contentId={contentId}
                userId={userId}
                setIsRated={setIsRated}
              />
            </VStack>
          ) : (
            <Flex alignItems="center" gap={1} w="full">
              <Text fontWeight="light" fontSize="14px">
                {t('feedbackThanks')}
              </Text>
              <VscSmiley color="#ff1a88" />
            </Flex>
          )}
        </VStack>
      </WikiAccordion>
    </VStack>
  )
}
export default WikiRating
