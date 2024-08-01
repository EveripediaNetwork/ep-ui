import React from 'react'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Dialog,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import Image from 'next/image'
import { useToast } from '@chakra-ui/toast'
import { useTranslation } from 'next-i18next'

const SuggestEventModal = ({ showBtn }: { showBtn?: boolean }) => {
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [suggestion, setSuggestion] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const toast = useToast()
  const { t } = useTranslation('event')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    fetch('/api/wiki-suggestion', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        feedback: suggestion,
        contact: email,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setIsSubmitted(true)
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log(err)
        toast({
          status: 'error',
          title: 'Event Suggestion Failed',
          description: err?.message,
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // Handle the dialog's open state change
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setEmail('')
      setSuggestion('')
      setIsSubmitted(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {showBtn ? (
          <button
            type="button"
            className="bg-brand-500 text-sm text-white font-medium dark:bg-brand-800 rounded-md py-2 px-4"
          >
            {t('modal.modalTrigger')}
          </button>
        ) : (
          <span className="text-brand-500 dark:text-brand-800 cursor-pointer hover:underline">
            {t('modal.modalTrigger')}
          </span>
        )}
      </DialogTrigger>

      <DialogContent>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <DialogHeader className="mb-3">
              <DialogTitle className="text-base dark:text-alpha-800">
                {t('modal.title')}
              </DialogTitle>
              <DialogDescription className="text-sm dark:text-alpha-800">
                {t('modal.description')}
              </DialogDescription>
            </DialogHeader>
            <div className="grid w-full items-center gap-1">
              <label htmlFor="email" className="text-sm dark:text-alpha-800">
                Email (Optional)
              </label>
              <Input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                placeholder="vitalik@ethereum.org"
                className="dark:placeholder:text-alpha-500 placeholder:text-gray400"
              />
            </div>
            <Textarea
              value={suggestion}
              onChange={(e) => setSuggestion(e.currentTarget.value)}
              placeholder={t('modal.textAreaPlaceholder')}
              name="suggestions"
              className="resize-none mt-4 border border-gray300 placeholder:text-gray400 dark:border-alpha-300 dark:placeholder:text-alpha-500"
              rows={8}
            />
            <DialogFooter className="mt-5 sm:justify-start">
              <Button
                type="submit"
                className="bg-brand-500 dark:bg-brand-800 py-1 h-auto px-20 disabled:cursor-not-allowed"
                disabled={suggestion.trim().length < 1 || loading}
              >
                {loading ? t('modal.submitting') : t('modal.submit')}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Image src="/tick.svg" alt="suggest-wiki" width={64} height={64} />
            <h2 className="font-semibold text-gray800 dark:text-alpha-900 text-xl">
              {t('modal.success')}
            </h2>
            <p className="text-center max-w-[390px] text-gray600 dark:text-alpha-800 text-sm font-medium">
              {t('modal.thankYou')}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default SuggestEventModal
