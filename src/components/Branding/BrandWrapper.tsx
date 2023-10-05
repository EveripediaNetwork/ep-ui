import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BrandingAssets } from './BrandingAssets'

type AssetType = {
  bg: string
  download: string
  dark?: string
}

type BrandWrapperType = {
  title: string
  description?: string
  brandAsset: AssetType[]
  isBrainDao?: boolean
}

const BrandWrapper = ({
  title,
  description,
  brandAsset,
  isBrainDao,
}: BrandWrapperType) => {
  const [currentViewedAsset, setCurrentViewedAsset] = useState<string>('')

  return (
    <Box pb={24} maxW={{ base: '90%', '2xl': '1280px' }} mx="auto">
      <Flex flexDir="column">
        <Heading fontWeight={'600'} fontSize={{ base: '24px', lg: '36px' }}>
          {title}
        </Heading>
        {description && (
          <Text mt={4} fontSize={{ lg: '20px', base: 'sm' }}>
            {description}
          </Text>
        )}
      </Flex>
      <Flex mt={10} flexWrap="wrap" gap="2rem" justifyContent="space-between">
        {brandAsset.map((item, index) => {
          return (
            <BrandingAssets
              key={index}
              bg={item}
              currentlyViewed={currentViewedAsset}
              updateSelectedAsset={() => {
                setCurrentViewedAsset(item.bg)
              }}
              dark={item.dark}
              isBraindao={isBrainDao}
            />
          )
        })}
      </Flex>
    </Box>
  )
}

export default BrandWrapper