import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Tag,
  Textarea,
} from '@chakra-ui/react'
import React, { ChangeEvent } from 'react'

interface CiteFromNewURLProps {
  handleCiteSubmit: (url: string, description: string) => void
  citedIndicator: boolean
  setCitedIndicator: (citedIndicator: boolean) => void
}

export const tuiEditorInputStyles = {
  padding: '5px 12px',
  borderRadius: '2px',
  border: '1px solid #e1e3e9',
  color: '#333',
  _focus: {
    outline: '1px solid #00a9ff',
    borderColor: 'transparent !important',
  },
  _dark: {
    bgColor: 'transparent',
    color: '#eee',
    borderColor: '#303238',
  },
}

export const CiteFromNewURL = ({
  handleCiteSubmit,
  citedIndicator,
  setCitedIndicator,
}: CiteFromNewURLProps) => {
  const [showRed, setShowRed] = React.useState(false)
  const [url, setUrl] = React.useState('')
  const [desc, setDesc] = React.useState<string>('')

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        if (url) {
          handleCiteSubmit(url, desc)
          setUrl('')
          setDesc('')
        }
        setCitedIndicator(true)
        setTimeout(() => {
          setCitedIndicator(false)
        }, 3000)
      }}
    >
      <FormControl>
        <FormLabel mt="0 !important">Enter URL</FormLabel>
        <Input
          mt={4}
          w="100% !important"
          type="url"
          required
          value={url}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setUrl(e.target.value)
          }
          placeholder="Insert URL"
          id="citeUrlInput"
          h="30px"
          {...tuiEditorInputStyles}
        />
      </FormControl>
      <FormControl>
        <HStack mt="10px" align="center" justify="space-between">
          <FormLabel m="0 !important">Short Description</FormLabel>
          <Tag
            display="block"
            variant="outline"
            px={4}
            py={2}
            borderRadius={3}
            color="white"
            bgColor={
              // eslint-disable-next-line no-nested-ternary
              showRed
                ? '#d34c46 !important'
                : (desc.length || '') > 25
                ? '#579f6e !important'
                : '#cea046 !important'
            }
          >
            {desc.length || 0}/60
          </Tag>
        </HStack>
        <Textarea
          mt="4px"
          w="100% !important"
          value={desc}
          required
          placeholder="Enter a short description about the reference linked"
          id="citeDescriptionInput"
          h="50px"
          resize="none"
          {...tuiEditorInputStyles}
          bgColor={showRed ? '#d406082a' : 'transparent'}
          outline={!showRed ? 'none' : '1px solid red !important'}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            if (event.target.value.length <= 60) setDesc(event.target.value)
            else {
              setShowRed(true)
              setTimeout(() => setShowRed(false), 2000)
            }
          }}
        />
      </FormControl>
      <Button
        type="submit"
        className="toastui-editor-ok-button"
        outline="0 !important"
        w="100% !important"
        mt="10px !important"
      >
        {citedIndicator ? 'Cited !' : 'Cite'}
      </Button>
    </form>
  )
}
