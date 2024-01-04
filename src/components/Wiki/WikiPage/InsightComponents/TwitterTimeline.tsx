import React, { useEffect, useRef, useState } from 'react'
import { Box, Spinner, Text, useColorMode, VStack } from '@chakra-ui/react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import WikiAccordion from '../../WikiAccordion'
import { useTranslation } from 'next-i18next'

const TwitterTimeline = ({ url }: { url: string }) => {
  const { colorMode } = useColorMode()
  const { t } = useTranslation('wiki')
  const twitterTimelineRef = useRef<HTMLDivElement>(null)
  const [snapOpen, setSnapOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded) setIsLoaded(true)
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    )
    observer.observe(twitterTimelineRef.current as Element)
  }, [isLoaded])

  useEffect(() => {
    if (isLoaded) {
      setSnapOpen(false)
      const timeout = setTimeout(() => {
        setSnapOpen(true)
      }, 100)
      return () => clearTimeout(timeout)
    }
    return () => {}
  }, [colorMode, isLoaded])

  return (
    <VStack
      ref={twitterTimelineRef}
      w="100%"
      spacing={4}
      borderRadius={2}
      mb="5"
    >
      <WikiAccordion title={t('Twitter Timeline')}>
        <Box
          h="400px"
          bgColor="white"
          _dark={{
            bgColor: 'dimColor',
          }}
          borderRadius={12}
          position="relative"
          overflowY="scroll"
        >
          {snapOpen && (
            <Box
              zIndex={2}
              pos="absolute"
              left={0}
              top={0}
              right={0}
              bottom={0}
            >
              <TwitterTimelineEmbed
                options={{ height: 400 }}
                theme={colorMode}
                sourceType="url"
                noScrollbar
                tweetLimit={4}
                borderColor={colorMode === 'dark' ? '#4a5568' : '#ddd'}
                url={url}
              />
            </Box>
          )}
          <VStack
            pos="absolute"
            left={0}
            top={0}
            right={0}
            bottom={0}
            zIndex={1}
            opacity="0.5"
            align="center"
            justify="center"
            h="full"
          >
            <Spinner />
            <Text fontSize="sm">{t('Loading')}</Text>
          </VStack>
        </Box>
      </WikiAccordion>
    </VStack>
  )
}

export default TwitterTimeline
