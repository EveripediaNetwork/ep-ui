import { Button, Flex, Image, Link } from '@chakra-ui/react'
import React from 'react'
import { BiCloudDownload } from 'react-icons/bi'

export const BrandingAssets = ({ url }: { url: string }) => {
  return (
    <Flex w="30%" flexDirection="column" gap={2} alignItems="self-end">
      <Image src={url} />
      <Link
        _hover={{ textDecoration: 'none' }}
        download
        href={url}
        display="flex"
        width="fit-content"
      >
        <Button
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
      </Link>
    </Flex>
  )
}
