import { Button, Flex, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BiCloudDownload } from 'react-icons/bi'
import BrandingAssetDownloadBttn from './BrandingAssetDownloadBttn'

export const BrandingAssets = ({
  bg,
  updateSelectedAsset,
  currentlyViewed,
  dark,
  isBraindoa,
}: {
  bg: { bg: string; download: string }
  updateSelectedAsset: () => void
  currentlyViewed: string
  dark?: string
  isBraindoa?: boolean
}) => {
  const [showDownloadOptions, setShowDownloadOptions] = useState<boolean>(false)
  useEffect(() => {
    if (currentlyViewed === bg.bg) {
      setShowDownloadOptions(true)
    } else {
      setShowDownloadOptions(false)
    }
  }, [currentlyViewed, bg.bg])

  const cardBG = useColorModeValue(bg.bg, dark || bg.bg)
  return (
    <Flex w={{ base: '45%', md: '30%' }} flexDirection="column" gap={2}>
      <Flex
        flexDir="column"
        gap={4}
        display={showDownloadOptions ? 'flex' : 'none'}
      >
        <BrandingAssetDownloadBttn
          text="download as .SVG"
          href={`${bg.download}.svg`}
          closeDownloadOptions={() => {
            setShowDownloadOptions(false)
          }}
        />
        <BrandingAssetDownloadBttn
          text="download as .PNG"
          href={`${bg.download}.png`}
          closeDownloadOptions={() => {
            setShowDownloadOptions(false)
          }}
        />
      </Flex>

      <Flex
        gap="2"
        display={!showDownloadOptions ? 'flex' : 'none'}
        flexDir="column"
      >
        <Flex
          alignItems="end"
          justifyContent="end"
          bg={`url(${cardBG})`}
          w="100%"
          h={{
            base: `${!isBraindoa ? '89px' : '143px'}`,
            lg: `${!isBraindoa ? '190px' : '307px'}`,
          }}
          backgroundPosition="center"
          backgroundSize="cover"
          borderRadius="xl"
        >
          <Button
            onClick={() => {
              updateSelectedAsset()
              setShowDownloadOptions(true)
            }}
            fontSize="0px"
            bg="white"
            boxShadow="0px 0px 4px 2px rgba(183, 183, 183, 0.21)"
            variant="outline"
            border="none"
            display="flex"
            borderRadius="200px"
            m={{ base: '0', lg: '2', md: '2' }}
            p="2"
            w="fit-content"
            alignItems="center"
            justifyItems="center"
            justifyContent="center"
            rightIcon={<BiCloudDownload fontSize="20px" />}
            // size={{ base: 'sm' }}
            iconSpacing="0"
            transform={{ base: 'scale(0.5)', lg: 'scale(1)', md: 'scale(1)' }}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
