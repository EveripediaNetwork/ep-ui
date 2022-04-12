import React from 'react'
import {
  HStack,
  Heading,
  Text,
  Box,
  Link,
  Tag,
  useBreakpointValue,
  Flex,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import shortenAccount from '@/utils/shortenAccount'
import { WikiImage } from '@/components/WikiImage'
import { WikiTitle } from '@/services/nav-search'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import TimeModified from './TimeModified'
import VoteTimeRemaining from './VoteTimeRemaining'
import DisplayAvatar from '../Elements/Avatar/Avatar'

interface ActivityCardProps {
  id: string
  title: string
  brief: string
  editor: string
  isFirstEdit: boolean
  percentChanged: number
  lastModTimeStamp: string
  wiki: WikiTitle
}

const ActivityCard = ({
  id,
  title,
  brief,
  editor,
  percentChanged,
  isFirstEdit,
  lastModTimeStamp,
  wiki,
}: ActivityCardProps) => {
  const editDetails = useBreakpointValue({
    base: (
      <Box>
        <HStack>
            <DisplayAvatar size="xl" mt={1} />
            <Text fontSize="14px" color="linkColor">
              <NextLink href={`/account/${editor}`} passHref>
                <Link href="passRef" color="brand.500" fontWeight="bold">
                  {shortenAccount(editor || '')}
                </Link>
              </NextLink>
            </Text>
        </HStack>
        <VoteTimeRemaining lastModTimeStamp={lastModTimeStamp} />
      </Box>
      // <Text fontSize="14px" opacity={0.6}>
      //   {/* <TimeModified lastModTimeStamp={lastModTimeStamp} /> */}
       
      // </Text>
    //   <Flex justifyContent="space-between" w="full">
    //   <Box>
    //     <HStack flex="1">
    //       <DisplayAvatar size="xl" mt={1} />
    //       <Text fontSize="14px" color="linkColor">
    //         <NextLink href={`/account/${editor}`} passHref>
    //           <Link href="passRef" color="brand.500" fontWeight="bold">
    //             {shortenAccount(editor || '')}
    //           </Link>
    //         </NextLink>
    //       </Text>
    //       <HStack spacing={2}>
    //         {['red', 'green', 'yellow', 'purple', 'teal'].map(color => (
    //           <Tag
    //             key={color}
    //             borderRadius={6}
    //             variant="solid"
    //             colorScheme={color}
    //           >
    //             <Text px={4} color="textColor">
    //               {' '}
    //               NFT
    //             </Text>
    //           </Tag>
    //         ))}
    //       </HStack>
    //     </HStack>
    //   </Box>
    //   <Box>
    //     <VoteTimeRemaining lastModTimeStamp={lastModTimeStamp} />
    //   </Box>
    // </Flex>
    ),
    md: (
      <Text fontSize="14px" color="linkColor">
        {/* <NextLink href={`/account/${editor}`} passHref>
          <Link href="passRef" color="brand.500" fontWeight="bold">
            {shortenAccount(editor || '')}
          </Link>
        </NextLink>{' '}
        edited <TimeModified lastModTimeStamp={lastModTimeStamp} /> |{' '} */}
        {isFirstEdit ? 'First Edit ' : `${percentChanged * 100}% Changed `}
      </Text>
    ),
    lg: (
      <Flex justifyContent="space-between" w="full">
        <Box>
          <HStack flex="1">
            <DisplayAvatar size="xl" mt={1} />
            <Text fontSize="14px" color="linkColor">
              <NextLink href={`/account/${editor}`} passHref>
                <Link href="passRef" color="brand.500" fontWeight="bold">
                  {shortenAccount(editor || '')}
                </Link>
              </NextLink>
            </Text>
            <HStack spacing={2}>
              {['red', 'green', 'yellow', 'purple', 'teal'].map(color => (
                <Tag
                  key={color}
                  borderRadius={6}
                  variant="solid"
                  colorScheme={color}
                >
                  <Text px={4} color="textColor">
                    {' '}
                    NFT
                  </Text>
                </Tag>
              ))}
            </HStack>
          </HStack>
        </Box>
        <Box>
          <VoteTimeRemaining lastModTimeStamp={lastModTimeStamp} />
        </Box>
      </Flex>
    ),
  })

  return (
    <HStack
      bgColor="cardBg"
      justifyContent="flex-start"
      borderWidth="1px"
      borderColor="cardBorder"
      borderRadius="lg"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.10)"
      px={{ base: 3, lg: 5 }}
      py={{ base: 3, lg: 3 }}
      w="full"
    >
      <NextLink href={`/wiki/${id}`} passHref>
        <WikiImage
          cursor="pointer"
          flexShrink={0}
          imageURL={getWikiImageUrl(wiki)}
          h={{ base: 65, lg: 100 }}
          w={{ base: 65, lg: 100 }}
          borderRadius="lg"
          overflow="hidden"
        />
      </NextLink>
      <Box w="100%" px={4} minW={0} p={{ base: 1, lg: 4 }} mx="auto">
        <Flex mb={{base: 0, md: 2}} justifyContent="space-between">
          <Heading
            cursor="pointer"
            as="h2"
            fontSize={{ base: '16px', md: '20px' }}
            letterSpacing="wide"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            w={{base: "50%", md: "100%"}}
          >
            {title}
          </Heading>

          <Text color="brand.500" fontWeight="bold">
            NFTs
          </Text>
        </Flex>
        <Box mb="2" maxW="80%" maxH="50px" overflow="hidden">
          <Text display={{ base: 'none', lg: 'flex' }}>{brief}</Text>
        </Box>
        {editDetails}
      </Box>
      {/* <HStack  justifyContent="space-between">
        <NextLink href={`/wiki/${id}`} passHref>
          <WikiImage
            cursor="pointer"
            flexShrink={0}
            imageURL={getWikiImageUrl(wiki)}
            h={{ base: 65, lg: 100 }}
            w={{ base: 65, lg: 100 }}
            borderRadius="lg"
            overflow="hidden"
          />
        </NextLink>
        <VStack
          alignItems="start"
          px={4}
          spacing={{ base: 1, lg: 2 }}
          minW={0}
          p={{ base: 1, lg: 4 }}
          mx="auto"
        >
          
          <NextLink href={`/wiki/${id}`} passHref>
          
          <Box w="100%">
            <Flex  justifyContent="space-between" >
                <Heading
                    cursor="pointer"
                    as="h2"
                    fontSize={{ base: '16px', md: '20px' }}
                    letterSpacing="wide"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    
                >
                  {title}
                </Heading>
                
                <VoteTimeRemaining lastModTimeStamp={lastModTimeStamp} />
            </Flex>
          </Box>
          </NextLink>
          <Box maxW="80%" maxH="50px" overflow="hidden">
            <Text display={{ base: 'none', lg: 'flex' }}>{brief}</Text>
          </Box>
          <HStack>{editDetails}</HStack>
        </VStack>
      </HStack>
       */}
    </HStack>
  )
}

export default ActivityCard
