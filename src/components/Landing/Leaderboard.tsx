import {
  Text,
  LinkBox,
  chakra,
  Heading,
  Box,
  Flex,
  Tabs,
  TabList,
  VStack,
  Center,
  useBreakpointValue,
  Skeleton,
} from '@chakra-ui/react'
import React from 'react'
import { LeaderBoardType } from '@/services/editor'
import { useENSData } from '@/hooks/useENSData'
import * as Humanize from 'humanize-plus'
import { Carousel } from '../Elements'
import DisplayAvatar from '../Elements/Avatar/DisplayAvatar'
import { CustomTab } from '../Profile/CustomTab'
import LinkOverlay from '../Elements/LinkElements/LinkOverlay'
import RankIcon from '../Elements/EditorRank/EditorRank'

const SECTIONS = [
  { period: 'Day', disabled: true },
  { period: 'Month', disabled: true },
  { period: 'Year', disabled: true },
  { period: 'All time', disabled: false },
]

const LeaderBoardCard = ({
  editor,
  index,
}: {
  editor: LeaderBoardType
  index: number
}) => {
  const [, ensUserName] = useENSData(editor.id)
  return (
    <LinkBox flex="none">
      <chakra.div p={2} mx="auto">
        <Flex
          alignSelf="center"
          direction="column"
          textAlign="left"
          maxW={{ base: 'min(90vw, 400px)', md: '96', lg: '388' }}
          cursor="pointer"
          mx="auto"
        >
          <LinkOverlay href={`/account/${editor.id}`}>
            <DisplayAvatar
              alt="new life"
              overflow="hidden"
              borderWidth={2}
              borderColor="white"
              rounded="full"
              justifySelf="center"
              size="130"
              address={editor.id}
              wrapperProps={{
                zIndex: 'calc(var(--chakra-zIndices-sticky) - 1)',
              }}
              svgProps={{
                boxSize: '32',
                overflow: 'hidden',
                borderWidth: 2,
                borderColor: 'white',
                rounded: 'full',
                justifySelf: 'center',
              }}
            />
            <VStack my="6">
              {ensUserName ? (
                <Text fontSize="md" textAlign="center" color="brandLinkColor">
                  {ensUserName}
                </Text>
              ) : (
                <Center>
                  <Skeleton height="14px" rounded="lg" w="130px" />
                </Center>
              )}
              <Text fontSize="sm" textAlign="center">
                {Humanize.intComma(editor.totalRewards)} IQ Earned
              </Text>
            </VStack>
            <RankIcon size="30" rank={index}/>
          </LinkOverlay>
        </Flex>
      </chakra.div>
    </LinkBox>
  )
}

const LeaderBoard = ({ leaderboards }: { leaderboards: LeaderBoardType[] }) => {
  const tabPadding = useBreakpointValue({ base: '3', md: '5' })
  return (
    <Box px={{ base: 3, md: 8 }} py={{ base: 5, md: 20 }} textAlign="center">
      <Heading
        textAlign="center"
        mb={4}
        fontWeight="700"
        fontSize={{ base: '3xl', lg: 46 }}
      >
        Leaderboard
      </Heading>
      <Text
        color="homeDescriptionColor"
        fontSize={{ base: 'lg', lg: 22 }}
        mx="auto"
        mb={9}
        px={4}
      >
        An Highlight of exceptional editors who has contributed greatly to the
        IQ wiki.
      </Text>

      <Box maxW="1160px" mx="auto">
        <Tabs defaultIndex={3} alignSelf="self-start" w="full" my="6">
          <TabList pl={5} border="none">
            {SECTIONS.map((section, sid) => (
              <CustomTab
                _selected={{
                  color: 'brandLinkColor !important',
                  _after: {
                    background: 'brandLinkColor !important',
                  },
                }}
                key={sid}
                fontWeight="semibold"
                p={tabPadding}
                isDisabled={section.disabled}
              >
                {section.period}{' '}
              </CustomTab>
            ))}
          </TabList>
        </Tabs>
        <Carousel
          topArrow="25%"
          settings={{
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5,
            responsive: [
              {
                breakpoint: 1000,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 4,
                  initialSlide: 4,
                  infinite: true,
                },
              },
              {
                breakpoint: 680,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  infinite: true,
                },
              },
            ],
          }}
        >
          {leaderboards.map((editor, index) => (
            <LeaderBoardCard
              index={index}
              key={`editor-${index}`}
              editor={editor}
            />
          ))}
        </Carousel>
      </Box>
    </Box>
  )
}

export default LeaderBoard
