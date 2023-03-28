import { WIKI_SUMMARY_GEN_RATE_LIMIT_INTERVAL } from '@/data/Constants'
import { useWhiteListValidator } from '@/hooks/useWhiteListValidator'
import { Button, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { useAccount } from 'wagmi'

const AIGenerateButton = ({
  isGenerating,
  handleAIGenerate,
}: {
  isGenerating: boolean
  handleAIGenerate: () => void
}) => {
  const [isDisabled, setIsDisabled] = React.useState(false)
  const [timeLeft, setTimeLeft] = React.useState(0)
  const { address: userAddress } = useAccount()
  const { userCanEdit } = useWhiteListValidator(userAddress)

  React.useEffect(() => {
    const timeCounter = setInterval(() => {
      const lastTime = localStorage.getItem('AI_SUMMARY_GENERATE_RATE_LIMITED')

      if (lastTime) {
        const [lastTimeDate, now] = [new Date(lastTime), new Date()]

        if (
          now.getTime() - lastTimeDate.getTime() >
          WIKI_SUMMARY_GEN_RATE_LIMIT_INTERVAL
        ) {
          setIsDisabled(false)
          localStorage.removeItem('AI_SUMMARY_GENERATE_RATE_LIMITED')
          setTimeLeft(0)
        } else {
          const currentTimeLeft = Math.ceil(
            (WIKI_SUMMARY_GEN_RATE_LIMIT_INTERVAL -
              (now.getTime() - lastTimeDate.getTime())) /
              1000,
          )
          setIsDisabled(true)
          setTimeLeft(currentTimeLeft)
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
        disabled={isGenerating || isDisabled || !userCanEdit}
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
