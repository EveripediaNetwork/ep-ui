import React from 'react'
import {
  ModalProps,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Text,
  Progress,
  HStack,
  Icon,
} from '@chakra-ui/react'

import { RiQuestionLine } from 'react-icons/ri'

export const PromoteCreatedWikisModal = ({
  onClose = () => {},
  isOpen = false,
  ...rest
}: Partial<ModalProps>) => {
  if (!isOpen) return null
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      size={{ lg: 'xl', base: 'sm' }}
      {...rest}
    >
      <ModalOverlay />
      <ModalContent
        _dark={{
          bg: 'gray.800',
        }}
      >
        <ModalBody px="0rem">
          <HStack px="5" py="3">
            <Icon
              fontSize="20px"
              cursor="pointer"
              color="#718096"
              as={RiQuestionLine}
            />
            <Text fontSize="xl">Promotion Details</Text>
          </HStack>
          <Box pb={7} px={2}>
            <Text textAlign="center">
              The promotion of this wiki is in progress and will end on the 12th
              of August 2022 at 12:00am prompt.
            </Text>
            <HStack spacing={3} pt={5} px="10%">
              <Progress
                value={80}
                size="sm"
                colorScheme="brand"
                w="full"
                rounded="md"
              />
              <Text> 80% </Text>
            </HStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
