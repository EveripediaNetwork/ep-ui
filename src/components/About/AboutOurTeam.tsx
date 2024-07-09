import {
  VStack,
  HStack,
  Text,
  Heading,
  Box,
  IconButton,
  SimpleGrid,
  Flex,
} from '@chakra-ui/react'
import React from 'react'
import { TeamData } from '@/data/MeetOurTeamData'
import { IconType } from 'react-icons/lib'
import { useTranslation } from 'next-i18next'
import { RiLinkedinFill, RiTwitterXFill } from 'react-icons/ri'
import IQLogo from './logos/iq-grey.svg'
import { Image } from '../Elements/Image/Image'

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
    bgColor="transparent"
    _hover={{ bgColor: 'transparent' }}
    _focus={{ bgColor: 'transparent' }}
    _active={{ bgColor: 'transparent' }}
    cursor="pointer"
    color="gray"
    _dark={{ color: 'white' }}
    as={icon}
    size="xs"
    w="6"
    h="6"
    aria-label={name}
    onClick={onClick}
  />
)
const AboutOurTeam = () => {
  const { t } = useTranslation('about')

  return (
    <Box className="relative overflow-hidden">
      <Box
        className="absolute top-0 right-0 z-0"
        w="100%"
        height="100%"
        background="linear-gradient(340.01deg, rgba(255, 92, 170, 0.2) 0.96%, rgba(124, 227, 250, 0.1) 56.11%, rgba(238, 135, 184, 0.15) 95.04%)"
      />
      <div className="noise" />
      <VStack
        spacing={8}
        maxW={{ base: '100%', xl: '90%', '2xl': '1440px' }}
        mx="auto"
        mt={{ base: 20, md: '24 !important' }}
        className="relative z-10"
        px={[4, 4, 8, 14, 0]}
        py={[10, 20]}
      >
        <Flex flexDirection="column" gap={4} textAlign="center">
          <h2 className="text-brand-500 dark:text-brand-800 text-md font-semibold pt-0">
            {t('meetTeamTitle')}
          </h2>

          <Heading size="lg">{t('meetTeamHead')}</Heading>

          <Text
            maxW={{ base: 'md', md: '4xl' }}
            mx="auto"
            textAlign="center"
            fontSize={{ base: 'sm', md: 'xl', lg: 'lg' }}
            fontWeight="medium"
            className="text-gray-600 dark:text-white/80"
          >
            {t('meetTeamContent')}
          </Text>
        </Flex>

        <SimpleGrid columns={[1, 1, 2, 3, 4]} spacing={10}>
          {TeamData.map((person, index) => (
            <Box key={index}>
              <Image
                src={person.image}
                alt={person.name}
                objectFit="cover"
                h={{
                  base: '410px',
                  sm: '373px',
                  md: '318px',
                  lg: '300px',
                  xl: '300px',
                  '2xl': '400px',
                }}
                w="full"
                rounded="md"
                priority
              />

              <VStack align="start" spacing={3}>
                <Heading
                  as="h3"
                  size="md"
                  className="text-gray-800 dark:text-white mt-4"
                >
                  {person.name}
                </Heading>
                <Heading
                  as="h4"
                  size={{ base: 'sm', lg: 'sm', md: 'md' }}
                  className="text-brand-500 dark:text-brand-800"
                  fontWeight="medium"
                >
                  {person.title}
                </Heading>
                <HStack spacing={2}>
                  {person.socials.twitter && (
                    <IconButtonSocial
                      name="twitter"
                      icon={RiTwitterXFill}
                      onClick={() => window.open(person.socials.twitter)}
                    />
                  )}

                  {person.socials.iqWiki && (
                    <IconButtonSocial
                      name="IQ.wiki"
                      icon={IQLogo}
                      onClick={() => window.open(person.socials.iqWiki)}
                    />
                  )}

                  {person.socials.linkedin && (
                    <IconButtonSocial
                      name="linked in"
                      icon={RiLinkedinFill}
                      onClick={() => window.open(person.socials.linkedin)}
                    />
                  )}
                </HStack>

                <Text mt={2}>{t(person.about)}</Text>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  )
}

export default AboutOurTeam
