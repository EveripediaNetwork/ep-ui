import React, { useState } from 'react'
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

interface WikiFlaggingSystemProps {
  id?: string
}

interface WikiFlaggingModalProps {
  id?: string
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

  const postFlagHandler = async e => {
    e.preventDefault()

    console.log({
      id,
      flagContent,
    })
    onClose()
    toast({
      title: 'Your report has been successfully submitted!',
      status: 'success',
      duration: 3000,
    })
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
              fontSize={{ base: '12px', md: '14px' }}
              borderBottomWidth="1px"
              borderBottomColor="gray.300"
              color="gray.800"
              _dark={{
                borderBottomColor: 'whiteAlpha.300',
                color: 'whiteAlpha.900',
              }}
            >
              Please, in a few words, write about what you would like to be
              reported in the text box below.
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              fontWeight={400}
              fontSize="14px"
              minH="200px"
              color="gray.800"
              borderColor="gray.300"
              placeholder="Write your text here...."
              name="report-content"
              onChange={e => {
                setFlagContent(e.target.value)
              }}
              _dark={{ color: 'whiteAlpha.800', borderColor: 'whiteAlpha.200' }}
            />
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              type="submit"
              background="brand.500"
              fontSize="12px"
              fontWeight="400"
              _dark={{ background: 'brand.800' }}
              w={{
                base: 'full',
                md: 'initial',
              }}
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

  return (
    <>
      {isOpen && (
        <FlaggingSystemModal onClose={onClose} isOpen={isOpen} id={id} />
      )}
      <Box
        mt={{
          base: '5',
          lg: '10',
        }}
      >
        <Flex>
          <Text as="span">See something wrong? </Text>
          <Text
            as="span"
            ml="4px"
            color="brand.500"
            cursor="pointer"
            display="flex"
            onClick={onOpen}
            _dark={{ color: 'brand.800' }}
          >
            <Text as="span">Report to us.</Text>
            <Flex as="span" ml="5px" alignItems="center">
              <Icon fontSize={{ base: '16px', sm: '20px' }} as={RiFlagFill} />
            </Flex>
          </Text>
        </Flex>
      </Box>
    </>
  )
}
