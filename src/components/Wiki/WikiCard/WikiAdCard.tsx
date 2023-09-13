import { LinkWrapper } from '@/components/Elements/LinkElements/LinkWrapper'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, HStack, Text } from '@chakra-ui/react'
import React from 'react'

const WikiAdCard = () => {
  return (
    <Box
      rounded={'lg'}
      w="full"
      border={'1px'}
      borderColor={'iqgptAdCardBorder'}
      p={3}
      bgColor={'brand.50'}
      _dark={{ bgColor: 'brand.100' }}
    >
      <Text
        fontSize={{ base: '12px', sm: '14px', xl: '12px' }}
        fontWeight={'500'}
        color={'brandLinkColor'}
      >
        IQ GPT is the world’s first AI crypto search engine that provides
        insights into intricate terms, live market trends, and breaking news.
      </Text>

      <HStack spacing={1} mt={'6px'} color={'brandLinkColor'}>
        <Text
          fontSize={{ base: '14px', sm: '16px', xl: '14px' }}
          fontWeight={'600'}
        >
          Check it out
        </Text>
        <LinkWrapper href={'https://iqgpt.com/'}>
          <Box as="a" target="_blank">
            <ArrowForwardIcon />
          </Box>
        </LinkWrapper>
      </HStack>
    </Box>
  )
}

export default WikiAdCard
