import { Flex, Text, Link } from '@chakra-ui/react'
import React from 'react'

const BrandingAssetDownloadBttn = ({
  text,
  href,
  closeDownloadOptions,
}: {
  text: string
  href: string
  closeDownloadOptions: () => void
}) => {
  return (
    <Flex
      p="8"
      bg={`url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23CBD5E0FF' stroke-width='3' stroke-dasharray='6%2c 14' stroke-dashoffset='41' stroke-linecap='square'/%3e%3c/svg%3e")`}
      justifyContent="center"
    >
      <Link
        _hover={{ textDecoration: 'none' }}
        _focus={{ outline: 'none' }}
        download
        href={href}
        display="flex"
        width="fit-content"
        onClick={closeDownloadOptions}
      >
        <Text
          textAlign="center"
          color="brand.500"
          _dark={{ color: 'brand.800' }}
        >
          {text}
        </Text>
      </Link>
    </Flex>
  )
}

export default BrandingAssetDownloadBttn
