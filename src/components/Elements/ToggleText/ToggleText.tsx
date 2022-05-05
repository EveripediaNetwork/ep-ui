import React from 'react'
import {
  chakra,
  HTMLChakraProps,
  BoxProps,
  Text,
  VStack,
  IconButton,
} from '@chakra-ui/react'
import { HTMLMotionProps, motion } from 'framer-motion'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { CATEGORY_DESCRIPTION_WORD_LIMIT } from '@/data/Constants'

// interface for ToggleTextProps is text and VStack Interface
interface TextProp {
  text: string
}

export type ToggleTextProps = Omit<BoxProps, 'as'> & TextProp

type Merge<P, T> = Omit<P, keyof T> & T
type MotionBoxProps = Merge<HTMLChakraProps<'div'>, HTMLMotionProps<'div'>>
export const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div)

const ToggleText = ({ text, ...rest }: ToggleTextProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <VStack width="100%" {...rest}>
      <MotionBox
        width="min(90%, 800px)"
        overflow="hidden"
        initial={{ height: '80px' }}
        animate={{ height: isOpen ? 'auto' : '90px' }}
        transition={{ duration: 0.1 }}
        style={
          !isOpen && text.length > CATEGORY_DESCRIPTION_WORD_LIMIT
            ? {
                WebkitMaskImage: 'linear-gradient(180deg, black, transparent)',
              }
            : { marginBottom: '20px' }
        }
      >
        <Text fontSize="large" opacity="0.5" textAlign="center">
          {text}
        </Text>
      </MotionBox>
      {text.length > CATEGORY_DESCRIPTION_WORD_LIMIT && (
        <IconButton
          width="min(300px, 90%)"
          icon={
            isOpen ? (
              <ChevronUpIcon fontSize="28px" color="linkColor" opacity="0.5" />
            ) : (
              <ChevronDownIcon
                fontSize="28px"
                color="linkColor"
                opacity="0.5"
              />
            )
          }
          aria-label="Toggle Text"
          onClick={() => setIsOpen(!isOpen)}
          size="xs"
          isRound
          backgroundColor="transparent"
          _hover={{ backgroundColor: '#00000010' }}
          _focus={{ backgroundColor: '#00000010' }}
          _active={{ backgroundColor: '#00000010' }}
        />
      )}
    </VStack>
  )
}

export default ToggleText
