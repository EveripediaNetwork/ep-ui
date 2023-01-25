import { Button, Tooltip } from '@chakra-ui/react'
import React from 'react'

const AIGenerateButton = ({
  isGenerating,
  handleAIGenerate,
}: {
  isGenerating: boolean
  handleAIGenerate: () => void
}) => {
  const [isDisabled, setIsDisabled] = React.useState(false)
  const [timeLeft, setTimeLeft] = React.useState(0)

  React.useEffect(() => {
    const timeCounter = setInterval(() => {
      const lastTime = localStorage.getItem('AI_SUMMARY_GENERATE_RATE_LIMITED')
      console.log(lastTime)
      if (lastTime) {
        const [lastTimeDate, now] = [new Date(lastTime), new Date()]

        if (now.getTime() - lastTimeDate.getTime() > 30 * 60 * 1000) {
          setIsDisabled(false)
          setTimeLeft(0)
        } else {
          setIsDisabled(true)
          setTimeLeft(
            30 * 60 -
              Math.floor((now.getTime() - lastTimeDate.getTime()) / 1000),
          )
        }
      }
    }, 1000)

    return () => clearInterval(timeCounter)
  }, [])

  return (
    <Tooltip
      hasArrow
      mr={5}
      maxW="180px"
      textAlign="center"
      isDisabled={!isDisabled}
      label={`Rate limit exceeded. wait for ${timeLeft} seconds.`}
    >
      <Button
        size="xs"
        px={2}
        fontSize="xs"
        disabled={isGenerating || isDisabled}
        sx={{
          _disabled: {
            backgroundColor: isDisabled
              ? 'gray.600 !important'
              : 'brand.500 !important',
            color: isDisabled ? 'gray.400 !important' : 'white !important',
          },
        }}
        isLoading={isGenerating}
        onClick={handleAIGenerate}
      >
        AI Generate
      </Button>
    </Tooltip>
  )
}

export default AIGenerateButton
