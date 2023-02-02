import React, { useState, FormEvent } from 'react'
import {
  Box,
  Flex,
  Text,
  Icon,
  Textarea,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
} from '@chakra-ui/react'
import { RiFlagFill } from 'react-icons/ri'
import { usePostFlagWikiMutation } from '@/services/wikis'
import { getUserAddressFromCache } from '@/utils/DataFetching/blockchainRelated/getUserAddressFromCache'

interface WikiFlaggingSystemProps {
  id: string
}

interface WikiFlaggingModalProps {
  id: string
  isOpen: boolean
  onClose: () => void
}

const FlaggingSystemModal = ({
  id,
  isOpen,
  onClose,
}: WikiFlaggingModalProps) => {
  const toast = useToast()
  const [flagContent, setFlagContent] = useState('')
  const [postFlagWiki] = usePostFlagWikiMutation()

  const postFlagHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const postFlagWikiData = await postFlagWiki({
      report: flagContent,
      wikiId: id,
      userId: getUserAddressFromCache(),
    })

    if (!Object.keys(postFlagWikiData).includes('error')) {
      toast({
        title: 'Your report has been successfully submitted!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      onClose()
    } else {
      toast({
        title: 'There was an error submitting your report.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={{ base: 'md', md: '2xl' }}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent mx={{ base: '15px', md: '0' }}>
        <form onSubmit={postFlagHandler}>
          <ModalHeader>
            <Text>Report</Text>
            <Text
              fontWeight={500}
              mt="3"
              pb="3"
              fontSize={{ base: 'sm', md: 'md' }}
              borderBottomWidth="1px"
              borderBottomColor="wikiFlagTextBorderColor"
              color="wikiFlagTextColor"
            >
              Please, in a few words, write about what you would like to be
              reported in the text box below.
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              fontWeight={400}
              fontSize="sm"
              minH="200px"
              color="wikiFlagTextAreaColor"
              borderColor="wikiFlagTextAreaBorderColor"
              placeholder="Write your text here...."
              name="report-content"
              onChange={e => setFlagContent(e.currentTarget.value)}
            />
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              type="submit"
              background="brandLinkColor"
              fontSize="sm"
              fontWeight="400"
              w={{
                base: 'full',
                md: 'initial',
              }}
              disabled={flagContent.trim().length === 0}
            >
              Confirm
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export const WikiFlaggingSystem = ({ id }: WikiFlaggingSystemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  return (
    <>
      {isOpen && getUserAddressFromCache() && (
        <FlaggingSystemModal onClose={onClose} isOpen={isOpen} id={id} />
      )}
      <Box
        mt={{
          base: '5',
          lg: '10',
        }}
      >
        <Flex direction={{ base: 'column', md: 'row' }}>
          <Text as="span">See something wrong? </Text>
          <Text
            as="span"
            ml={{ base: '0', md: '1' }}
            color="brandLinkColor"
            cursor="pointer"
            display="flex"
            onClick={() => {
              if (getUserAddressFromCache()) {
                onOpen()
              } else {
                toast({
                  title: "Please, login to report this wiki's content.",
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                })
              }
            }}
            _dark={{ color: 'brand.800' }}
          >
            <Text as="span">Report to us.</Text>
            <Flex as="span" ml="5px" alignItems="center">
              <Icon fontSize={{ base: 'md', sm: 'lg' }} as={RiFlagFill} />
            </Flex>
          </Text>
        </Flex>
      </Box>
    </>
  )
}
