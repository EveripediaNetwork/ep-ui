import React, {
  FormEvent,
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react'
import { Flex, VStack, useToast } from '@chakra-ui/react'
import { useENSData } from '@/hooks/useENSData'
import { usePostUserProfileMutation } from '@/services/profile'
import { ProfileSettingsData, StrEntry } from '@/types/ProfileType'
import { isUserNameTaken } from '@/services/profile/utils'
import {
  validateBio,
  validateEmail,
  validateUsername,
} from '@/utils/ProfileUtils/Validations'
import { PostUserMessage } from '@/utils/ProfileUtils/PostUserMessage'
import {
  ProfileBio,
  ProfileEmail,
  ProfileLinks,
  ProfileUsername,
} from './ProfileInfo'
import { ProfileMedia } from './ProfileMedia'
import { ProfileSubmitButton } from './ProfileSubmitButton'
import { ProfileWalletInfo } from './ProfileWalletInfo'
import { useAddress } from '@/hooks/useAddress'

interface ProfileSettingsProps {
  settingsData?: ProfileSettingsData
}

const ProfileSettings = ({ settingsData }: ProfileSettingsProps) => {
  const [postUserProfile, { isLoading }] = usePostUserProfileMutation()
  const strInitState: StrEntry = { value: '', error: '' }
  const [inputUsername, setInputUsername] = useState<StrEntry>(strInitState)
  const [inputBio, setInputBio] = useState<StrEntry>(strInitState)
  const [inputEmail, setInputEmail] = useState<StrEntry>(strInitState)
  const [website, setWebsite] = useState('')
  const [lens, setLens] = useState('')
  const [instagram, setInstagram] = useState('')
  const [twitter, setTwitter] = useState('')
  const [avatarIPFSHash, setAvatarIPFSHash] = useState('')
  const [bannerIPFSHash, setBannerIPFSHash] = useState('')
  const [isAvatarLoading, setIsAvatarLoading] = useState(false)
  const [isBannerLoading, setIsBannerLoading] = useState(false)
  const { address: userAddress } = useAddress()
  const [, userENSAddr] = useENSData(userAddress)
  const toast = useToast()
  const bioRef = useRef<HTMLTextAreaElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  // set initial values
  useEffect(() => {
    if (settingsData) {
      setInputUsername({
        value: settingsData.username || userENSAddr || '',
        error: '',
      })
      setInputBio({ value: settingsData.bio || '', error: '' })
      setInputEmail({ value: settingsData.email || '', error: '' })
      setWebsite(settingsData.links[0]?.website || '')
      setLens(settingsData.links[0]?.lens || '')
      setInstagram(settingsData.links[0]?.instagram || '')
      setTwitter(settingsData.links[0]?.twitter || '')
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

  useEffect(() => {
    checkUsername()
  }, [checkUsername])

  // form submission handler
  const handleProfileSettingsSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate all fields
    setInputUsername({
      ...inputUsername,
      error: validateUsername(inputUsername.value, userENSAddr),
    })

    setInputBio({ ...inputBio, error: validateBio(inputBio.value) })
    setInputEmail({ ...inputEmail, error: validateEmail(inputEmail.value) })

    // if any field is invalid, focus on the first invalid one
    checkUsername()
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
    const data: Partial<ProfileSettingsData> = {
      id: userAddress!,
      username: inputUsername.value,
      bio: inputBio.value,
      email: inputEmail.value,
      links: [
        {
          instagram,
          twitter,
          website,
          lens,
        },
      ],
      avatar: avatarIPFSHash,
      banner: bannerIPFSHash,
    }

    const response = await postUserProfile({ profileInfo: data })
    let errMsg
    if ('data' in response) {
      const { toastTitle, toastMessage, toastType } = PostUserMessage(errMsg)
      toast({
        title: toastTitle,
        description: toastMessage,
        status: toastType,
        duration: 5000,
        isClosable: true,
      })
    } else {
      console.log(response.error)
      errMsg = response.error
      const { toastTitle, toastMessage, toastType } = PostUserMessage(
        errMsg as string,
      )
      toast({
        title: toastTitle,
        description: toastMessage,
        status: toastType,
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <form onSubmit={handleProfileSettingsSave}>
      <Flex gap={18} flexDir={{ base: 'column', lg: 'row' }}>
        <VStack flex="2" align="left" spacing={4}>
          <ProfileUsername
            ref={usernameRef}
            userAddress={userAddress!}
            userENSAddr={userENSAddr}
            inputUsername={inputUsername}
            setInputUsername={setInputUsername}
          />
          <ProfileBio
            inputBio={inputBio}
            ref={bioRef}
            setInputBio={setInputBio}
          />
          <ProfileEmail
            inputEmail={inputEmail}
            setInputEmail={setInputEmail}
            ref={emailRef}
          />
          <ProfileLinks
            twitter={twitter}
            instagram={instagram}
            website={website}
            lens={lens}
            setWebsite={setWebsite}
            setTwitter={setTwitter}
            setInstagram={setInstagram}
            setLens={setLens}
          />
          <ProfileWalletInfo userAddress={userAddress!} />
        </VStack>
        <ProfileMedia
          setAvatarIPFSHash={setAvatarIPFSHash}
          avatarIPFSHash={avatarIPFSHash}
          isAvatarLoading={isAvatarLoading}
          setIsAvatarLoading={setIsAvatarLoading}
          bannerIPFSHash={bannerIPFSHash}
          isBannerLoading={isBannerLoading}
          setBannerIPFSHash={setBannerIPFSHash}
          setIsBannerLoading={setIsBannerLoading}
        />
      </Flex>
      <ProfileSubmitButton
        isLoading={isLoading}
        isAvatarLoading={isAvatarLoading}
        isBannerLoading={isBannerLoading}
      />
    </form>
  )
}

export default ProfileSettings
