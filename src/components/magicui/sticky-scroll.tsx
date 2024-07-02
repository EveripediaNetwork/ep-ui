import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Box,
  Text,
  VStack,
  Flex,
  Link,
  AspectRatio,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Image } from '../Elements/Image/Image'
import { WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import { mooLahLah } from '@/pages/_app'

interface ContentItem {
  title: string
  description: string
  year: number
}

interface StickyScrollRevealProps {
  content: ContentItem[]
  contentClassName?: string
}

export const StickyScrollReveal: React.FC<StickyScrollRevealProps> = ({
  content,
  contentClassName,
}) => {
  const [activeCard, setActiveCard] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardLength = content.length

  const isDesktop = useBreakpointValue({ base: false, lg: true })

  useEffect(() => {
    if (!isDesktop) return

    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = containerRef.current.scrollTop
        const containerHeight = containerRef.current.clientHeight
        const scrollHeight = containerRef.current.scrollHeight
        const progress = scrollPosition / (scrollHeight - containerHeight)
        const index = Math.min(
          Math.floor(progress * cardLength),
          cardLength - 1,
        )
        setActiveCard(index)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [cardLength, isDesktop])

  const processText = (inputText: string): React.ReactNode[] => {
    const linkRegex = /<Link href='([^']*)'>(.*?)<\/Link>/g
    const elements: React.ReactNode[] = []
    let lastIndex = 0

    inputText.replace(linkRegex, (match, href, linkText, index) => {
      elements.push(inputText.substring(lastIndex, index))
      lastIndex = index + match.length

      elements.push(
        <Link color="brandLinkColor" key={index} href={href} isExternal>
          {linkText}
        </Link>,
      )

      return match
    })

    elements.push(inputText.substring(lastIndex))

    return elements
  }

  return (
    <Flex
      direction={{ base: 'column', lg: 'row' }}
      position="relative"
      height={{ base: 'auto', lg: '30rem' }}
      mt={20}
    >
      <Box
        ref={containerRef}
        flex={1}
        overflowY={{ base: 'visible', lg: 'auto' }}
        pr={{ base: 0, lg: 10 }}
        className="scrollbar-hide"
      >
        <VStack spacing={12}>
          {content.map((item, index) => (
            <Box
              key={item.title + index}
              height={{ base: 'auto', lg: '24rem' }}
              justifyContent="center"
              display="flex"
              flexDirection="column"
              mb={{ base: 20, lg: 0 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isDesktop ? (activeCard === index ? 1 : 0.3) : 1,
                }}
              >
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  color="gray.800"
                  _dark={{ color: 'white' }}
                >
                  {item.title}
                </Text>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isDesktop ? (activeCard === index ? 1 : 0.3) : 1,
                }}
              >
                <Text
                  fontSize={{ base: 'sm', lg: 'md' }}
                  color="gray.800"
                  _dark={{ color: 'white' }}
                  maxWidth={{ base: 'xl', md: 'full', lg: 'xl' }}
                  mt={5}
                >
                  {processText(item.description)}
                </Text>
              </motion.div>

              {!isDesktop && (
                <Box position="relative">
                  <AspectRatio
                    ratio={WIKI_IMAGE_ASPECT_RATIO}
                    w="100%"
                    h="auto"
                  >
                    <Image
                      boxSize="100%"
                      objectFit="cover"
                      alt="Star Background"
                      src="/images/star.png"
                      position="relative"
                      top={{ base: 'auto', xl: 0 }}
                    />
                  </AspectRatio>
                  <Text
                    fontWeight="bold"
                    position="absolute"
                    top="55%"
                    left="52%"
                    transform="translate(-50%, -50%)"
                    zIndex={1}
                    color="brand.500"
                    _dark={{ color: 'brand.800' }}
                    fontSize="7xl"
                    className={`${contentClassName} ${mooLahLah.className}`}
                  >
                    {item.year}
                  </Text>
                </Box>
              )}
            </Box>
          ))}
        </VStack>
      </Box>

      {isDesktop && (
        <Flex
          justify="center"
          align="center"
          position={{ base: 'relative', lg: 'sticky' }}
          left={{ md: 20 }}
          height={{ base: 'auto', lg: '100%' }}
          width={{ base: '100%', lg: '40%' }}
          paddingRight={20}
          overflow="hidden"
          color="brand.500"
          _dark={{ color: 'brand.800' }}
          textAlign="center"
          fontSize={{ base: '6xl', lg: '9xl' }}
          className={`${contentClassName} ${mooLahLah.className}`}
        >
          <AspectRatio
            ratio={WIKI_IMAGE_ASPECT_RATIO}
            w={'full'}
            h={'full'}
            position="absolute"
            zIndex={0}
          >
            <Image
              boxSize="100%"
              objectFit="cover"
              alt="Star Background"
              src="/images/star.png"
            />
          </AspectRatio>
          <Text
            fontWeight="bold"
            zIndex={1}
            fontSize={{ base: '6xl', md: '12xl', lg: '9xl' }}
          >
            {content[isDesktop ? activeCard : 0]?.year ?? null}
          </Text>
        </Flex>
      )}
    </Flex>
  )
}
