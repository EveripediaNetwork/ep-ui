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

const SuggestEventModal = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-base">Suggest Event</DialogTitle>
        <DialogDescription className="text-xs">
          Didn’t find your event of interest? Suggest an event you would be
          excited to attend and we’ll provide you with the rest of the details.
        </DialogDescription>
      </DialogHeader>
      <Textarea
        placeholder="Details"
        className="resize-none border border-gray300 dark:border-alpha-300"
        rows={8}
      />
      <DialogFooter>
        <Button type="submit" className="bg-brand-500 dark:bg-brand-800 px-10">
          Submit
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default SuggestEventModal
