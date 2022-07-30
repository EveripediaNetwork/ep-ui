import { WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import {
  AspectRatio,
  ButtonGroup,
  Flex,
  IconButton,
  Tooltip,
} from '@chakra-ui/react'
import React from 'react'
import { RiCropLine, RiDeleteBinLine } from 'react-icons/ri'

interface EditorMainImageProps {
  removeImage: () => void
  children?: React.ReactNode
  cropImage: () => void
}
export const EditorMainImageWrapper = ({
  removeImage,
  cropImage,
  children,
}: EditorMainImageProps) => {
  return (
    <Flex pos="relative" direction="column" w="full" h="full" justify="center">
      <ButtonGroup
        isAttached
        colorScheme="gray.600"
        pos="absolute"
        top={3}
        left={3}
        zIndex={1}
        spacing={2}
      >
        <Tooltip label="Delete Image">
          <IconButton
            onClick={removeImage}
            aria-label="Remove image"
            icon={<RiDeleteBinLine />}
            variant="outline"
            background="whiteAlpha.800"
            color="blackAlpha.700"
            sx={{
              '&:hover, &:focus, &:active': {
                background: 'whiteAlpha.800',
              },
            }}
            size="sm"
          />
        </Tooltip>
        <Tooltip label="Crop image">
          <IconButton
            onClick={cropImage}
            aria-label="Remove image"
            icon={<RiCropLine />}
            variant="outline"
            background="whiteAlpha.800"
            color="blackAlpha.700"
            sx={{
              '&:hover, &:focus, &:active': {
                background: 'whiteAlpha.800',
              },
            }}
            size="sm"
          />
        </Tooltip>
      </ButtonGroup>
      <AspectRatio ratio={WIKI_IMAGE_ASPECT_RATIO}>{children}</AspectRatio>
    </Flex>
  )
}
