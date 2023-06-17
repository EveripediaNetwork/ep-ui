import { Center, Flex, Text, VStack } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

interface FeatureProps {
  title: string
  text: string
  icon: ReactElement
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <VStack align="center" textAlign="center">
      <Flex
        w={14}
        h={14}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg="tagActiveBgColor"
      >
        <Center rounded={'full'} bg="iconBg" w={10} h={10}>
          {icon}
        </Center>
      </Flex>
      <Text fontWeight="semibold">{title}</Text>
      <Text fontSize="sm" color="eventTextColor">
        {text}
      </Text>
    </VStack>
  )
}
export default Feature
