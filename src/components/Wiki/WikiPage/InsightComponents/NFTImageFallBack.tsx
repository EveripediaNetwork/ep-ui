import { Flex, Text, Image } from '@chakra-ui/react'
import React from 'react'

const PLACEHOLDER_IMAGE = `/broken-image.png`

export const NFTImgFallback = () => {
  return (
    <Flex
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      bg="#2D3748"
      _light={{ bg: '#F7FAFC' }}
      h="305px"
      gap="2"
    >
      <Image w="30px" src={PLACEHOLDER_IMAGE} />
      <Text fontSize="12px">There seems to be a problem with the image</Text>
    </Flex>
  )
}
