import {
  VStack,
  HStack,
  Text,
  Heading,
  Box,
  IconButton,
} from '@chakra-ui/react'
import React from 'react'
import { TeamData } from '@/data/MeetOurTeamData'
import { IconType } from 'react-icons/lib'
import { useTranslation } from 'next-i18next'
import { RiLinkedinFill, RiTwitterFill } from 'react-icons/ri'
import IQLogo from './logos/iq-grey.svg'
import { Image } from '../Elements/Image/Image'
import AboutOurTeamSlider from './AboutOurTeamSlider'

const IconButtonSocial = ({
  name,
  icon,
  onClick,
}: {
  name: string
  icon?: IconType
  onClick: () => void
}) => (
  <IconButton
    display="grid"
    placeItems="center"
    bgColor="transparent"
    _hover={{ bgColor: 'transparent' }}
    _focus={{ bgColor: 'transparent' }}
    _active={{ bgColor: 'transparent' }}
    cursor="pointer"
    color="gray"
    aria-label={name}
    size="xs"
    as={icon || IQLogo}
    onClick={onClick}
  />
)
const AboutOurTeam = () => {
  const { t } = useTranslation('about')

  return (
    <VStack
      spacing={8}
      maxW={{ base: '100%', lg: '80%', '2xl': '65%' }}
      mx="auto"
      mt={{ base: 20, md: '24 !important' }}
    >
      <Heading size="lg">{t('meetTeamHead')}</Heading>
      <Text
        align="center"
        maxW="90%"
        mx="auto"
        fontSize={{ base: '16px', md: '18px', xl: '20px' }}
      >
        {t('meetTeamContent')}
      </Text>
      <Box className="about__ourTeamSliderWrapper" w="100%">
        <AboutOurTeamSlider>
          {TeamData.map((teamMember) => (
            <VStack
              display="block !important"
              mx="auto"
              key={teamMember.name}
              alignItems="center"
              justifyContent="center"
            >
              <Box>
                <Image
                  boxSize="150px"
                  mx="auto"
                  mt="80px"
                  className="teamMember__image"
                  src={teamMember.image}
                  alt={teamMember.name}
                  priority
                  overflow="hidden"
                  rounded="full"
                />
              </Box>
              <Heading textAlign="center" size="md" mt={4}>
                {teamMember.name}
              </Heading>
              <Text textAlign="center" mt={2} opacity={0.6}>
                {teamMember.title}
              </Text>
              <VStack spacing={4} className="teamMember__about" display="none">
                <Text textAlign="center" mt={2}>
                  {t(teamMember.about)}
                </Text>
                <HStack justify="center" spacing={4}>
                  {teamMember.socials.linkedin && (
                    <IconButtonSocial
                      name="linked in"
                      icon={RiLinkedinFill}
                      onClick={() => window.open(teamMember.socials.linkedin)}
                    />
                  )}
                  {teamMember.socials.twitter && (
                    <IconButtonSocial
                      name="twitter"
                      icon={RiTwitterFill}
                      onClick={() => window.open(teamMember.socials.twitter)}
                    />
                  )}
                  {teamMember.socials.iqWiki && (
                    <IconButtonSocial
                      name="IQ.wiki"
                      onClick={() => window.open(teamMember.socials.iqWiki)}
                    />
                  )}
                </HStack>
              </VStack>
            </VStack>
          ))}
        </AboutOurTeamSlider>
      </Box>
    </VStack>
  )
}

export default AboutOurTeam
