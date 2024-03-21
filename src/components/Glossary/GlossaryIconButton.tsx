import React from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import { GlosssaryIconButtonProps } from '@/types/GlossaryType'

const GlossaryIconButton = ({
  isVisible,
  setIsVisible,
}: GlosssaryIconButtonProps) => {
  return (
    <IconButton
      width="9"
      height="9"
      my="2"
      icon={
        isVisible ? (
          <ChevronUpIcon fontSize="28px" color="linkColor" />
        ) : (
          <ChevronDownIcon fontSize="28px" color="linkColor" />
        )
      }
      aria-label="Toggle Text"
      onClick={() => setIsVisible(!isVisible)}
      alignSelf="center"
      size="xs"
      display="flex"
      justifyContent="center"
      alignItems="center"
      isRound
      backgroundColor="blogPageBg"
      _dark={{ bg: 'gray.700' }}
      _hover={{ backgroundColor: '#00000010' }}
      _focus={{ backgroundColor: '#00000010' }}
      _active={{ backgroundColor: '#00000010' }}
    />
  )
}

export default GlossaryIconButton
