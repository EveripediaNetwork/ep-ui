import React from 'react'
import {
  Box,
  Button,
  Input,
  SimpleGrid,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { useAppDispatch } from '@/store/hook'
import { isValidUrl } from '@/utils/textUtils'
import { BaseEvents, EventType, Wiki } from '@everipedia/iq-utils'
import { EventsList } from './EventsList'

const validateForm = (
  date: string,
  title: string,
  link: string,
  description: string,
) => {
  if (!date) return 'Date is required'
  if (!title) return 'Title is required'
  if (!link) return 'Link is required'
  if (!description) return 'Description is required'

  if (new Date(date).toString() === 'Invalid Date')
    return 'The date entered is invalid date'
  if (!isValidUrl(link)) return 'The link entered is invalid url'
  if (description.length > 255)
    return 'Description should be less than 255 characters'
  if (title.length > 80) return 'Title should be less than 80 characters'
  if (link.length > 500) return 'Link should be less than 500 characters'

  return null
}

const EventsInput = ({ wiki }: { wiki: Wiki }) => {
  const dispatch = useAppDispatch()
  const [errMsg, setErrMsg] = React.useState<string | null>(null)
  const [isUpdate, setIsUpdate] = React.useState<boolean>(false)

  const formRef = React.useRef<HTMLFormElement>(null)

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    const date = data.get('date') as string
    const title = data.get('title') as string
    const link = data.get('link') as string
    const description = data.get('description') as string

    const error = validateForm(date, title, link, description)
    if (error) {
      setErrMsg(error)
      return
    }

    dispatch({
      type: 'wiki/addEvent',
      payload: {
        date,
        title,
        description,
        link,
        type: wiki.events?.length === 0 ? EventType.CREATED : EventType.DEFAULT,
      },
    })

    formRef.current?.reset()
  }

  const handleIsUpdateCheck = (date: string) => {
    if (date) {
      const dateObj = new Date(date)
      const isExists = wiki.events?.some(
        event => new Date(event.date).toISOString() === dateObj.toISOString(),
      )
      setIsUpdate(!!isExists)
    }
  }

  const handleFormChange = (data: Exclude<BaseEvents, 'type'>) => {
    if (formRef.current) {
      const dateInput = formRef.current.elements.namedItem(
        'date',
      ) as HTMLInputElement
      const titleInput = formRef.current.elements.namedItem(
        'title',
      ) as HTMLInputElement
      const linkInput = formRef.current.elements.namedItem(
        'link',
      ) as HTMLInputElement
      const descriptionInput = formRef.current.elements.namedItem(
        'description',
      ) as HTMLInputElement

      dateInput.value = data.date
      titleInput.value = data.title || ''
      linkInput.value = data.link || ''
      descriptionInput.value = data.description || ''

      handleIsUpdateCheck(data.date)
    }
  }

  const titleProps = () => {
    if (wiki.events?.length === 0) {
      let title = ''

      if (wiki.categories[0].id === 'people') {
        title = 'Date of birth'
      } else {
        title = 'Date of creation'
      }

      return {
        value: title,
        disabled: true,
      }
    }
    return {}
  }

  return (
    <>
      <Box>
        <Text fontWeight="semibold">Event Dates</Text>
        <form
          ref={formRef}
          onChange={() => setErrMsg(null)}
          onSubmit={handleFormSubmit}
        >
          <Box flex="8" w="full" mt="1.5">
            <SimpleGrid
              gridTemplateColumns={{ base: '1fr', md: '0.8fr 1fr 1fr' }}
              gap="3"
            >
              <Input
                name="date"
                type="date"
                placeholder="Select date"
                fontSize={{ base: '12px', md: '14px' }}
                onChange={e => {
                  const date = e.target.value
                  handleIsUpdateCheck(date)
                }}
              />
              <Input
                name="title"
                fontSize={{ base: '12px', md: '14px' }}
                type="text"
                placeholder="Title"
                {...titleProps()}
              />
              <Input
                name="link"
                type="url"
                placeholder="Link"
                fontSize={{ base: '12px', md: '14px' }}
              />
            </SimpleGrid>
          </Box>
          <SimpleGrid
            gridTemplateColumns={{ base: '1fr', md: '2fr 110px' }}
            gap="3"
            mt="3"
          >
            <Textarea
              name="description"
              placeholder="Write a short description for the event date"
              h={{ base: '80px', md: 'initial' }}
              fontSize={{ base: '12px', md: '14px' }}
            />
            <Button type="submit" w="full" rounded="md" h="40px">
              {isUpdate ? 'Update' : 'Add '}
            </Button>
          </SimpleGrid>
        </form>
      </Box>

      {errMsg && (
        <Text color="red.500" fontSize="sm" mt="2">
          {errMsg}
        </Text>
      )}
      <EventsList handleFormChange={handleFormChange} />
    </>
  )
}

export default EventsInput
