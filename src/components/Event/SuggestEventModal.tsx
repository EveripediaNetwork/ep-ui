import React from 'react'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'

const SuggestEventModal = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const suggestions = formData.get('suggestions')

    console.log({ email, suggestions })
  }

  return (
    <>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-3">
            <DialogTitle className="text-base dark:text-alpha-800">
              Suggest Event
            </DialogTitle>
            <DialogDescription className="text-xs dark:text-alpha-800">
              Didn’t find your event of interest? Suggest an event you would be
              excited to attend and we’ll provide you with the rest of the
              details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid w-full items-center gap-1">
            <label htmlFor="email" className="text-sm dark:text-alpha-800">
              Email (Optional)
            </label>
            <Input name="email" type="email" placeholder="mabel@braindao.com" />
          </div>
          <Textarea
            placeholder="write your wiki suggestions here..."
            name="suggestions"
            className="resize-none mt-4 border border-gray300 dark:border-alpha-300"
            rows={8}
          />
          <DialogFooter className="mt-5 sm:justify-start">
            <Button
              type="submit"
              onClick={() => console.log('clicked')}
              className="bg-brand-500 dark:bg-brand-800 py-1 h-auto px-20"
            >
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  )
}

export default SuggestEventModal
