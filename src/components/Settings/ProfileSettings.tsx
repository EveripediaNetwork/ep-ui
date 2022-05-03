import React, { FormEvent } from 'react'
import {
  Flex,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
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
import { useENSData } from '@/hooks/useENSData'
import ImageUpload from './ImageUpload'

const ProfileSettings = () => {
  interface StrEntry {
    value: string
    error: string
  }
  const strInitState: StrEntry = { value: '', error: '' }
  const [inputUsername, setInputUsername] =
    React.useState<StrEntry>(strInitState)
  const [inputBio, setInputBio] = React.useState<StrEntry>(strInitState)
  const [inputEmail, setInputEmail] = React.useState<StrEntry>(strInitState)
  const [website, setWebsite] = React.useState<string>('')
  const [instagram, setInstagram] = React.useState<string>('')
  const [twitter, setTwitter] = React.useState<string>('')
  const [profilePicture, setProfilePicture] = React.useState<null | File>(null)
  const [coverPicture, setCoverPicture] = React.useState<null | File>(null)
  const [buttonDisabled,] = React.useState<boolean>(true)

  const [{ data: accountData }] = useAccount()
  const [, username] = useENSData(accountData?.address)

  const clipboard = useClipboard(username || '')
  const toast = useToast()

  const bioRef = React.useRef<HTMLTextAreaElement>(null)
  const usernameRef = React.useRef<HTMLInputElement>(null)
  const emailRef = React.useRef<HTMLInputElement>(null)

  // Validation Functions
  const validateUsername = (name: string): string => {
    if (!name) return 'Username is required'
    if (name.length < 3) {
      return 'Username must be at least 3 characters long'
    }
    if (name.length > 20) {
      return 'Username must be less than 20 characters long'
    }
    if (!/^[a-zA-Z0-9_]+$/.test(name)) {
      return 'Username can only contain letters, numbers and underscores'
    }
    // TODO: Check if name is taken
    return ''
  }
  const validateBio = (bio: string): string => {
    if (bio.length > 140) {
      return 'Bio must be 140 characters or less'
    }
    return ''
  }
  const validateEmail = (email: string): string => {
    if (!email.length) {
      return 'Email is required'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return 'Email is not valid'
    }
    return ''
  }

  // form submission handler
  const handleProfileSettingsSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate all fields
    setInputUsername({
      ...inputUsername,
      error: validateUsername(inputUsername.value),
    })
    setInputBio({ ...inputBio, error: validateBio(inputBio.value) })
    setInputEmail({ ...inputEmail, error: validateEmail(inputEmail.value) })

    // if any field is invalid, focus on the first invalid one
    if (inputUsername.error) {
      usernameRef.current?.focus()
      return
    }
    if (inputBio.error) {
      bioRef.current?.focus()
      return
    }
    if (inputEmail.error) {
      emailRef.current?.focus()
      return
    }

    // aggregate data from all states
    const data = {
      username: inputUsername.value,
      bio: inputUsername.value,
      email: inputEmail.value,
      link: {
        instagram,
        twitter,
        website,
      },
      profilePicture,
      coverPicture,
    }

    // TODO: Send the data to backend
    console.log(data)

    toast({
      title: 'Profile Settings Saved',
      description: 'Your profile settings have been saved.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <form onSubmit={handleProfileSettingsSave}>
      <Flex gap={18} flexDir={{ base: 'column', lg: 'row' }}>
        <VStack flex="2" align="left" spacing={4}>
          {/* PROFILE: USER NAME */}
          <FormControl isRequired isInvalid={inputUsername.error !== ''}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              ref={usernameRef}
              value={inputUsername.value}
              onChange={e => {
                setInputUsername({
                  value: e.target.value,
                  error: validateUsername(e.target.value),
                })
              }}
              placeholder="Enter username"
            />
            <FormErrorMessage>{inputUsername.error}</FormErrorMessage>
          </FormControl>

          {/* PROFILE: BIO */}
          <FormControl isInvalid={inputBio.error !== ''}>
            <FormLabel htmlFor="bio">Bio</FormLabel>
            <Textarea
              ref={bioRef}
              value={inputBio.value}
              onChange={e => {
                setInputBio({
                  value: e.target.value,
                  error: validateBio(e.target.value),
                })
              }}
              placeholder="Tell the world your story"
            />
            <FormErrorMessage>{inputBio.error}</FormErrorMessage>
          </FormControl>

          {/* PROFILE: EMAIL */}
          <FormControl isRequired isInvalid={inputEmail.error !== ''}>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input
              ref={emailRef}
              value={inputEmail.value}
              onChange={e => {
                setInputEmail({
                  value: e.target.value,
                  error: validateEmail(e.target.value),
                })
              }}
              placeholder="Enter email"
            />
            <FormErrorMessage>{inputEmail.error}</FormErrorMessage>
          </FormControl>

          {/* PROFILE: LINKS */}
          <FormControl>
            <FormLabel htmlFor="links">Links</FormLabel>
            <Box borderWidth="1px" borderRadius="md">
              {/* LINKS: Twitter */}
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaTwitter color="gray" />
                </InputLeftElement>
                <Input
                  variant="flushed"
                  value={twitter}
                  onChange={e => setTwitter(e.target.value)}
                  _focus={{ borderBottomColor: 'inherit' }}
                  placeholder="Your Twitter Handle"
                />
              </InputGroup>
              {/* LINKS: Instagram */}
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaInstagram color="gray" />
                </InputLeftElement>
                <Input
                  _focus={{ borderBottomColor: 'inherit' }}
                  value={instagram}
                  onChange={e => setInstagram(e.target.value)}
                  variant="flushed"
                  placeholder="Your Instagram Handle"
                />
              </InputGroup>
              {/* LINKS: Website */}
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaSitemap color="gray" />
                </InputLeftElement>
                <Input
                  borderBottomWidth="0"
                  _focus={{ borderBottomColor: 'inherit' }}
                  value={website}
                  onChange={e => setWebsite(e.target.value)}
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
                value={accountData?.address}
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
              setSelectedImage={setProfilePicture}
              selectedImage={profilePicture}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="profile-banner">Profile Banner</FormLabel>
            <ImageUpload
              defaultImage="/images/default-user-avatar.png"
              w="min(300px, 100%)"
              h="120px"
              borderRadius="lg"
              setSelectedImage={setCoverPicture}
              selectedImage={coverPicture}
            />
          </FormControl>
        </VStack>
      </Flex>
      <Button
        disabled={buttonDisabled}
        type="submit"
        size="lg"
        width={8}
        mt={8}
      >
        Save
      </Button>
    </form>
  )
}

export default ProfileSettings
