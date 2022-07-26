import { WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import { AspectRatio, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { RiCloseLine } from 'react-icons/ri'

interface EditorMainImageProps {
  removeImage: () => void
  children?: React.ReactNode
}
export const EditorMainImageWrapper = ({
  removeImage,
  children,
}: EditorMainImageProps) => {
  return (
    <Flex pos="relative" direction="column" w="full" h="full" justify="center">
      <AspectRatio ratio={WIKI_IMAGE_ASPECT_RATIO}>{children}</AspectRatio>
      <Button
        fontWeight="bold"
        pos="absolute"
        top="0"
        right="0"
        transform="translate(50%, -50%)"
        borderRadius="full"
        fontSize="20px"
        p={0}
        size="xs"
        boxSize={7}
        borderWidth="3px"
        borderColor="chakra-body-bg"
        bg="red.400"
        sx={{
          '&:hover, &:focus, &:active': {
            bg: 'red.500',
            color: 'white',
          },
        }}
        onClick={removeImage}
      >
        <RiCloseLine />
      </Button>
    </Flex>
  )
}
