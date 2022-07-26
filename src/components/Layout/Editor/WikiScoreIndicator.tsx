import { Link } from '@/components/Elements'
import { Wiki } from '@/types/Wiki'
import { calculateWikiScore } from '@/utils/calculateWikiScore'
import {
  CircularProgress,
  CircularProgressLabel,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  chakra,
} from '@chakra-ui/react'
import React from 'react'

const WikiScoreIndicator = ({ wiki }: { wiki: Wiki }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const score = calculateWikiScore(wiki)
  if (!score) return null

  let color = 'green.400'
  if (score < 30) {
    color = 'red.400'
  } else if (score < 50) {
    color = 'orange.400'
  } else if (score < 70) {
    color = 'yellow.400'
  }

  return (
    <Popover
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      returnFocusOnClose={false}
      aria-label="Wiki preview"
    >
      <PopoverTrigger>
        <span>
          <CircularProgress
            cursor="help"
            onMouseOver={() => setIsOpen(true)}
            onMouseOut={() => setIsOpen(false)}
            onFocus={() => {}}
            onBlur={() => {}}
            size="35px"
            value={score}
            color={color}
          >
            <CircularProgressLabel>{score}</CircularProgressLabel>
          </CircularProgress>
        </span>
      </PopoverTrigger>
      <PopoverContent
        boxShadow="rgb(4 17 29 / 25%) 0px 0px 8px 0px"
        _focus={{ outline: 'none' }}
        mx={4}
      >
        <PopoverArrow />
        <PopoverBody
          onMouseOver={() => setIsOpen(true)}
          onMouseOut={() => setIsOpen(false)}
        >
          <Heading my={1} fontWeight="500" fontSize="sm">
            Wiki Score
          </Heading>
          <Text fontSize="xs">
            <chakra.span opacity={0.7}>
              This measures the quality of your wiki which is based on several
              determining factors such as number of words, citations, tags,
              metalinks etc.{' '}
            </chakra.span>
            <Link color="brand.500" href="/">
              learn more
            </Link>
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default WikiScoreIndicator
