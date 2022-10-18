import React from 'react'
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  Text,
} from '@chakra-ui/react'

const NFTWidget = ({
  category,
}: {
  category: { id: string; title: string }[]
}) => {
  const isNFTWiki = category.find((item: { id: string; title: string }) => {
    return item.id === 'nfts'
  })

  return (
    <Flex
      display={isNFTWiki ? 'flex' : 'none'}
      flexDirection="column"
      p="14px 10px"
      bg="#f5f5f5"
      _dark={{ bg: 'transparent', border: '1px solid #3f444e' }}
      w="100%"
      gap="4"
      borderRadius={8}
    >
      <Text textAlign="left" fontSize="12px" color="#9d9d9d">
        Search NFT Collection
      </Text>
      <Image src="https://f8n-production-collection-assets.imgix.net/0x270e613AE361395c766d55A6bE3dDCf4d82b4E0A/1/nft.jpg?q=80&auto=format%2Ccompress&cs=srgb&max-w=1680&max-h=1680" />
      <Flex justifyContent="center" color="#1A202C">
        <Heading>#1</Heading>
      </Flex>
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
            type="text"
            placeholder="Input NFT ID"
          />
        </FormControl>
        <Button
          cursor="pointer"
          as="a"
          target="_blank"
          size="md"
          variant="solid"
        >
          Search
        </Button>
      </Flex>
    </Flex>
  )
}

export default NFTWidget
