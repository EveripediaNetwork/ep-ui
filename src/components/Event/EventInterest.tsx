import { EventInterestData } from '@/components/Event/event.data'
import { Box, Flex, Heading, Text, chakra } from '@chakra-ui/react'
import React from 'react'

const EventInterest = () => {
  return (
    <Flex
      maxW={'1296px'}
      mx={'auto'}
      mt={'96px'}
      borderRadius={'12px'}
      border={'1px'}
      borderColor={'archivedTextColor'}
      bgColor={'#FFF'}
      _dark={{
        bgColor: '#2D3748',
      }}
      padding={'39px 31px'}
      justifyContent={'space-between'}
      gap={'127px'}
    >
      <Box maxW={'250px'} w={'full'}>
        <Heading fontSize={'20px'}>Interests</Heading>
        <Text fontSize={'14px'} mt={'12px'}>
          Get event suggestion based on your interests.
        </Text>
      </Box>
      <chakra.ul display={'flex'} flexWrap={'wrap'} gap={'12px'}>
        {EventInterestData.map((interest) => {
          return (
            <chakra.li
              key={interest}
              borderRadius={'100000px'}
              border={'1px'}
              borderColor={'gray.200'}
              padding={'12px 20px'}
              fontSize={'14px'}
              listStyleType={'none'}
              cursor={'pointer'}
              _active={{
                bgColor: 'divider',
              }}
              _hover={{
                bgColor: 'divider',
              }}
            >
              {interest}
            </chakra.li>
          )
        })}
      </chakra.ul>
    </Flex>
  )
}

export default EventInterest
