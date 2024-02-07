import React from 'react'
import { useContentFeedbackMutation } from '@/services/admin'
import { wikiRatingType } from '@/types/admin'
import { RiStarSFill } from 'react-icons/ri'
import { HStack, IconButton } from '@chakra-ui/react'

const wikiStarRating = ({
  contentId,
  userId,
  setIsRated,
  avgRating,
}: {
  contentId: string
  userId?: string
  setIsRated: (isRated: boolean) => void
  avgRating?: number
}) => {
  const [currHoverRating, setCurrHoverRating] = React.useState(0)
  const [contentFeedback] = useContentFeedbackMutation()
  const sendFeedback = async (rating: wikiRatingType) => {
    setIsRated(true)
    await contentFeedback({ contentId, userId, rating })
  }
  return avgRating ? (
    <HStack>
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1
        return (
          <IconButton
            key={i}
            icon={<RiStarSFill />}
            variant="unstyled"
            color={ratingValue <= (avgRating || 0) ? 'brand.500' : ''}
            aria-label={`Average rating-${ratingValue}`}
          />
        )
      })}
    </HStack>
  ) : (
    <HStack onMouseLeave={() => setCurrHoverRating(0)}>
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1
        return (
          <IconButton
            fontSize={{ base: 'xl', md: '2xl' }}
            key={i}
            icon={<RiStarSFill />}
            variant="unstyled"
            color={ratingValue <= (currHoverRating || 0) ? 'brand.500' : ''}
            aria-label={`rating-${ratingValue}`}
            onMouseOver={() => setCurrHoverRating(i + 1)}
            onClick={() => {
              sendFeedback(ratingValue)
            }}
          />
        )
      })}
    </HStack>
  )
}

export default wikiStarRating
