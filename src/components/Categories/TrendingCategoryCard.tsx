import React from 'react'
import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { IconType } from 'react-icons'

const TrendingCategoryCard = ({
  title,
  icon,
}: {
  icon: IconType
  title: string
}) => {
  return (
    <Box bgColor="cardBg" boxShadow="md" p="5" borderRadius="12px" minH="300px">
      <Flex>
        <Icon
          cursor="pointer"
          fontSize="2xl"
          fontWeight={600}
          color="brandLinkColor"
          as={icon}
        />
        <Text fontSize={{ base: 'md', lg: '18px' }} pl={2} fontWeight="600">
          {title}
        </Text>
      </Flex>
    </Box>
  )
}

export default TrendingCategoryCard
