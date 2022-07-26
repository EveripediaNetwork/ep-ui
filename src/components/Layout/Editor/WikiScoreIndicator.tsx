import { Wiki } from '@/types/Wiki'
import { calculateWikiScore } from '@/utils/calculateWikiScore'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import React from 'react'

const WikiScoreIndicator = ({ wiki }: { wiki: Wiki }) => {
  const score = calculateWikiScore(wiki)
  if (!score) return null

  let color = 'green.400'
  if (score < 20) {
    color = 'red.400'
  } else if (score < 40) {
    color = 'orange.400'
  }

  return (
    <CircularProgress size="35px" value={score} color={color}>
      <CircularProgressLabel>{score}</CircularProgressLabel>
    </CircularProgress>
  )
}

export default WikiScoreIndicator
