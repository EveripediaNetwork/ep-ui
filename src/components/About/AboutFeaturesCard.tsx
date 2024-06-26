import React from 'react'
import { Heading, Text, Icon } from '@chakra-ui/react'
import { IconType } from 'react-icons/lib'
import { MagicCard, MagicContainer } from '@/components/magicui/magic-card'
interface AboutFeaturesCardProps {
  title: string
  content: string
  icon: IconType
}

const AboutFeaturesCard = ({
  title,
  content,
  icon,
}: AboutFeaturesCardProps) => (
  <MagicContainer
    className={
      'flex h-[250px] w-full flex-col md:h-[400px] lg:h-[350px] lg:flex-row'
    }
  >
    <MagicCard className="flex w-full cursor-pointer flex-col text-left overflow-hidden bg-white">
      <Icon as={icon} mb={4} w="50px" h="50px" />
      <Heading
        fontWeight={700}
        fontSize={{ base: '18px', lg: '20px' }}
        mb={4}
        color="gray.800"
        _dark={{ color: 'white' }}
      >
        {title}
      </Heading>
      <Text
        fontWeight={500}
        fontSize={{ base: '14px', md: '16px', lg: '18px' }}
        color="gray.600"
        _dark={{ color: 'white' }}
      >
        {content}
      </Text>
    </MagicCard>
  </MagicContainer>
)

export default AboutFeaturesCard
