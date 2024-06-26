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
      'flex h-[250px] w-full flex-col md:h-[400px] lg:h-[320px] lg:flex-row'
    }
  >
    <MagicCard className="flex w-full cursor-pointer flex-col text-left overflow-hidden bg-[radial-gradient(var(--mask-size)_circle_at_var(--mouse-x)_var(--mouse-y),#ffaa40_0,#9c40ff_50%,transparent_100%)] p-10">
      <Icon as={icon} mb={4} w="50px" h="50px" />
      <Heading fontWeight={700} fontSize={{ base: '18px', lg: '20px' }} mb={4}>
        {title}
      </Heading>
      <Text
        fontWeight={500}
        fontSize={{ base: '14px', md: '16px', lg: '18px' }}
      >
        {content}
      </Text>
      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
    </MagicCard>
  </MagicContainer>
)

export default AboutFeaturesCard
