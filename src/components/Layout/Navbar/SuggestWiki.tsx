import { Modal } from '@/components/Elements'
import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Input,
  ModalProps,
  Text,
  Textarea,
  VStack,
  chakra,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import React, { ChangeEventHandler } from 'react'

const sumbitButton = (
  onClick: () => void,
  loading: boolean,
  input: string,
  t: any,
) => {
  return (
    <Button
      isLoading={loading}
      onClick={onClick}
      isDisabled={input.trim().length < 1}
    >
      {t('Submit')}
    </Button>
  )
}

interface SuggestWikiModalProps extends Partial<ModalProps> {
  prePopulatedSearch?: string
}

const SuggestWikiModal = ({
  onClose = () => {},
  isOpen = true,
  prePopulatedSearch = '',
}: SuggestWikiModalProps) => {
  const { t } = useTranslation('common')
  const [input, setInput] = useState(prePopulatedSearch)
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = React.useState('')

  useEffect(() => {
    setInput(prePopulatedSearch)
  }, [prePopulatedSearch])

  const handleInputChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const inputValue = e.target.value
    setInput(inputValue)
  }
  const handleEmailInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue = e.target.value
    setEmail(inputValue)
  }
  const sumbitText = t('SuggestWiki')
  const sumbitWiki = async () => {
    setLoading(true)
    const response = await fetch('/api/wiki-suggestion', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        feedback: input,
        contact: email,
      }),
    })
    const data = await response.json()
    if (response.ok) {
      setIsSubmitted(true)
      setLoading(false)
    } else {
      setError(data.message)
      setLoading(false)
    }
  }
  const onCloseModal = () => {
    setInput('')
    setEmail('')
    setIsSubmitted(false)
    setError('')
    onClose()
  }

  return (
    <Modal
      enableBottomCloseButton={false}
      isOpen={isOpen}
      onClose={onCloseModal}
      title={isSubmitted ? '' : sumbitText}
      isCentered
      SecondaryButton={
        isSubmitted ? undefined : sumbitButton(sumbitWiki, loading, input, t)
      }
      size={{
        base: 'md',
        md: `${isSubmitted ? 'md' : 'lg'}`,
      }}
    >
      {!isSubmitted ? (
        <Box mt={-2}>
          <Text fontSize="sm">{t('SuggestWikiText')}</Text>
          <Box mt={4}>
            <chakra.label
              htmlFor="email"
              color={'#344054'}
              _dark={{
                color: 'whiteAlpha.800',
              }}
            >
              Email (Optional)
            </chakra.label>
            <Input
              mt={1}
              value={email}
              placeholder="vitalik@ethereum.org"
              onChange={handleEmailInputChange}
              _placeholder={{
                color: 'formPlaceholder',
              }}
            />
          </Box>
          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder={t('details')}
            minH={{
              base: '100px',
              md: '200px',
            }}
            mt={{
              base: 2,
              md: 4,
            }}
            _placeholder={{
              color: 'formPlaceholder',
            }}
          />
        </Box>
      ) : error ? (
        <Text>Error submitting wiki suggestion: {error}</Text>
      ) : (
        <VStack>
          <Image src="/tick.svg" alt="suggest-wiki" width={64} height={64} />
          <Text fontSize="lg" textAlign="center">
            Wiki Suggestion successfully submitted!
          </Text>
          <Text fontSize="sm" textAlign="center">
            Thank you for your wiki suggestion! Your contribution is appreciated
            and will be reviewed promptly
          </Text>
        </VStack>
      )}
    </Modal>
  )
}

export default SuggestWikiModal
