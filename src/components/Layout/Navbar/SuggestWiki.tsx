import { Modal } from '@/components/Elements'
import {
  Box,
  Button,
  ModalProps,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import React, { ChangeEventHandler } from 'react'

const sumbitButton = (onClick: () => void, loading: boolean, input: string) => {
  return (
    <Button
      isLoading={loading}
      onClick={onClick}
      isDisabled={input.trim().length < 1}
    >
      Submit
    </Button>
  )
}

const SuggestWikiModal = ({
  onClose = () => {},
  isOpen = true,
}: Partial<ModalProps>) => {
  const { t } = useTranslation('common')
  const [input, setInput] = React.useState('')
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const handleInputChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const inputValue = e.target.value
    setInput(inputValue)
  }
  const sumbitWiki = async () => {
    setLoading(true)
    const response = await fetch('/api/wiki-suggestion', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        feedback: input,
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
    setIsSubmitted(false)
    setError('')
    onClose()
  }

  return (
    <Modal
      enableBottomCloseButton={false}
      isOpen={isOpen}
      onClose={onCloseModal}
      title={isSubmitted ? '' : 'Suggest Wiki'}
      isCentered
      SecondaryButton={
        isSubmitted ? undefined : sumbitButton(sumbitWiki, loading, input)
      }
      size={{
        base: 'md',
        md: '3xl',
      }}
    >
      {!isSubmitted ? (
        <Box mt={-2}>
          <Text fontSize="sm">{t('SuggestWiki')}</Text>
          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder="details"
            minH={{
              base: '100px',
              md: '200px',
            }}
            mt={{
              base: 2,
              md: 4,
            }}
          />
        </Box>
      ) : error ? (
        <Text>Error submitting wiki suggestion: {error}</Text>
      ) : (
        <VStack>
          <Image src="/tick.svg" alt="suggest-wiki" width={64} height={64} />
          <Text fontSize="lg">Wiki Suggestion successfully submitted!</Text>
          <Text fontSize="sm">
            Thank you for your wiki suggestion! Your contribution is appreciated
            and will be reviewed promptly
          </Text>
        </VStack>
      )}
    </Modal>
  )
}

export default SuggestWikiModal
