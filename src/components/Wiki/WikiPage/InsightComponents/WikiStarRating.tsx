import React from 'react'
import { useContentFeedbackMutation } from '@/services/admin'
import { wikiRatingType } from '@/types/admin'
import { RiStarSFill } from 'react-icons/ri'
import { HStack, IconButton } from '@chakra-ui/react'

type WikiStarRatingProps = {
  contentId: string
  userId?: string
  setIsRated: React.Dispatch<React.SetStateAction<boolean>>
  avgRating?: number
  isAvgRating?: boolean
}

const wikiStarRating = ({
  contentId,
  userId,
  setIsRated,
  avgRating,
  isAvgRating = false,
}: WikiStarRatingProps) => {
  const [currHoverRating, setCurrHoverRating] = React.useState(0)
  const [contentFeedback] = useContentFeedbackMutation()
  const sendFeedback = async (rating: wikiRatingType) => {
    setIsRated(true)
    await contentFeedback({ contentId, userId, rating })
  }
  return isAvgRating ? (
    <HStack>
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1
        return (
          <IconButton
            key={i}
            cursor={'default'}
            fontSize={{ base: 'md', md: 'xl' }}
            size="xs"
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
            fontSize={{ base: 'xl', md: '3xl' }}
            size="sm"
            key={i}
            icon={<RiStarSFill />}
            variant="unstyled"
            color={ratingValue <= (currHoverRating || 0) ? '#FEC84B' : ''}
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
