import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { PluginContext } from '@toast-ui/editor'
import { EmbedCard } from './EmbedCard'

export const EmbedFrame = ({
  editorContext,
}: {
  editorContext: PluginContext
}) => {
  const { eventEmitter } = editorContext
  const [activeAccordion, setActiveAccordion] = useState('')

  const embeds = [
    {
      name: 'Dune',
      desc: 'Embeds widgets from dune.com',
      regex: /https:\/\/dune.com\/embeds\/\d+\/\d+\/(\w+|-)+/,
      type: 'DUNE',
    },
  ]
  const initializeEmbed = (type: string, path: string) => {
    eventEmitter.emit('command', 'insertEmbed', { path, type })
  }

  const embedCardProps = (embed: typeof embeds[0]) => ({
    name: embed.name,
    desc: embed.desc,
    regex: embed.regex,
    type: embed.type,
    isOpen: activeAccordion === embed.name,
    onOpen: () => setActiveAccordion(embed.name),
    onClose: () => setActiveAccordion(''),
    initializeEmbed,
  })

  return (
    <Box maxH="350px">
      <Box mb={10}>
        <Heading fontSize="20px" mb="2px">
          Insert Embed
        </Heading>
        <Text
          mb="10px"
          color="#2D3748 !important"
          _dark={{ color: '#ffffffa3 !important' }}
        >
          Embeds widgets from other websites. Select a website below to enter
          embed URL from.
        </Text>
      </Box>
      <VStack w="100%" overflowY="scroll" spacing={8}>
        {activeAccordion !== ''
          ? embeds
              .filter(e => e.name === activeAccordion)
              ?.map(embed => <EmbedCard {...embedCardProps(embed)} />)
          : embeds.map(embed => <EmbedCard {...embedCardProps(embed)} />)}
      </VStack>
    </Box>
  )
}
