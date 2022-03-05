import React from 'react'
import {
  Flex,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  Button,
  Box,
  VStack,
  useClipboard,
  useToast,
} from '@chakra-ui/react'
import { FaCopy, FaInstagram, FaSitemap, FaTwitter } from 'react-icons/fa'
import { useAccount } from 'wagmi'
import ImageUpload from './ImageUpload'

const ProfileSettings = () => {
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  })

  const walletAddress = accountData?.ens?.name
    ? accountData.ens?.name
    : accountData?.address

  const clipboard = useClipboard(walletAddress || '')
  const toast = useToast()

  return (
    <>
      <Flex gap={18} flexDir={{ base: 'column', lg: 'row' }}>
        <VStack flex="2" align="left" spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input placeholder="Enter username" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="bio">Bio</FormLabel>
            <Textarea placeholder="Tell the world your story" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input placeholder="Enter email" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="links">Links</FormLabel>
            <Box borderWidth="1px" borderRadius="md">
              <InputGroup>
                Settings
                <InputLeftElement pointerEvents="none">
                  <FaTwitter color="gray" />
                </InputLeftElement>
                <Input
                  variant="flushed"
                  _focus={{ borderBottomColor: 'inherit' }}
                  placeholder="Your Twitter Handle"
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaInstagram color="gray" />
                </InputLeftElement>
                <Input
                  _focus={{ borderBottomColor: 'inherit' }}
                  variant="flushed"
                  placeholder="Your Instagram Handle"
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaSitemap color="gray" />
                </InputLeftElement>
                <Input
                  borderBottomWidth="0"
                  _focus={{ borderBottomColor: 'inherit' }}
                  variant="flushed"
                  placeholder="yoursite.io"
                />
              </InputGroup>
            </Box>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="username">Wallet Address</FormLabel>
            <InputGroup>
              <Input
                cursor="pointer"
                readOnly
                _focus={{ outline: 'none' }}
                value={walletAddress}
                onClick={() => {
                  clipboard.onCopy()
                  toast({
                    title: 'Copied!',
                    status: 'success',
                    duration: 1000,
                  })
                }}
              />
              <InputRightElement pointerEvents="none">
                <FaCopy color="gray" />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </VStack>
        <VStack flex="1" align="left" spacing={8}>
          <FormControl>
            <FormLabel htmlFor="profile-image">Profile Image</FormLabel>
            <ImageUpload
              defaultImage="/images/default-user-avatar.png"
              w="140px"
              h="140px"
              rounded="full"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="profile-banner">Profile Banner</FormLabel>
            <ImageUpload
              defaultImage="/images/default-user-avatar.png"
              w="min(300px, 100%)"
              h="120px"
              borderRadius="lg"
            />
          </FormControl>
        </VStack>
      </Flex>
      <Button size="lg" width={8}>
        Save
      </Button>
    </>
  )
}

export default ProfileSettings
