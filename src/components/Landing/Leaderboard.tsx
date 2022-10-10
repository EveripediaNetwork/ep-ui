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
} from '@chakra-ui/react'
import React from 'react'
import { LEADERBOARD_DATA } from '@/data/LeaderBoardData'
import { RiTrophyFill } from 'react-icons/ri'
import { Carousel } from '../Elements'
import DisplayAvatar from '../Elements/Avatar/DisplayAvatar'
import { CustomTab } from '../Profile/CustomTab'
import LinkOverlay from '../Elements/LinkElements/LinkOverlay'

const SECTIONS = [
  { period: 'Day', disabled: true },
  { period: 'Month', disabled: true },
  { period: 'Year', disabled: true },
  { period: 'All time', disabled: false },
]

const LeaderBoardCard = ({
  editor,
}: {
  editor: typeof LEADERBOARD_DATA[0]
}) => {
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
          <LinkOverlay href={`/account/${editor.address}`}>
            <DisplayAvatar
              alt="new life"
              overflow="hidden"
              borderWidth={2}
              borderColor="white"
              rounded="full"
              justifySelf="center"
              address="0xf60488e823b3d1765774e6f0F4eE40a31E69180c"
              // avatarIPFS={"profileData?.avatar"}
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
              <Text fontSize="md" textAlign="center" color="brandLinkColor">
                {editor.name}
              </Text>
              <Text textAlign="center">{editor.earning}</Text>
            </VStack>
            <Center color="trophyColor">
              <RiTrophyFill fontSize="30" />
            </Center>
          </LinkOverlay>
        </Flex>
      </chakra.div>
    </LinkBox>
  )
}

const LeaderBoard = () => {
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
          {LEADERBOARD_DATA.map((editor, index) => (
            <LeaderBoardCard key={`editor-${index}`} editor={editor} />
          ))}
        </Carousel>
      </Box>
    </Box>
  )
}

export default LeaderBoard
