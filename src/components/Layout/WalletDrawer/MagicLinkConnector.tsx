import { Image } from '@/components/Elements/Image/Image'
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

export const MagicLinkConnector = () => {
  return (
    <Flex
      w="full"
      p={4}
      cursor="pointer"
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      _hover={{
        boxShadow: 'lg',
        bgColor: 'hoverBg',
      }}
      _focus={{
        boxShadow: 'lg',
        bgColor: 'hoverBg',
      }}
    >
      <Image boxSize="24px" src="/images/magiclink.svg" />
      <Text flex="1" as="strong" ml="15">
        Magic Link
      </Text>
    </Flex>
  )
}
