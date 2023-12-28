import React, { forwardRef, Ref } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from '@chakra-ui/react'
import { FaInstagram, FaSitemap, FaTwitter } from 'react-icons/fa'
import {
  validateBio,
  validateEmail,
  validateUsername,
} from '@/utils/ProfileUtils/Validations'
import { StrEntry } from '@/types/ProfileType'
import LensterIcon from '@/components/Icons/lensterIcon'
import { ProfileLinksProps } from '@/types/SettingsType'
import { useTranslation } from 'next-i18next'

export const ProfileLinks = ({
  twitter,
  instagram,
  website,
  lens,
  setInstagram,
  setWebsite,
  setTwitter,
  setLens,
}: ProfileLinksProps) => {
  return (
    <>
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
              onChange={(e) => setTwitter(e.target.value)}
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
              onChange={(e) => setInstagram(e.target.value)}
              variant="flushed"
              placeholder="Your Instagram Handle"
            />
          </InputGroup>
          {/* LINKS: Lenster */}
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <LensterIcon color="gray" />
            </InputLeftElement>
            <Input
              _focus={{ borderBottomColor: 'inherit' }}
              value={lens}
              onChange={(e) => setLens(e.target.value)}
              variant="flushed"
              placeholder="Your Lens Handle"
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
              onChange={(e) => setWebsite(e.target.value)}
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
    </>
  )
}

interface ProfileEmailProps {
  inputEmail: StrEntry
  setInputEmail: (emailInput: StrEntry) => void
}

export const ProfileEmail = forwardRef(
  (
    { inputEmail, setInputEmail }: ProfileEmailProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    return (
      <>
        {/* PROFILE: EMAIL */}
        <FormControl isRequired isInvalid={inputEmail.error !== ''}>
          <FormLabel htmlFor="email">Email Address</FormLabel>
          <Input
            ref={ref}
            value={inputEmail.value}
            onChange={(e) => {
              setInputEmail({
                value: e.target.value,
                error: validateEmail(e.target.value),
              })
            }}
            placeholder="Enter email"
          />
          <FormErrorMessage>{inputEmail.error}</FormErrorMessage>
        </FormControl>
      </>
    )
  },
)

interface ProfileUsernameProps {
  userENSAddr: string
  inputUsername: StrEntry
  setInputUsername: (usernameInput: StrEntry) => void
  userAddress?: string
}

export const ProfileUsername = forwardRef(
  (props: ProfileUsernameProps, ref: Ref<HTMLInputElement>) => {
    const { userENSAddr, inputUsername, setInputUsername, userAddress } = props
    const { t } = useTranslation('settings')
    return (
      <>
        {/* PROFILE: USER NAME */}
        <FormControl isRequired isInvalid={inputUsername.error !== ''}>
          <FormLabel htmlFor="username">{t('settingUsername')}</FormLabel>
          {userENSAddr && userENSAddr !== inputUsername.value && (
            <Button
              variant="unstyled"
              mb="2"
              h="max-content"
              display="flex"
              alignItems="center"
              fontSize="xs"
              fontWeight="medium"
              onClick={() => {
                setInputUsername({
                  value: userENSAddr,
                  error: validateUsername(userENSAddr, userENSAddr),
                })
              }}
            >
              {`${t('settingClickToUseYourENS')} ${userENSAddr}`}
            </Button>
          )}
          <Input
            ref={ref}
            value={inputUsername.value}
            onChange={(e) => {
              setInputUsername({
                value: e.target.value,
                error: validateUsername(e.target.value, userAddress),
              })
            }}
            placeholder={t('settingUsername')}
          />
          <FormErrorMessage>{inputUsername.error}</FormErrorMessage>
        </FormControl>
      </>
    )
  },
)

interface ProfileBioProps {
  inputBio: StrEntry
  setInputBio: (usernameInput: StrEntry) => void
}

export const ProfileBio = forwardRef(
  (props: ProfileBioProps, ref: Ref<HTMLTextAreaElement>) => {
    const { inputBio, setInputBio } = props
    const { t } = useTranslation('settings')
    return (
      <>
        {/* PROFILE: BIO */}
        <FormControl isInvalid={inputBio.error !== ''}>
          <FormLabel htmlFor="bio">{t('settingBio')}</FormLabel>
          <Textarea
            ref={ref}
            value={inputBio.value}
            onChange={(e) => {
              setInputBio({
                value: e.target.value,
                error: validateBio(e.target.value),
              })
            }}
            placeholder=""
          />
          <FormErrorMessage>{inputBio.error}</FormErrorMessage>
        </FormControl>
      </>
    )
  },
)
