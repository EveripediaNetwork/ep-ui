import React, { useState } from 'react'
import { VStack, Text, Box, Divider } from '@chakra-ui/react'
import { VscSmiley } from 'react-icons/vsc'
import { RiStarSmileFill } from 'react-icons/ri'
import WikiAccordion from '../../WikiAccordion'
import { useTranslation } from 'next-i18next'
import WikiStarRating from './WikiStarRating'
import { useAverageRatingQuery } from '@/services/admin'

const WikiRating = ({
  contentId,
  userId,
}: {
  contentId: string
  userId?: string
}) => {
  const [isRated, setIsRated] = useState<boolean>(false)
  const { t } = useTranslation('wiki')
  const { data, isError } = useAverageRatingQuery(contentId)
  const average = data?.average
  const totalRatings = data?.votes
  console.log('WikiRating -> data', data)
  console.log('WikiRating -> totalRatings', totalRatings)
  console.log('WikiRating -> average', average)

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
          {isError ? (
            <Text>error</Text>
          ) : (
            <VStack>
              <VStack>
                <Text
                  fontWeight={'semibold'}
                  fontSize="lg"
                  textColor="fadedText"
                >
                  Average Rating
                </Text>
                <Box
                  fontSize="xs"
                  rounded="2xl"
                  bgColor="brand.50"
                  _dark={{ bgColor: 'brand.200', textColor: 'brand.800' }}
                  textColor="brand.500"
                  px="3"
                >
                  {totalRatings
                    ? `Based on over ${totalRatings} ratings`
                    : 'No ratings yet, be the first to rate!'}
                </Box>
              </VStack>
              {totalRatings ? (
                <VStack alignItems="center">
                  //TODO: translate //TODO: add average rating
                  <WikiStarRating
                    contentId={contentId}
                    userId={userId}
                    setIsRated={setIsRated}
                    avgRating={average}
                    isAvgRating
                  />
                </VStack>
              ) : (
                <RiStarSmileFill size={18} color="#FF1A88" />
              )}
            </VStack>
          )}
          <Divider />
          {!isRated ? (
            <VStack>
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
            <VStack alignItems="center" gap={1} w="full">
              <Text fontWeight="light" fontSize="14px">
                {t('feedbackThanks')}
              </Text>
              <VscSmiley color="#ff1a88" />
            </VStack>
          )}
        </VStack>
      </WikiAccordion>
    </VStack>
  )
}
export default WikiRating
