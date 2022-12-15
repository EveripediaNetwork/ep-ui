import React from 'react'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Flex, Box, Text, SkeletonText, Skeleton } from '@chakra-ui/react'

const SingularSkeleton = () => {
  const loadingStartColors = useColorModeValue('#DCDCDC', '#A7A8AD')
  const loadingEndColors = useColorModeValue('#F4F4F4', '#EFEFEF')
  return (
    <Flex gap={4} alignItems="center" p={{ '2xl': 4, md: 2, base: 2 }}>
      <Flex gap={2} w="100%" alignItems="start">
        <Skeleton
          w="60px"
          h="50px"
          borderRadius="12px"
          startColor={loadingStartColors}
          endColor={loadingEndColors}
        />
        <Flex w="100%">
          <Flex flexDir="column" w="65%">
            <Text
              color="primaryPinkIcon"
              fontSize={{ md: 'sm', lg: 'xs', base: 'sm', '2xl': 'md' }}
              whiteSpace="nowrap"
            >
              <SkeletonText
                startColor={loadingStartColors}
                endColor={loadingEndColors}
                noOfLines={1}
                spacing="4"
                skeletonHeight="5"
              />
            </Text>
            <Text
              color="inactiveText"
              fontSize={{ md: 'sm', lg: 'xs', base: 'sm', '2xl': 'md' }}
            >
              <SkeletonText
                width="16"
                noOfLines={1}
                mt={2}
                skeletonHeight="3"
                startColor={loadingStartColors}
                endColor={loadingEndColors}
              />
            </Text>
          </Flex>
          <Flex
            flexDir="column"
            w="35%"
            alignItems="end"
            justifyContent="start"
          >
            <SkeletonText
              width="16"
              noOfLines={1}
              skeletonHeight="3"
              startColor={loadingStartColors}
              endColor={loadingEndColors}
            />
            <Flex
              alignItems="center"
              gap={0.5}
              width="100%"
              justifyContent="end"
            >
              <SkeletonText
                width="10"
                mt={4}
                noOfLines={1}
                skeletonHeight="3"
                startColor={loadingStartColors}
                endColor={loadingEndColors}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export const LoadingRankCardSkeleton = () => {
  return (
    <Box>
      {Array.from({ length: 10 }).map((_, index) => (
        <SingularSkeleton key={index} />
      ))}
    </Box>
  )
}
