import React from 'react'
import { useContentFeedbackMutation } from '@/services/admin'
import { RiStarSFill } from 'react-icons/ri'
import { HStack, IconButton } from '@chakra-ui/react'

type WikiStarRatingProps = {
  contentId: string
  setIsRated: React.Dispatch<React.SetStateAction<boolean>>
  avgRating?: number
  isAvgRating?: boolean
  refetch?: () => void
}

const wikiStarRating = ({
  contentId,
  setIsRated,
  avgRating,
  isAvgRating = false,
  refetch,
}: WikiStarRatingProps) => {
  const [currHoverRating, setCurrHoverRating] = React.useState(0)
  const [contentFeedback] = useContentFeedbackMutation()
  const [hasSelectedRating, setHasSelectedRating] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const storedRating = localStorage.getItem(`wikiRating_${contentId}`)
    if (storedRating) {
      setIsRated(true)
    }
  }, [contentId, setIsRated])

  const sendFeedback = async (rating: number) => {
    setHasSelectedRating(true)
    setLoading(true)
    await new Promise((resolve) => {
      setTimeout(resolve, 3000)
    })
    await contentFeedback({ contentId, rating })
    refetch?.()
    setLoading(false)
    setIsRated(true)
    localStorage.setItem(`wikiRating_${contentId}`, rating.toString())
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
            size="2xs"
            icon={<RiStarSFill />}
            variant="unstyled"
            color={ratingValue <= (avgRating || 0) ? '#FEC84B' : ''}
            aria-label={`Average rating-${ratingValue}`}
          />
        )
      })}
    </HStack>
  ) : (
    <HStack
      onMouseLeave={() => {
        if (!hasSelectedRating) {
          setCurrHoverRating(0)
        }
      }}
    >
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1
        return (
          <IconButton
            fontSize={{ base: 'xl', md: '3xl' }}
            size="sm"
            disabled={loading}
            key={i}
            icon={<RiStarSFill />}
            variant="unstyled"
            color={ratingValue <= (currHoverRating || 0) ? 'brand.500' : ''}
            aria-label={`rating-${ratingValue}`}
            onMouseOver={() => {
              if (loading) return null
              setCurrHoverRating(i + 1)
            }}
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
