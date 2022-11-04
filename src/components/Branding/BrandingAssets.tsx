import { Button, Flex, Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BiCloudDownload } from 'react-icons/bi'
import BrandingAssetDownloadBttn from './BrandingAssetDownloadBttn'

export const BrandingAssets = ({
  bg,
}: {
  bg: { bg: string; download: string }
}) => {
  const [showDownloadOptions, setShowDownloadOptions] = useState<boolean>(false)
  return (
    <Flex
      w={{ lg: '30%', base: '45%', md: '30%' }}
      flexDirection="column"
      gap={2}
    >
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
        <Image src={bg.bg} />
        <Button
          onClick={() => {
            setShowDownloadOptions(true)
          }}
          justifyContent="end"
          variant="outline"
          border="none"
          p="0"
          rightIcon={<BiCloudDownload fontSize="22px" />}
          h="fit-content"
          fontWeight="light"
          fontSize="md"
          _hover={{ backgroundColor: 'transparent' }}
        >
          Download
        </Button>
      </Flex>
    </Flex>
  )
}
