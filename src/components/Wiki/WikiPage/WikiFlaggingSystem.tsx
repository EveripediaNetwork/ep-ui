import React from 'react'
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
  console.log(id)
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="2xl"
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>Report</Text>
          <Text
            fontWeight={500}
            mt="3"
            pb="3"
            fontSize="14px"
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
          <form>
            <Textarea
              fontWeight={400}
              fontSize="14px"
              minH="200px"
              color="gray.800"
              borderColor="gray.300"
              placeholder="Write your text here...."
              _dark={{ color: 'whiteAlpha.500', borderColor: 'whiteAlpha.200' }}
            />
          </form>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button background="brand.500" fontSize="12px" fontWeight="400">
            Confirm
          </Button>
        </ModalFooter>
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
          >
            <Text as="span">Report to us.</Text>
            <Box as="span" ml="5px">
              <Icon fontSize={{ base: '16px', sm: '20px' }} as={RiFlagFill} />
            </Box>
          </Text>
        </Flex>
      </Box>
    </>
  )
}
