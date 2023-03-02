import {
  AspectRatio,
  Box,
  Flex,
  HStack,
  Text,
  Heading,
  Link,
  Stack,
  Select,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import DisplayAvatar from '@/components/Elements/Avatar/DisplayAvatar'
import { WikiImage } from '@/components/WikiImage'
import { CreatedWikisCount } from '@/types/admin'
import { getReadableDate } from '@/utils/DataTransform/getFormattedDate'
import { getWikiImageUrl } from '@/utils/WikiUtils/getWikiImageUrl'
import { shortenAccount } from '@/utils/textUtils'
import { Image } from '@everipedia/iq-utils'

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
          py={{ base: 3, lg: 3 }}
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
              {Data.categories.length ? (
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
                      {category.title ? category.title : ''}
                    </Link>
                  ))}
                </HStack>
              ) : (
                <Text> </Text>
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
                      {/* eslint-disable no-nested-ternary */}
                      {Data.author?.profile?.username
                        ? Data.author.profile.username
                        : Data.author?.id
                        ? shortenAccount(Data.author.id)
                        : 'Unknown'}
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

type ContentProps = {
  activeStep: number
  step2Titles: string
  promotedWikis: CreatedWikisCount[] | undefined
  Data: CreatedWikisCount | undefined
  setValue: (value: React.SetStateAction<string>) => void
}

export const Content = (props: ContentProps) => {
  const { activeStep, step2Titles, promotedWikis, Data, setValue } = props
  return (
    <>
      {activeStep === 0 && (
        <Text textAlign="center">
          Select the appropriate action you would like to take for this wiki
        </Text>
      )}
      {activeStep === 1 && (
        <>
          <VStack gap={4}>
            {step2Titles === 'Promote to Trending wiki' && (
              <Box w="full">
                <Text fontWeight="bold" py="1">
                  Select slot
                </Text>
                <Select
                  cursor="pointer"
                  onChange={e => setValue(e.target.value)}
                  defaultValue={promotedWikis?.length}
                >
                  {promotedWikis &&
                    [...promotedWikis]
                      ?.sort((a, b) => a.promoted - b.promoted)
                      ?.slice(1)
                      ?.map(item => (
                        <option value={item.promoted}>
                          SLOT {item.promoted - 1} - {item.title}
                        </option>
                      ))}
                  {promotedWikis && (
                    <option value={promotedWikis && +promotedWikis.length + 1}>
                      New Slot
                    </option>
                  )}
                </Select>
              </Box>
            )}
            <GetWiki Data={Data} />
          </VStack>
        </>
      )}
      {activeStep === 2 && (
        <>
          {step2Titles === 'Promote to Trending wiki' ? (
            <Text textAlign="center">
              You are about to promote a wiki to the Trending wiki section of
              the homepage. Do you wish to continue this action?
            </Text>
          ) : (
            <Text textAlign="center">
              You are about to promote a wiki to the hero section of the
              homepage. Do you wish to continue this action?
            </Text>
          )}
        </>
      )}
    </>
  )
}
