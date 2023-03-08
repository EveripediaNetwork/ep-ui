import {
  AspectRatio,
  Box,
  Flex,
  HStack,
  Text,
  Heading,
  Link,
  Stack,
} from '@chakra-ui/react'
import React from 'react'
import DisplayAvatar from '@/components/Elements/Avatar/DisplayAvatar'
import { WikiImage } from '@/components/WikiImage'
import { CreatedWikisCount } from '@/types/admin'
import { getReadableDate } from '@/utils/DataTransform/getFormattedDate'
import { getWikiImageUrl } from '@/utils/WikiUtils/getWikiImageUrl'
import { Image } from '@everipedia/iq-utils'
import { accountUsername } from '@/utils/AdminUtils/dataUpdate'

export const GetWiki = ({ Data }: { Data: CreatedWikisCount | undefined }) => {
  return (
    <>
      {Data && (
        <HStack
          bgColor="cardBg"
          justifyContent="flex-start"
          borderWidth="2px"
          borderColor="cardBorder"
          borderRadius="lg"
          borderStyle="dotted"
          px={{ base: 3, lg: 5 }}
          py={3}
          w="full"
          align="normal"
        >
          <AspectRatio w={{ base: '100px', md: '140px', lg: '156px' }}>
            <WikiImage
              cursor="pointer"
              flexShrink={0}
              imageURL={getWikiImageUrl(Data.images as Image[])}
              borderRadius="lg"
              overflow="hidden"
              alt="wiki"
            />
          </AspectRatio>
          <Flex
            w="90%"
            flexDir="column"
            justify="space-between"
            mx="auto"
            px={4}
          >
            <Flex justifyContent="space-between" mb={{ base: 0, md: 2 }}>
              <HStack w={{ base: '83%', md: '70%' }}>
                <Heading
                  cursor="pointer"
                  as="h2"
                  fontSize={{ base: '16px', md: '20px' }}
                  letterSpacing="wide"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  tabIndex={0}
                  role="link"
                >
                  {Data.title}
                </Heading>
              </HStack>
              {Data.categories.length && (
                <HStack>
                  {Data.categories?.map((category, i) => (
                    <Link
                      key={i}
                      href={`/categories/${category.id}`}
                      display={{ base: 'none', md: 'block' }}
                      color="brand.500"
                      fontWeight="bold"
                      cursor="pointer"
                      fontSize={{ base: '10px', lg: '12px' }}
                    >
                      {category.title && category.title}
                    </Link>
                  ))}
                </HStack>
              )}
            </Flex>
            <Box
              mb="2"
              mt="-2%"
              maxW={{ base: '70%', lg: '80%' }}
              overflow="hidden"
            >
              <Text fontSize="sm" display={{ base: 'none', md: 'flex' }}>
                {Data.summary ? Data.summary : 'No Summary'}
              </Text>
            </Box>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              justifyContent="space-between"
              w="full"
            >
              <Box>
                <HStack flex="1">
                  <DisplayAvatar
                    address={Data.author?.id}
                    avatarIPFS={Data.author.profile?.avatar}
                    size={20}
                    alt="unknown"
                  />
                  <Text fontSize="14px" color="linkColor">
                    <Link
                      href={`/account/${Data.author?.id}`}
                      color="brand.500"
                      fontWeight="bold"
                    >
                      {accountUsername(Data)}
                    </Link>
                  </Text>
                </HStack>
              </Box>
              <Box>
                {Data.updated && (
                  <Text mt="1" fontSize="sm" opacity={0.6} whiteSpace="nowrap">
                    {getReadableDate(Data.updated)}
                  </Text>
                )}
              </Box>
            </Stack>
          </Flex>
        </HStack>
      )}
    </>
  )
}
