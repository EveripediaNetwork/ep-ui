import React, { useCallback, useEffect, useState } from 'react'
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  Skeleton,
} from '@chakra-ui/react'
import { nftListing } from '@/services/nftlisting/index'
import { store } from '@/store/store'
import WikiAccordion from '../../WikiAccordion'
import { NFTImgFallback } from './NFTImageFallBack'

const NFTWidget = ({
  categories,
  metaData,
}: {
  categories: { id: string; title: string }[]
  metaData: { id: string; value: string }[]
}) => {
  const isNFTWiki = categories.find((item: { id: string; title: string }) => {
    return item.id === 'nfts'
  })
  const [currentNFTImage, setCurrentNTFImage] = useState<string>('')
  const [currentNFTHash, setCurrentNFTHash] = useState<number>(1)
  const [currentNFTHashDisplay, setCurrentNFTHashDisplay] = useState<number>(1)
  const [showNFTFetchError, setShowNFTFetchError] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const contractData = metaData.find(item => item.id === 'contract_url')?.value

  const contractID = contractData?.split('/').pop()

  const fetchNFT = useCallback(async () => {
    setIsLoading(true)
    if (contractID && isNFTWiki && currentNFTHash) {
      const { data } = await store.dispatch(
        nftListing.initiate({
          nftContractID: contractID || '',
          nftHash: currentNFTHash,
        }),
      )

      const nftImgURL = data?.media[0].gateway
      if (data?.error) {
        setShowNFTFetchError(true)
        setIsLoading(false)
      } else setShowNFTFetchError(false)

      setCurrentNTFImage(nftImgURL || '')
      setCurrentNFTHashDisplay(currentNFTHash)
    }
  }, [contractID, currentNFTHash, isNFTWiki])

  // getting associated nft image
  useEffect(() => {
    if (contractID && isNFTWiki) {
      fetchNFT()
    }
  }, [contractID, fetchNFT, isNFTWiki])

  if (isNFTWiki && contractData) {
    return (
      <WikiAccordion
        display="flex"
        withNoDarkBg
        flexDir="column"
        gap={2}
        title="Search NFT Collection"
        collapsed={{ base: true, xl: false }}
      >
        {isLoading ? (
          <Flex flexDirection="column">
            <Skeleton height="305px" />
            <Flex justifyContent="center" my="4">
              <Skeleton w="70px" height="20px" borderRadius="30px" />
            </Flex>
          </Flex>
        ) : (
          <Flex
            flexDirection="column"
            bg="#f5f5f5"
            _dark={{ bg: 'transparent' }}
            w="100%"
            gap="4"
            borderRadius={8}
          >
            {!showNFTFetchError ? (
              <Image src={currentNFTImage} onLoad={() => setIsLoading(false)} />
            ) : (
              <NFTImgFallback />
            )}
            <Flex justifyContent="center">
              <Heading>#{currentNFTHashDisplay}</Heading>
            </Flex>
          </Flex>
        )}
        <Flex
          borderRadius="8px"
          flexDir="row"
          alignItems="center"
          bg="white"
          _dark={{ bg: '#2d3748' }}
          p="2"
          gap="2"
        >
          <FormControl>
            <Input
              boxSizing="border-box"
              _focus={{ border: '1px solid #FF5CAA' }}
              p="1"
              border="none"
              type="number"
              placeholder="Input NFT ID"
              onChange={e => {
                const value = Number(e.target.value)
                if (!Number.isNaN(value)) {
                  setCurrentNFTHash(value)
                }
              }}
            />
          </FormControl>
          <Button
            cursor="pointer"
            as="a"
            target="_blank"
            size="md"
            variant="solid"
            disabled={!currentNFTHash}
            onClick={() => {
              fetchNFT()
            }}
          >
            Search
          </Button>
        </Flex>
      </WikiAccordion>
    )
  }
  return null
}

export default NFTWidget
