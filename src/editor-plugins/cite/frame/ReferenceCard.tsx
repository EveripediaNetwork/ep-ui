import { CiteReference } from '@/types/Wiki'
import { hashToNum } from '@/utils/hashToNum'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Tag,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import React, { ChangeEvent } from 'react'
import { RiEdit2Line } from 'react-icons/ri'
import { tuiEditorInputStyles } from './CiteFromNewURL'

interface ReferenceCardProps {
  index: number
  handleExistingCiteSubmit: (reference: CiteReference, index: number) => void
  reference: CiteReference
}
export const ReferenceCard = ({
  index,
  handleExistingCiteSubmit,
  reference,
}: ReferenceCardProps) => {
  const [url, setUrl] = React.useState('')
  const [desc, setDesc] = React.useState<string>('')
  const [showRed, setShowRed] = React.useState(false)
  return (
    <Box key={index} w="100% !important" h="unset !important">
      <Flex
        w="100% !important"
        justify="space-between"
        align="center"
        bgColor="#f7f9fc !important"
        _dark={{
          bgColor: '#2e3445 !important',
          color: 'white !important',
        }}
      >
        <Box
          flex="9"
          textAlign="start"
          p={8}
          borderLeftWidth="3px !important"
          onClick={() => handleExistingCiteSubmit(reference, index)}
          cursor="pointer"
          borderColor={`hsl(${hashToNum(
            reference.url + reference.description,
          )}, 80%, 80%) !important`}
        >
          <Text
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            maxW="250px"
            overflow="hidden"
          >
            {reference.url}
          </Text>
          <Text
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
            maxW="250px !important"
            opacity={0.5}
            fontWeight="100 !important"
          >
            {reference.description}
          </Text>
        </Box>
        <VStack flex="1" mr="10px !important">
          <IconButton
            aria-label="edit-citation"
            icon={<RiEdit2Line />}
            _dark={{ color: 'white', bgColor: '#464c61 !important' }}
            bgColor="#dde4f0 !important"
            h="30px !important"
            w="30px !important"
            borderRadius="4px"
            _hover={{
              filter: 'brightness(0.9)',
            }}
          />
        </VStack>
      </Flex>
      <Box borderWidth="1px" p="10px !important" borderTop="0px">
        <form
          onSubmit={e => {
            e.preventDefault()
            if (url) {
              setUrl('')
              setDesc('')
            }
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
              onChange={(e: {
                target: { value: React.SetStateAction<string> }
              }) => setUrl(e.target.value)}
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
            Save
          </Button>
        </form>
      </Box>
    </Box>
  )
}
