import React from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'

export type GlosssaryIconButtonProps = {
  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void
}

const GlossaryIconButton = ({
  isVisible,
  setIsVisible,
}: GlosssaryIconButtonProps) => {
  return (
    <IconButton
      width="full"
      icon={
        isVisible ? (
          <ChevronUpIcon fontSize="28px" color="linkColor" opacity="0.5" />
        ) : (
          <ChevronDownIcon fontSize="28px" color="linkColor" opacity="0.5" />
        )
      }
      aria-label="Toggle Text"
      onClick={() => setIsVisible(!isVisible)}
      size="xs"
      isRound
      backgroundColor="transparent"
      _hover={{ backgroundColor: '#00000010' }}
      _focus={{ backgroundColor: '#00000010' }}
      _active={{ backgroundColor: '#00000010' }}
    />
  )
}

export default GlossaryIconButton
