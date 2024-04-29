import { Box, Grid } from '@chakra-ui/react'
import React from 'react'
import GlossaryAlphabets from './GlossaryAlphabets'
import { glossaryAlphabetsData } from '@/data/GlossaryAlphabetsData'
import { GlossaryAlphabetsSectionProps } from '@/types/GlossaryType'

const GlossaryAlphabetSection = (props: GlossaryAlphabetsSectionProps) => {
  const { shouldBeFixed, heightOfElement, showAlphabetBlock } = props
  return (
    <Box
      backgroundColor={shouldBeFixed ? '#F9FAFB' : ''}
      _dark={{
        bg: `${shouldBeFixed ? 'gray.800' : ''} `,
      }}
      display={{ base: showAlphabetBlock ? 'block' : 'none', md: 'block' }}
    >
      <Box
        backgroundColor={shouldBeFixed ? 'blogPageBg' : ''}
        _dark={{
          bg: `${shouldBeFixed ? 'gray.700' : ''} `,
        }}
      >
        <Box
          w={shouldBeFixed ? 'min(90%, 1100px)' : ''}
          mx={shouldBeFixed ? 'auto' : ''}
        >
          <Grid
            templateColumns={{
              base: 'repeat(9,1fr)',
              md: 'repeat(20,1fr)',
              lg: 'repeat(27,1fr)',
            }}
            gap={3}
            py={{ base: '4' }}
          >
            {glossaryAlphabetsData.map((item, i) => (
              <GlossaryAlphabets
                key={i}
                item={item}
                heightOfElement={heightOfElement}
                shouldBeFixed={shouldBeFixed}
              />
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

export default GlossaryAlphabetSection
