import React, { useEffect, useState } from 'react'
import { Box, useColorMode, VStack } from '@chakra-ui/react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import WikiAccordion from '../../WikiAccordion'

const TwitterTimeline = ({ url }: { url: string }) => {
  const { colorMode } = useColorMode()
  const [snapOpen, setSnapOpen] = useState(true)
  useEffect(() => {
    setSnapOpen(false)
    const timeout = setTimeout(() => {
      setSnapOpen(true)
    }, 100)
    return () => clearTimeout(timeout)
  }, [colorMode])

  return (
    <VStack w="100%" spacing={4} borderRadius={2} mb="5">
      <WikiAccordion title="Twitter Timeline" IsOpen={false}>
        <Box
          className="wikiTwitterTimelineWidget"
          h="400px"
          bgColor="white"
          _dark={{
            bgColor: 'dimColor',
          }}
          borderRadius={4}
          position="relative"
        >
          {snapOpen && (
            <TwitterTimelineEmbed
              options={{ height: 400 }}
              theme={colorMode}
              sourceType="url"
              noScrollbar
              borderColor={colorMode === 'dark' ? '#4a5568' : '#ddd'}
              url={`//${url}`}
            />
          )}
        </Box>
      </WikiAccordion>
    </VStack>
  )
}

export default TwitterTimeline
