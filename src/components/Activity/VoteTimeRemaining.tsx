import React, { useState, useEffect } from 'react'
import { Text } from '@chakra-ui/react'

function timeReminding(timeStamp: string) {
  const seconds = Math.floor(
    (new Date().valueOf() - new Date(timeStamp).valueOf()) / 1000,
  )
  const timeRemaining = 12 * 3600 - seconds
  const hours = Math.floor(timeRemaining / 3600)
  const minutes = Math.floor((timeRemaining - hours * 3600) / 60)
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

const VoteTimeRemaining = ({
  lastModTimeStamp,
}: {
  lastModTimeStamp: string
}) => {
  const [voteTimeReminding, setVoteTimeReminding] = useState<string | null>(
    timeReminding(lastModTimeStamp),
  )

  useEffect(() => {
    // update last modified time every 5 seconds
    const intervalId = setInterval(() => {
      setVoteTimeReminding(timeReminding(lastModTimeStamp))
    }, 5000)

    // clean up setInterval
    return () => clearInterval(intervalId)
  }, [lastModTimeStamp])
  return (
    <Text fontSize="14px" opacity={0.6} whiteSpace="nowrap">
      {voteTimeReminding} remaining
    </Text>
  )
}

export default VoteTimeRemaining
