import React, { FormEvent, useCallback } from 'react'
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
import { usePostUserProfileMutation } from '@/services/profile'
import { ProfileSettingsData } from '@/types/ProfileType'
import { isUserNameTaken } from '@/services/profile/utils'
import ImageUpload from './ImageUpload'

interface ProfileSettingsProps {
  settingsData?: ProfileSettingsData
}
const ProfileSettings = ({ settingsData }: ProfileSettingsProps) => {
  const [postUserProfile, { error: postUserError }] =
    usePostUserProfileMutation()
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
  const [avatarIPFSHash, setAvatarIPFSHash] = React.useState<string>('')
  const [bannerIPFSHash, setBannerIPFSHash] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isAvatarLoading, setIsAvatarLoading] = React.useState<boolean>(false)
  const [isBannerLoading, setIsBannerLoading] = React.useState<boolean>(false)

  const { address: userAddress } = useAccount()
  const [, userENSAddr] = useENSData(userAddress)
  const clipboard = useClipboard(userAddress || '')
  const toast = useToast()

  const bioRef = React.useRef<HTMLTextAreaElement>(null)
  const usernameRef = React.useRef<HTMLInputElement>(null)
  const emailRef = React.useRef<HTMLInputElement>(null)

  // set initial values
  React.useEffect(() => {
    if (settingsData) {
      setInputUsername({
        value: settingsData.username || userENSAddr || '',
        error: '',
      })
      setInputBio({ value: settingsData.bio || '', error: '' })
      setInputEmail({ value: settingsData.email || '', error: '' })
      setWebsite(settingsData.links[0].website || '')
      setInstagram(settingsData.links[0].instagram || '')
      setTwitter(settingsData.links[0].twitter || '')
      setAvatarIPFSHash(settingsData.avatar || '')
      setBannerIPFSHash(settingsData.banner || '')
    }
  }, [settingsData, userENSAddr])

  const checkUsername = useCallback(async () => {
    if (inputUsername.value.length > 2) {
      if (
        (await isUserNameTaken(inputUsername.value)) &&
        settingsData?.username !== inputUsername.value
      ) {
        setInputUsername({
          value: inputUsername.value,
          error: 'Username is taken',
        })
      }
    }
  }, [inputUsername.value, settingsData?.username])

  React.useEffect(() => {
    checkUsername()
  }, [checkUsername])

  // Validation Functions
  const validateUsername = (name: string): string => {
    if (!name) return 'Username is required'
    if (name.length < 3) {
      return 'Username must be at least 3 characters long'
    }
    if (name.length > 20) {
      return 'Username must be less than 20 characters long'
    }
    if (!/^[a-z0-9]+(.eth)$|^[a-zA-Z0-9_]+$/.test(name)) {
      return 'Username can only contain letters, numbers and underscores'
    }
    if (name.endsWith('.eth')) {
      if (name !== userENSAddr) {
        return 'The account address is not linked with this ens address'
      }
    }
    return ''
  }
  const validateBio = (bio: string): string => {
    if (bio.length > 85) {
      return 'Bio must be 85 characters or less'
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
    setIsLoading(true)

    // Validate all fields
    setInputUsername({
      ...inputUsername,
      error: validateUsername(inputUsername.value),
    })
    setInputBio({ ...inputBio, error: validateBio(inputBio.value) })
    setInputEmail({ ...inputEmail, error: validateEmail(inputEmail.value) })

    // if any field is invalid, focus on the first invalid one
    checkUsername()
    if (inputUsername.error) {
      usernameRef.current?.focus()
      setIsLoading(false)
      return
    }
    if (inputBio.error) {
      bioRef.current?.focus()
      setIsLoading(false)
      return
    }
    if (inputEmail.error) {
      emailRef.current?.focus()
      setIsLoading(false)
      return
    }

    // aggregate data from all states
    const data: Partial<ProfileSettingsData> = {
      id: userAddress,
      username: inputUsername.value,
      bio: inputBio.value,
      email: inputEmail.value,
      links: [
        {
          instagram,
          twitter,
          website,
        },
      ],
      avatar: avatarIPFSHash,
      banner: bannerIPFSHash,
    }

    await postUserProfile({ profileInfo: data })

    // TODO: Error checking

    let toastTitle = 'Profile Settings Saved'
    let toastMessage =
      'Your profile settings have been saved. Refresh the page to see the changes.'
    let toastType: 'success' | 'error' = 'success'
    if (postUserError) {
      toastTitle = 'Profile Settings Failed'
      toastMessage =
        "We couldn't save your profile settings. Refresh the page and try again."
      toastType = 'error'
    }
    toast({
      title: toastTitle,
      description: toastMessage,
      status: toastType,
      duration: 5000,
      isClosable: true,
    })
    setIsLoading(false)
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
            <Box overflow="hidden" borderWidth="1px" borderRadius="md">
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
                  type="url"
                  variant="flushed"
                  _invalid={{
                    bgColor: '#FF000022',
                  }}
                  isInvalid={
                    website.length !== 0 &&
                    !/^(http|https):\/\/[^ "]+$/.test(website)
                  }
                  placeholder="https://yoursite.io"
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
                value={userAddress}
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
              setImgIPFSHash={setAvatarIPFSHash}
              imgIPFSHash={avatarIPFSHash}
              isLoading={isAvatarLoading}
              setIsLoading={setIsAvatarLoading}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="profile-banner">Profile Banner</FormLabel>
            <ImageUpload
              defaultImage="/images/default-user-avatar.png"
              w="300px"
              h="120px"
              borderRadius="lg"
              setImgIPFSHash={setBannerIPFSHash}
              imgIPFSHash={bannerIPFSHash}
              isLoading={isBannerLoading}
              setIsLoading={setIsBannerLoading}
            />
          </FormControl>
        </VStack>
      </Flex>
      <Button
        isLoading={isLoading}
        disabled={isLoading || isAvatarLoading || isBannerLoading}
        loadingText="Submitting"
        type="submit"
        _disabled={{
          backgroundColor: 'gray.300',
          cursor: 'not-allowed',
          _hover: {
            backgroundColor: 'gray.400 !important',
          },
        }}
        size="lg"
        mt={8}
      >
        Save
      </Button>
    </form>
  )
}

export default ProfileSettings
