import { Button, Flex, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BiCloudDownload } from 'react-icons/bi'
import BrandingAssetDownloadBttn from './BrandingAssetDownloadBttn'
import { BrandingAssetsType } from '@/types/BrandingType'
import { useTranslation } from 'next-i18next'

export const BrandingAssets = (props: BrandingAssetsType) => {
  const { bg, updateSelectedAsset, currentlyViewed, dark } = props
  const [showDownloadOptions, setShowDownloadOptions] = useState(false)
  useEffect(() => {
    if (currentlyViewed === bg.bg) {
      setShowDownloadOptions(true)
    } else {
      setShowDownloadOptions(false)
    }
  }, [currentlyViewed, bg.bg])
  const cardBG = useColorModeValue(bg.bg, dark ?? bg.bg)
  const downloadIconColor = useColorModeValue('#FF5CAA', '#FF1A88')
  const { t } = useTranslation('branding')

  return (
    <Flex
      flexDirection="column"
      gap={2}
      onClick={() => {
        updateSelectedAsset()
        setShowDownloadOptions(true)
      }}
      cursor="pointer"
    >
      <Flex
        flexDir="column"
        gap={4}
        display={showDownloadOptions ? 'flex' : 'none'}
      >
        <BrandingAssetDownloadBttn
          text={t('downloadAsSVG')}
          href={`${bg.download}.svg`}
          closeDownloadOptions={() => {
            setShowDownloadOptions(false)
          }}
        />
        <BrandingAssetDownloadBttn
          text={t('downloadAsPNG')}
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
          minH={{ base: '200px', md: '222px' }}
          backgroundPosition="center"
          backgroundSize="cover"
          borderRadius="xl"
          border={'1px'}
          borderColor={'gray.100'}
          _dark={{
            border: 'none',
          }}
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
            m={{ base: '0', md: '2' }}
            p="2"
            w="fit-content"
            alignItems="center"
            justifyItems="center"
            justifyContent="center"
            rightIcon={
              <BiCloudDownload fontSize="20px" color={downloadIconColor} />
            }
            iconSpacing="0"
            transform={{ base: 'scale(0.5)', md: 'scale(1)' }}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
