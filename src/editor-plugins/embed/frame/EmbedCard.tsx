import { lettersToNum } from '@/utils/textUtils'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { RiAddLine, RiCloseLine } from 'react-icons/ri'
import { tuiEditorInputStyles } from '@/editor-plugins/cite/frame/CiteFromNewURL'

interface EmbedCardProps {
  name: string
  desc: string
  regex: RegExp
  type: string
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  initializeEmbed: (path: string, type: string) => void
}

export const EmbedCard = ({
  name,
  desc,
  regex,
  type,
  isOpen,
  onOpen,
  onClose,
  initializeEmbed,
}: EmbedCardProps) => {
  const [url, setUrl] = React.useState('')

  return (
    <Box w="100% !important" h="unset !important">
      <Flex
        w="100% !important"
        justify="space-between"
        align="center"
        borderLeftWidth="3px !important"
        borderColor={`hsl(${lettersToNum(name)}, 80%, 80%) !important`}
        bgColor="#f7f9fc !important"
        _dark={{
          bgColor: '#2e3445 !important',
          color: 'white !important',
        }}
      >
        <Box flex="9" minH="50px" textAlign="start" p={8}>
          <HStack>
            <Text
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              maxW="220px"
              overflow="hidden"
            >
              {name}
            </Text>
            <HStack flexWrap="wrap" />
          </HStack>
          <Text
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
            maxW="250px !important"
            opacity={0.5}
            fontWeight="100 !important"
          >
            {desc}
          </Text>
        </Box>
        <VStack flex="1" mr="10px !important">
          <IconButton
            aria-label="edit-citation"
            icon={!isOpen ? <RiAddLine /> : <RiCloseLine />}
            _dark={{ color: 'white', bgColor: '#464c61 !important' }}
            bgColor="#dde4f0 !important"
            h="30px !important"
            w="30px !important"
            borderRadius="4px"
            _hover={{
              filter: 'brightness(0.9)',
            }}
            onClick={!isOpen ? onOpen : onClose}
          />
        </VStack>
      </Flex>
      {isOpen && (
        <Box borderWidth="1px" p="10px !important" mt="10px">
          <form
            onSubmit={e => {
              e.preventDefault()
              initializeEmbed(type, url.replace('https://dune.com/embeds/', ''))
            }}
          >
            <FormControl>
              <FormLabel mt="0 !important">
                Enter {name.toLowerCase()} embed URL
              </FormLabel>
              <Input
                mt={4}
                w="100% !important"
                type="url"
                required
                value={url}
                pattern={regex
                  .toString()
                  .substring(1, regex.toString().length - 1)}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> }
                }) => setUrl(e.target.value)}
                placeholder="Insert Embed URL"
                id="citeUrlInput"
                h="30px"
                {...tuiEditorInputStyles}
              />
            </FormControl>
            <Button
              type="submit"
              className="toastui-editor-ok-button"
              color="white !important"
              bgColor="#4ba6f8 !important"
              outline="0 !important"
              w="100px !important"
              mt="10px !important"
            >
              Embed
            </Button>
          </form>
        </Box>
      )}
    </Box>
  )
}
